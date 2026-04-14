'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

/**
 * Why a Providers component?
 * 1. TanStack Query needs a Context Provider.
 * 2. Layouts cannot be client components if they contain certain server logic.
 * 3. This pattern keeps the Root Layout clean and server-rendered.
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  // We ensure the QueryClient is created only once per session
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With Next.js, we often want to avoid redundant fetches
            staleTime: 60 * 1000,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
