import { getSecondsData, getMinutesData, getCustomCachedData } from '@/queries/revalidation';
import RevalidationButtons from '@/components/RevalidationButtons';

export default async function RevalidationLab() {
  // Fetching cached data at the server level
  const [seconds, minutes, custom] = await Promise.all([
    getSecondsData(),
    getMinutesData(),
    getCustomCachedData(),
  ]);

  return (
    <main className="min-h-screen p-8 bg-slate-50 text-slate-900 font-sans">
      <div className="max-w-5xl mx-auto space-y-12">
        <header className="space-y-4">
          <h1 className="text-5xl font-extrabold tracking-tight text-emerald-600">
            Revalidation Lab
          </h1>
          <p className="text-xl text-slate-600">
            Mastering the <code className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded">"use cache"</code> model in Next.js 16.
          </p>
        </header>

        {/* Action Controls */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-400 uppercase tracking-widest">Manual Controls</h2>
          <RevalidationButtons />
        </section>

        {/* Data Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Card 1: Seconds */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-emerald-100 space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <span className="animate-pulse w-3 h-3 bg-emerald-500 rounded-full inline-block" />
            </div>
            <h3 className="text-sm font-black text-emerald-500 uppercase tracking-tighter">Fast Cache</h3>
            <p className="text-5xl font-mono font-bold tracking-tighter">{seconds.timestamp}</p>
            <p className="text-slate-500">{seconds.type}</p>
            <div className="pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                Uses <strong>cacheLife('seconds')</strong>. Revalidates every 1 second in the background.
              </p>
            </div>
          </div>

          {/* Card 2: Minutes */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-amber-100 space-y-4 relative overflow-hidden">
            <h3 className="text-sm font-black text-amber-500 uppercase tracking-tighter">Slow Cache</h3>
            <p className="text-5xl font-mono font-bold tracking-tighter">{minutes.timestamp}</p>
            <p className="text-slate-500">{minutes.type}</p>
            <div className="pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                Uses <strong>cacheLife('minutes')</strong>. Content is stale for 5 mins but checks every 1 min.
              </p>
            </div>
          </div>

          {/* Card 3: Custom */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-indigo-100 space-y-4 relative overflow-hidden">
            <h3 className="text-sm font-black text-indigo-500 uppercase tracking-tighter">Custom Policy</h3>
            <p className="text-5xl font-mono font-bold tracking-tighter">{custom.timestamp}</p>
            <p className="text-slate-500">{custom.type}</p>
            <div className="pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                <strong>Stale at 10s</strong>. Background revalidate at 30s. Perfect for specific business logic.
              </p>
            </div>
          </div>

        </div>

        {/* Architectural Insight */}
        <div className="bg-slate-900 text-white p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full -mr-32 -mt-32" />
           <h2 className="text-3xl font-bold mb-8">Architectural Justification: "Why Revalidate?"</h2>
           <div className="grid md:grid-cols-2 gap-12">
             <div className="space-y-4">
               <h3 className="text-xl font-semibold text-emerald-400">The Power of SWR</h3>
               <p className="text-slate-400 leading-relaxed">
                 Stale-While-Revalidate (SWR) means your site is **always fast**. Users get a cached version instantly, and the server fetches fresh data silently in the background. You never sacrifice performance for freshness.
               </p>
             </div>
             <div className="space-y-4">
               <h3 className="text-xl font-semibold text-emerald-400">On-Demand Precision</h3>
               <p className="text-slate-400 leading-relaxed">
                 Using <strong>revalidateTag</strong> or <strong>updateTag</strong> allows you to build "Instant-Update" systems. When you update a product in the CMS, you trigger the tag, and the site updates without a full rebuild.
               </p>
             </div>
           </div>
        </div>
      </div>
    </main>
  );
}
