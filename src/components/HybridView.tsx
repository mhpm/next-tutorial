'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUsers } from '@/queries/users';
import { deleteUser } from '@/actions/users';

/**
 * The Hybrid Component
 * 1. It uses 'useQuery' like a standard client component.
 * 2. Because of HydrationBoundary, the data is ALREADY in the cache.
 * 3. Result: Zero loading spinner on first load, but full TSQ power afterwards.
 */
export default function HybridView() {
  const queryClient = useQueryClient();

  // 1. Fetching (Client-side sync)
  const { data: users, isFetching } = useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers(),
  });

  // 2. Mutation (Optimistic Update)
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteUser(id),
    // 🚀 Optimistic UI Magic!
    onMutate: async (deletedId) => {
      // Cancel any outgoing refetches to avoid overwriting our optimistic update
      await queryClient.cancelQueries({ queryKey: ['users'] });

      // Snapshot the previous state (in case we need to rollback)
      const previousUsers = queryClient.getQueryData(['users']);

      // Optimistically update to the new value (remove the user instantly)
      queryClient.setQueryData(['users'], (old: any) =>
        old ? old.filter((user: any) => user.id !== deletedId) : []
      );

      // Return a context object with the snapshotted value
      return { previousUsers };
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, deletedId, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(['users'], context.previousUsers);
      }
    },
    // Always refetch after error or success to ensure the server and cache are strictly in sync
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-3">
            Live User Directory
            {/* User Counter */}
            <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-full font-mono">
              Total: {users?.length || 0}
            </span>
          </h2>
          <p className="text-slate-500">Managed by TanStack Query</p>
        </div>
        <div className="flex items-center gap-3">
          {isFetching && (
             <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
             </span>
          )}
          <span className="text-sm font-bold text-slate-400 uppercase">
            {isFetching ? 'Syncing...' : 'Up to date'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {users?.map((user) => (
          <div key={user.id} className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-indigo-200 transition-colors flex justify-between items-center group">
            <div>
              <h3 className="font-bold text-lg">{user.name}</h3>
              <p className="text-slate-500 text-sm">{user.email}</p>
            </div>
            
            {/* Delete Button */}
            <button
              onClick={() => deleteMutation.mutate(user.id)}
              disabled={deleteMutation.isPending}
              className="px-4 py-2 bg-red-50 text-red-600 rounded-lg font-semibold opacity-0 group-hover:opacity-100 transition-all hover:bg-red-100 focus:opacity-100 active:scale-95 disabled:opacity-50"
            >
              {deleteMutation.isPending ? '...' : 'Delete'}
            </button>
          </div>
        ))}
        
        {users?.length === 0 && (
          <div className="col-span-2 p-12 text-center text-slate-400 font-bold border-2 border-dashed border-slate-200 rounded-2xl">
            No users found. They were all deleted!
          </div>
        )}
      </div>

      <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
        <h4 className="text-indigo-800 font-bold mb-2 italic">Senior Insight: Optimistic UI</h4>
        <p className="text-indigo-900/70 text-sm leading-relaxed">
          Try deleting a user. You'll notice it disappears **instantly** (0ms latency). This is called Optimistic UI. 
          TanStack Query removes it from the local cache immediately while the Server Action (`deleteUser`) runs in the background. 
          If the server request fails, TanStack Query will automatically roll back the UI change!
        </p>
      </div>
    </div>
  );
}
