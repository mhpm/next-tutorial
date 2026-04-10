'use client'

import { Post } from '@/types';
import { updatePost, deletePost } from '@/actions/posts';
import { useTransition } from 'react';

export function PostCard({ post }: { post: Post }) {
  const [isPending, startTransition] = useTransition();

  const handleLike = () => {
    startTransition(async () => {
      await updatePost(post.id, { likes: post.likes + 1 });
    });
  };

  const handleDelete = () => {
     if (confirm('Delete this post?')) {
        startTransition(async () => {
           await deletePost(post.id);
        });
     }
  }

  return (
    <div className="group relative p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-4">
         <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
            {post.title}
         </h3>
         <button 
            onClick={handleDelete}
            className="opacity-0 group-hover:opacity-100 p-1 text-zinc-400 hover:text-rose-500 transition-all"
         >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
               <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
               <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg>
         </button>
      </div>
      
      <p className="text-zinc-600 dark:text-zinc-400 line-clamp-3 text-sm leading-relaxed mb-6">
        {post.content}
      </p>
      
      <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800">
        <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
          ID: {post.id}
        </label>
        <button
          onClick={handleLike}
          disabled={isPending}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400 transition-all active:scale-95 disabled:opacity-50"
        >
          <span>❤️</span>
          <span className="font-mono text-xs font-bold">{post.likes}</span>
        </button>
      </div>
    </div>
  );
}
