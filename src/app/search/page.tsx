'use client'

import { useState } from 'react';

const ALL_ITEMS = [
  'Next.js 14 Basics',
  'Advanced React Patterns',
  'Tailwind CSS Tips',
  'Server Components Deep Dive',
  'Edge Runtime Explained',
  'Prisma and Databases',
  'TypeScript Best Practices',
];

export default function SearchPage() {
  const [query, setQuery] = useState('');

  const filteredItems = ALL_ITEMS.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-8 sm:p-24">
      <div className="max-w-xl mx-auto space-y-12">
        <header className="space-y-4">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest">
            Client-Side Rendering (CSR)
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Interactive Course Search
          </h1>
          <p className="text-zinc-500">Searching happens entirely in your browser.</p>
        </header>

        <section className="space-y-6">
          <div className="relative group">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search courses..."
              className="w-full h-14 px-6 bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm focus:border-blue-500 outline-none transition-all text-lg"
            />
            <div className="absolute right-4 top-4 text-zinc-300 group-focus-within:text-blue-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
          </div>

          <ul className="grid gap-3">
            {filteredItems.map((item) => (
              <li key={item} className="p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-700 dark:text-zinc-300 font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                {item}
              </li>
            ))}
            {filteredItems.length === 0 && (
              <p className="text-center py-12 text-zinc-400">No courses found matching "{query}"</p>
            )}
          </ul>
        </section>

        <div className="bg-blue-50/50 dark:bg-blue-900/10 rounded-2xl p-8 border border-blue-100 dark:border-blue-900/30">
          <h3 className="font-bold text-blue-900 dark:text-blue-50 mb-2">Architectural Reason: CSR</h3>
          <p className="text-sm text-blue-800 dark:text-blue-400">
            This component uses <span className="font-bold">'use client'</span>. 
            CSR is the best choice for <span className="font-bold">instant interactivity</span> where 
            re-fetching from the server would slow down the user experience. By filtering the list 
            in the browser, we provide a snappy, reactive UI that responds to every keystroke.
          </p>
        </div>
      </div>
    </div>
  );
}
