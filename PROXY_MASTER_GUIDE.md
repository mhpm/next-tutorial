# 🔀 The Ultimate Next.js Proxy Guide (`proxy.ts`)

In Next.js 16, the architecture for intercepting requests has matured. The file previously known as `middleware.ts` has been replaced by **`proxy.ts`** (or `proxy.js`). 

This change isn't just a rename; it reflects a shift in architecture where this file acts as a **true network boundary** (a programmable proxy) between the user and your application logic.

---

## 🏛️ 1. What is the Proxy for? (The "Why")

As a senior developer, you justify using a proxy/middleware when you need to handle logic **before a request hits your route or page**. The most common use cases are:

*   **CORS Bypass (Rewriting)**: When you need to fetch data from an external API that blocks your browser domain (CORS), you can route the request through your own server first.
*   **Security & Early Auth**: Checking for session cookies or tokens at the "Gate" (Proxy) is more efficient than checking them inside every individual Page or Server Action.
*   **A/B Testing**: Dynamically serving a different version of a page (e.g., `/home-v2`) while keeping the URL as `/home` for the user.
*   **Request/Response Decoration**: Adding specific headers (like `X-Frame-Options` for security) to every single response globally.

---

## 🛠️ 2. Implementation: `src/proxy.ts`

We have implemented a professional `proxy.ts` in this project with three real-world patterns:

1.  **Route Protection**: It blocks access to `/admin` without a token.
2.  **CORS Resolution**: It rewrites `/api/proxy-example` locally to resolve browser security issues.
3.  **Header Injection**: It adds a custom architectural header to every response.

```typescript
// src/proxy.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Next.js 16+ Proxy Function
 * Acts as a programmable network boundary.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Example: Redirecting unauthorized users
  // Justification: Stop unauthorized requests before they trigger heavy SSR/DB logic.
  if (pathname.startsWith('/admin')) {
    const isAdmin = request.cookies.get('admin_token');
    if (!isAdmin) {
      console.log('--- [Proxy] Unauthorized access attempt to /admin');
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // 2. Example: Bypassing CORS by rewriting locally
  // Justification: Resolve browser security blocks without exposing external URLs.
  if (pathname.startsWith('/api/proxy-example')) {
    console.log(`--- [Proxy] Rewriting ${pathname} to resolve CORS...`);
    return NextResponse.rewrite(new URL('/market', request.url));
  }

  // 3. Example: Universal Headers
  // Justification: Centralize security and metadata headers for the entire app.
  const response = NextResponse.next();
  response.headers.set('X-Architecture', 'Senior-Proxy-Pattern');
  
  return response;
}

// Optimization: Using a matcher to ensure performance
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
```

---

## 🧪 3. Exploring the Proxy Lab

We have created a "Proxy Lab" page to see these architectural reasons in action.

*   **Demo URL**: [http://localhost:3000/proxy-demo](http://localhost:3000/proxy-demo)
*   **Logic File**: [src/proxy.ts](file:///c:/Users/miche/Documents/code/react/next-tutorial/src/proxy.ts)
*   **Demo Page**: [src/app/proxy-demo/page.tsx](file:///c:/Users/miche/Documents/code/react/next-tutorial/src/app/proxy-demo/page.tsx)

---

## 📋 Summary of Senior Justifications

| Feature | When to use? | Why? (The Architectural Reason) |
| :--- | :--- | :--- |
| **Redirects** | Auth / Maintenance | Block access before heavy SSR/DB logic runs. Save server resources. |
| **Rewrites** | CORS / Proxying APIs | Resolve browser security blocks (Same-Origin Policy) without exposing external endpoints. |
| **Cookies** | Personalization / A-B Testing | Decide what content version to serve at the edge for maximum speed. |
| **Headers** | Security Compliance | Ensure headers like `Content-Security-Policy` are present on every single page automatically. |

---

## 🔗 Official Documentation Reference
For more advanced configurations, refer to the official Next.js documentation:
[https://nextjs.org/docs/app/getting-started/proxy](https://nextjs.org/docs/app/getting-started/proxy)

---
*Guide created for mastering Next.js 16 Network Interception.*
