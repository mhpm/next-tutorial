'use client'

import { createUser } from '@/actions/users';
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full h-10 px-4 py-2 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 rounded-lg font-medium transition-all hover:opacity-90 disabled:opacity-50"
    >
      {pending ? 'Creating...' : 'Create User'}
    </button>
  );
}

export function CreateUserForm() {
  return (
    <form
      action={async (formData) => {
        try {
          await createUser(formData);
          // Optional: handle success (e.g., toast)
        } catch (error) {
          alert(error instanceof Error ? error.message : 'Something went wrong');
        }
      }}
      className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm space-y-4"
    >
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Name</label>
        <input
          name="name"
          placeholder="Jane Doe"
          className="w-full h-10 px-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-zinc-500 outline-none transition-all"
          required
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Email</label>
        <input
          name="email"
          type="email"
          placeholder="jane@example.com"
          className="w-full h-10 px-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-zinc-500 outline-none transition-all"
          required
        />
      </div>
      <div className="space-y-2 pb-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Status</label>
        <select
          name="status"
          className="w-full h-10 px-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-zinc-500 outline-none transition-all"
        >
          <option value="online">Online</option>
          <option value="offline">Offline</option>
        </select>
      </div>
      <SubmitButton />
    </form>
  );
}
