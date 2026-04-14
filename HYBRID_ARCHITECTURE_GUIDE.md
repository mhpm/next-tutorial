# 🔋 The Hybrid Architecture: Next.js 16 + TanStack Query

While Next.js excels at server-side rendering and initial page loads, **TanStack Query (React Query)** is the industry standard for managing complex client-side state, polling, and interactive UI sync.

Combining them creates a **Hybrid Architecture** that provides the ultimate "App-like" experience.

---

## 🏗️ 1. The Strategy: Why Combine Them?

As a senior developer, you justify this combination based on the lifecycle of user interaction:

1.  **The Server (Next.js)** handles the **First Byte**. We pre-fetch data on the server so the HTML arrives fully populated. *Benefit: Zero initial loading spinners and perfect SEO.*
2.  **The Client (TanStack Query)** handles the **Living Page**. Once the page is loaded (hydrated), TanStack Query takes over the data. *Benefit: Background refetching, window-focus syncing, and easy `isFetching` UI states without full page reloads.*

---

## 🛠️ 2. Implementation: The Hydration Pattern

Instead of making the client fetch data on mount, we use the **HydrationBoundary** pattern.

### Step 1: The Global Provider
TanStack Query requires a `QueryClientProvider`. We place this in a Client Component (`Providers.tsx`) and wrap our Server Layout with it.

### Step 2: The Server Pre-fetch (The "Suspense" Shell)
In Next.js 16, fetching dynamic data at the root of a page causes a "Blocking Route" error. We solve this by breaking the page into a shell and a data-fetching sub-component wrapped in `<Suspense>`.

```tsx
// src/app/hybrid-lab/page.tsx
import { Suspense } from 'react';
import { connection } from 'next/server';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

async function HybridContent() {
  // 1. Tell Next.js this is a dynamic route to prevent 'Date.now()' build errors
  await connection();

  const queryClient = new QueryClient();

  // 2. Fetch data on the server and put it into the TSQ Cache
  await queryClient.prefetchQuery({
    queryKey: ['users'],
    queryFn: () => getUsers(), 
  });

  // 3. 'Dehydrate' (serialize) the cache and pass it to the client
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HybridView />
    </HydrationBoundary>
  );
}

export default async function Page() {
  return (
    <main>
      <h1>My Fast App</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <HybridContent />
      </Suspense>
    </main>
  );
}
```

### Step 3: The Client Consumer
Inside the `HydrationBoundary`, client components can use `useQuery`. Because the data was passed down, it is *already in the cache*.

```tsx
// src/components/HybridView.tsx
'use client';
import { useQuery } from '@tanstack/react-query';

export default function HybridView() {
  // This will NOT trigger a network request on mount!
  const { data, isFetching } = useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers(),
  });

  return <div>{/* Render data */}</div>;
}
```

---

## 🚨 3. Next.js 16 Architectural Gotchas

When building this pattern in Next.js 16, you must handle two critical nuances:

### Gotcha 1: The `Date.now()` Next.js Error
**Problem**: TanStack Query uses `Date.now()` internally to timestamp cache entries. With Next.js 16's "Dynamic IO", using time functions during a static pre-render causes build errors.
**Solution**: Use `await connection()` from `next/server` *before* instantiating the `QueryClient`. This explicitly signals to Next.js that the route is dynamic, allowing time-based functions to safely execute.

### Gotcha 2: The `QueryFunction` Type Error
**Problem**: `queryFn: getUsers` causes a TypeScript error: `Expected 2 arguments, but got 1`.
**Why**: TanStack passes a complex `QueryFunctionContext` object to your function. If your function expects a string (like an ID), types will clash.
**Solution**: Always use an anonymous function boundary: `queryFn: () => getUsers()`.

### Gotcha 3: The "Blocking Route" Notice
**Problem**: Warning: `Uncached data or connection() was accessed outside of <Suspense>`.
**Solution**: Never `await connection()` or `prefetchQuery` directly inside the default `export default async function Page()` route handler. Isolate fetching into an async sub-component and render it wrapped in React's `<Suspense>` to enable Streaming SSR.

---
*Guide created for mastering Next.js 16 Hybrid Rendering patterns.*
