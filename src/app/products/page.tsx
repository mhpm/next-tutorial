// ISR: Revalidate this page every 10 seconds
export const revalidate = 10;

async function getProducts() {
  // Simulate an API call to a database
  return [
    { id: 1, name: 'Premium Coffee Beans', inventory: Math.floor(Math.random() * 100), price: 29.99 },
    { id: 2, name: 'Eco-Friendly Mug', inventory: Math.floor(Math.random() * 50), price: 15.50 },
    { id: 3, name: 'Drip Coffee Maker', inventory: Math.floor(Math.random() * 20), price: 89.00 },
  ];
}

export default async function ProductsPage() {
  const products = await getProducts();
  const timestamp = new Date().toLocaleTimeString();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-8 sm:p-24">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="space-y-4">
          <div className="inline-block px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest">
            Incremental Static Regeneration (ISR)
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Our Coffee Collection
          </h1>
          <p className="text-zinc-500">Inventory cached at: <span className="font-mono font-bold text-zinc-900 dark:text-zinc-50">{timestamp}</span> (Revalidates every 10s)</p>
        </header>

        <section className="grid sm:grid-cols-3 gap-6">
          {products.map((p) => (
            <div key={p.id} className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500 opacity-5 -mr-8 -mt-8 rounded-full transition-transform group-hover:scale-150" />
              <h3 className="text-xl font-bold mb-4">{p.name}</h3>
              <div className="flex justify-between items-end">
                <p className="text-2xl font-black">${p.price}</p>
                <div className="text-right">
                    <p className="text-[10px] text-zinc-400 font-bold uppercase">Stock</p>
                    <p className={`font-mono font-bold ${p.inventory < 20 ? 'text-rose-500' : 'text-emerald-500'}`}>
                    {p.inventory} units
                    </p>
                </div>
              </div>
            </div>
          ))}
        </section>

        <div className="bg-emerald-50/50 dark:bg-emerald-900/10 rounded-2xl p-8 border border-emerald-100 dark:border-emerald-900/30">
          <h3 className="font-bold text-emerald-900 dark:text-emerald-50 mb-2">Architectural Reason: ISR</h3>
          <p className="text-sm text-emerald-800 dark:text-emerald-400">
            ISR allows us to <span className="font-bold">update static content without rebuilding the entire site</span>. 
            For an e-commerce catalog, we want the speed of SSG, but we need inventory to be 
            relatively fresh. With ISR, the first user after 10s triggers a background rebuild 
            of just this page.
          </p>
        </div>
      </div>
    </div>
  );
}
