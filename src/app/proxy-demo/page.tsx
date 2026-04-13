import Link from 'next/link';

export default function ProxyDemoPage() {
  return (
    <main className="min-h-screen p-8 bg-slate-50 text-slate-900 font-sans">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header Section */}
        <header className="space-y-4">
          <h1 className="text-5xl font-extrabold tracking-tight text-indigo-600">
            Next.js Proxy Lab
          </h1>
          <p className="text-xl text-slate-600">
            Mastering <code className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded">proxy.ts</code>: The Next-Gen Network Interceptor.
          </p>
        </header>

        {/* Use Cases Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Use Case 1: Route Protection */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="p-2 bg-red-100 rounded-lg text-red-600">🔒</span>
              Security Boundary
            </h2>
            <p className="text-slate-600 mb-6">
              The proxy intercepts requests to <code className="text-indigo-600">/admin</code> before they reach the server logic. Try accessing it without the "admin_token" cookie.
            </p>
            <Link 
              href="/admin" 
              className="inline-block px-6 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors"
            >
              Test Protected Route
            </Link>
            <div className="mt-4 p-4 bg-slate-50 rounded-lg border-l-4 border-red-500">
              <p className="text-sm font-medium text-slate-700 italic">
                "What happened? You were instantly redirected back home because proxy.ts caught you."
              </p>
            </div>
          </section>

          {/* Use Case 2: CORS/Rewrite */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="p-2 bg-blue-100 rounded-lg text-blue-600">🔀</span>
              Dynamic Rewriting
            </h2>
            <p className="text-slate-600 mb-6">
              Rewriting is the ultimate tool for resolving CORS. We can hide external APIs behind our own domain.
            </p>
            <Link 
              href="/api/proxy-example" 
              className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
            >
              Test Proxy Fetch
            </Link>
            <div className="mt-4 p-4 bg-slate-50 rounded-lg border-l-4 border-blue-500">
              <p className="text-sm font-medium text-slate-700 italic">
                "Wait, this URL looks like an API but it shows the Market page! That's a proxy rewrite."
              </p>
            </div>
          </section>

        </div>

        {/* Architectural Reasoning */}
        <div className="bg-indigo-900 text-white p-8 rounded-3xl shadow-xl">
          <h2 className="text-3xl font-bold mb-6">Architectural Justification: "Why Proxy?"</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-indigo-300">Cleanliness</h3>
              <p className="text-indigo-100/80 leading-relaxed">
                Removes cross-cutting concerns (Auth, Logging) from individual components and pages. Centralizes request logic.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-indigo-300">Performance</h3>
              <p className="text-indigo-100/80 leading-relaxed">
                Proxies run at the Network Edge (if using Vercel/Edge Runtime). They can block malicious bots before they ever touch your heavy SSR logic.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-indigo-300">Flexibility</h3>
              <p className="text-indigo-100/80 leading-relaxed">
                Allows for multi-tenancy or A/B testing by serving different content to different users on the same URL path.
              </p>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <footer className="text-center pt-8 border-t border-slate-200 text-slate-500 text-sm">
          Built for Learning: Next.js 16 Proxy Implementation.
        </footer>
      </div>
    </main>
  );
}
