'use client'

import { User } from '@/types';
import { deleteUser } from '@/actions/users';
import { useTransition } from 'react';

export function UserCard({ user }: { user: User }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete ${user.name}?`)) {
      startTransition(async () => {
        await deleteUser(user.id);
      });
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
          user.status === 'online' ? 'bg-emerald-500' : 'bg-zinc-300 dark:bg-zinc-700'
        }`}>
          {user.name.charAt(0)}
        </div>
        <div>
          <h3 className="font-medium text-zinc-900 dark:text-zinc-50">{user.name}</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">{user.email}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <div className={`w-2 h-2 rounded-full ${
          user.status === 'online' ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-300 dark:bg-zinc-700'
        }`} />
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="text-xs font-semibold text-rose-500 hover:text-rose-600 border border-rose-200 dark:border-rose-900/30 px-2 py-1 rounded hover:bg-rose-50 dark:hover:bg-rose-900/10 transition-all disabled:opacity-50"
        >
          {isPending ? '...' : 'Remove'}
        </button>
      </div>
    </div>
  );
}
