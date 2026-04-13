// SSR: Force dynamic rendering on every request
export const dynamic = 'force-dynamic';

async function getStockPrices() {
  // Simulate a database fetch for dynamic data
  return [
    { symbol: 'AAPL', price: (180 + Math.random() * 10).toFixed(2), change: (Math.random() * 2 - 1).toFixed(2) },
    { symbol: 'TSLA', price: (170 + Math.random() * 20).toFixed(2), change: (Math.random() * 5 - 2).toFixed(2) },
    { symbol: 'NVDA', price: (900 + Math.random() * 50).toFixed(2), change: (Math.random() * 10 - 5).toFixed(2) },
  ];
}

export default async function MarketPage() {
  const stocks = await getStockPrices();
  const timestamp = new Date().toLocaleTimeString();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-8 sm:p-24">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="space-y-4">
          <div className="inline-block px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-widest">
            Server-Side Rendering (SSR)
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Live Market Overview
          </h1>
          <p className="text-zinc-500">Last updated on the server at: <span className="font-mono font-bold text-zinc-900 dark:text-zinc-50">{timestamp}</span></p>
        </header>

        <section className="grid gap-6">
          {stocks.map((stock) => (
            <div key={stock.symbol} className="flex items-center justify-between p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm">
              <div className="space-y-1">
                <h3 className="text-2xl font-black">{stock.symbol}</h3>
                <p className="text-xs text-zinc-400 font-bold uppercase tracking-tighter">Technology Sector</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-mono font-bold">${stock.price}</p>
                <p className={`text-sm font-bold ${Number(stock.change) >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {Number(stock.change) >= 0 ? '+' : ''}{stock.change}%
                </p>
              </div>
            </div>
          ))}
        </section>

        <div className="bg-amber-50/50 dark:bg-amber-900/10 rounded-2xl p-8 border border-amber-100 dark:border-amber-900/30">
          <h3 className="font-bold text-amber-900 dark:text-amber-50 mb-2">Architectural Reason: SSR</h3>
          <p className="text-sm text-amber-800 dark:text-amber-400">
            This page <span className="font-bold">fetches data on every single request</span>. 
            SSR is ideal for financial data or stock prices that change constantly and must be 
            accurate the moment the user hits the page. Unlike SSG, we cannot pre-render this because 
            it would be stale immediately.
          </p>
        </div>
      </div>
    </div>
  );
}
