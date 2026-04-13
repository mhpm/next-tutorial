import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Next.js 16+ Proxy Function (formerly Middleware)
 * 
 * This function runs before every request in your application.
 * It is perfectly suited for:
 * 1. Global Authentication / Security
 * 2. Rewriting URLs for CORS resolution
 * 3. Feature Flagging / A/B Testing
 * 4. Bot Protection & Rate Limiting
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // --- Example 1: Security / Route Protection ---
  // Let's pretend we have an admin section that requires a specific cookie
  if (pathname.startsWith('/admin')) {
    const isAdmin = request.cookies.get('admin_token');
    if (!isAdmin) {
      // For educational purposes, we just log it and redirect to home
      console.log('--- [Proxy] Unauthorized access attempt to /admin');
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // --- Example 2: API Proxying (CORS Resolution) ---
  // If a request comes to /api/external, we rewrite it to an external service
  // This allows the browser to bypass CORS because the server handles the request.
  if (pathname.startsWith('/api/proxy-example')) {
    console.log(`--- [Proxy] Rewriting ${pathname} to external service...`);
    
    // In a real scenario, this could be: https://external-api.com/data
    // For this demo, we'll rewrite it to a special "market" query on our own server
    return NextResponse.rewrite(new URL('/market', request.url));
  }

  // --- Example 3: Adding custom headers ---
  // We can inject headers into the request or response globally
  const response = NextResponse.next();
  response.headers.set('X-Nextjs-Architecture', 'Senior-Proxy-Pattern');
  
  return response;
}

// Optimization: Use a matcher to only run the proxy on specific routes
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
