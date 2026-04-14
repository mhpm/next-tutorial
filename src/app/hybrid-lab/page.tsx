import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getUsers } from '@/queries/users';
import HybridView from '@/components/HybridView';
import { connection } from 'next/server';

/**
 * Senior Technical Solution:
 * This component handles the 'Dynamic' part of the page.
 * By putting it in its own component, we can wrap it in <Suspense>.
 */
async function HybridContent() {
  // 1. Signal dynamic intent
  await connection();

  const queryClient = new QueryClient();

  // 2. Prefetch data
  await queryClient.prefetchQuery({
    queryKey: ['users'],
    queryFn: () => getUsers(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HybridView />
    </HydrationBoundary>
  );
}

import { Suspense } from 'react';

export default async function HybridLabPage() {
  return (
    <main className="min-h-screen p-8 bg-slate-50 text-slate-900 font-sans">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="space-y-4">
          <h1 className="text-5xl font-extrabold tracking-tight text-indigo-600">
            Next.js + TanStack Query
          </h1>
          <p className="text-xl text-slate-600">
            The <code className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded">HydrationBoundary</code> Pattern.
          </p>
        </header>

        {/* 
          Architectural Justification:
          Wrap dynamic fetching in Suspense to prevent 'Blocking Route' errors.
          This allows Next.js to stream the UI while data is being prepared.
        */}
        <Suspense fallback={<div className="p-12 text-center text-slate-400 font-bold animate-pulse">Initializing Hybrid Cache...</div>}>
          <HybridContent />
        </Suspense>

        <footer className="text-center pt-8 border-t border-slate-200 text-slate-500 text-sm">
          Built for High-Performance Applications.
        </footer>
      </div>
    </main>
  );
}
