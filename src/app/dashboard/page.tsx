import { getUsers } from '@/queries/users';
import { getPosts } from '@/queries/posts';
import { UserCard } from '@/components/UserCard';
import { PostCard } from '@/components/PostCard';
import { CreateUserForm } from '@/components/CreateUserForm';

export default async function DashboardPage() {
  const users = await getUsers();
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <header className="flex justify-between items-end border-b border-zinc-200 dark:border-zinc-800 pb-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Admin Dashboard
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 mt-2">
              Managing users and posts using Server Actions.
            </p>
          </div>
          <div className="flex gap-4">
             <div className="px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-sm">
                <span className="text-sm text-zinc-500">Users:</span>
                <span className="ml-2 font-mono font-bold">{users.length}</span>
             </div>
             <div className="px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-sm">
                <span className="text-sm text-zinc-500">Posts:</span>
                <span className="ml-2 font-mono font-bold">{posts.length}</span>
             </div>
          </div>
        </header>

        <section className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <h2 className="text-xl font-semibold mb-6">Create New User</h2>
            <CreateUserForm />
          </div>
          
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-xl font-semibold">Active Users</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {users.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl font-semibold">Latest Posts</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
