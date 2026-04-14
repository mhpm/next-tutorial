import Link from "next/link";

const strategies = [
  {
    title: "SSG (Static Site Generation)",
    description: "Built at build-time. Best for performance and SEO.",
    href: "/blog/nextjs-rendering-strategies",
    color: "bg-indigo-500",
    badge: "Fastest",
  },
  {
    title: "SSR (Server-Side Rendering)",
    description: "Built on every request. Best for real-time personalization.",
    href: "/market",
    color: "bg-amber-500",
    badge: "Dynamic",
  },
  {
    title: "ISR (Incremental Static Regeneration)",
    description: "Static speed with background updates.",
    href: "/products",
    color: "bg-emerald-500",
    badge: "Hybrid",
  },
  {
    title: "CSR (Client-Side Rendering)",
    description: "Interactivity in the browser. Best for search and apps.",
    href: "/search",
    color: "bg-blue-500",
    badge: "Reactive",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black font-sans selection:bg-indigo-500 selection:text-white">
      <main className="max-w-6xl mx-auto px-6 py-24">
        {/* Hero Section */}
        <section className="text-center space-y-8 mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 animate-fade-in">
             <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
             </span>
             <span className="text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-widest">Mastering Next.js Architecture</span>
          </div>
          <h1 className="text-6xl sm:text-7xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 max-w-4xl mx-auto leading-[1.1]">
            Understand <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Rendering</span> Like a Senior Developer.
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Next.js isn't just about React. It's about choosing the right rendering strategy for the right problem. 
            Explore the four pillars of modern web development below.
          </p>
        </section>

        {/* Strategies Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {strategies.map((s) => (
            <Link key={s.href} href={s.href} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-zinc-100 to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 rounded-3xl -z-10 transition-transform group-hover:scale-[1.02]" />
              <div className="p-8 space-y-6 border border-zinc-200 dark:border-zinc-800 rounded-3xl h-full flex flex-col justify-between hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className={`w-12 h-12 ${s.color} rounded-2xl shadow-lg shadow-${s.color.split('-')[1]}-500/20`} />
                    <span className="px-2 py-1 bg-zinc-200 dark:bg-zinc-800 rounded text-[10px] font-black uppercase tracking-widest">{s.badge}</span>
                  </div>
                  <h2 className="text-2xl font-bold">{s.title}</h2>
                  <p className="text-zinc-500 dark:text-zinc-400 line-clamp-2">{s.description}</p>
                </div>
                <div className="flex items-center gap-2 text-sm font-bold group-hover:gap-4 transition-all pt-6">
                  Learn How & Why <span className="text-xl">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Advanced Concepts: Proxy */}
        <div className="mt-12">
          <Link href="/proxy-demo" className="group relative block overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-indigo-600 group-hover:bg-indigo-700 transition-colors" />
            <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500 text-indigo-100 text-[10px] font-bold uppercase tracking-widest">
                  New in Version 16
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white">The Proxy Lab (Request Interception)</h2>
                <p className="text-indigo-100/80 text-lg max-w-xl">
                  Bypass CORS, protect routes, and inject global logic using the new <code className="bg-indigo-800 px-1 rounded">proxy.ts</code> convention.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl text-white font-mono text-sm group-hover:scale-105 transition-transform">
                <div className="text-indigo-300">// proxy.ts</div>
                <div>export function <span className="text-amber-300">proxy</span>(req) {"{"}</div>
                <div className="pl-4">return NextResponse.<span className="text-emerald-300">rewrite</span>(...)</div>
                <div>{"}"}</div>
              </div>
            </div>
          </Link>
        </div>

        {/* Advanced Concepts: Revalidation */}
        <div className="mt-8">
          <Link href="/revalidation-lab" className="group relative block overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-emerald-600 group-hover:bg-emerald-700 transition-colors" />
            <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500 text-emerald-100 text-[10px] font-bold uppercase tracking-widest">
                  Fine-Grained Caching
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white">The Revalidation Lab</h2>
                <p className="text-emerald-100/80 text-lg max-w-xl">
                  Master <code className="bg-emerald-800 px-1 rounded">cacheLife</code> and <code className="bg-emerald-800 px-1 rounded">revalidateTag</code> to balance speed and freshness.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl text-white font-mono text-sm group-hover:scale-105 transition-transform">
                <div className="text-emerald-300">// Function-level Cache</div>
                <div>async function <span className="text-amber-300">getData</span>() {"{"}</div>
                <div className="pl-4">'use cache';</div>
                <div className="pl-4">cacheLife('<span className="text-emerald-300">seconds</span>');</div>
                <div>{"}"}</div>
              </div>
            </div>
          </Link>
        </div>

        {/* Advanced Concepts: Hybrid Strategy */}
        <div className="mt-8">
          <Link href="/hybrid-lab" className="group relative block overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-slate-800 group-hover:bg-slate-900 transition-colors" />
            <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-700 text-slate-100 text-[10px] font-bold uppercase tracking-widest">
                  Maximum Power
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white">Next.js + TanStack Query</h2>
                <p className="text-slate-300 text-lg max-w-xl">
                  Hydrate server data into the client cache for the ultimate "App-like" experience.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl text-white font-mono text-sm group-hover:scale-105 transition-transform text-right">
                <div className="text-slate-400">// HydrationBoundary</div>
                <div>{"<"} <span className="text-indigo-400">HybridView</span> {"/>"}</div>
                <div className="text-slate-500 text-[10px] mt-2 italic">No more spinners.</div>
              </div>
            </div>
          </Link>
        </div>

        {/* Admin Link */}
        <div className="mt-24 pt-12 border-t border-zinc-100 dark:border-zinc-900 text-center">
             <Link href="/dashboard" className="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                <span className="text-sm font-medium">Go to Admin Dashboard (Server Actions Example)</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                   <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                </svg>
             </Link>
        </div>
      </main>
    </div>
  );
}
