import { blogPosts } from '@/lib/blog-data';
import { notFound } from 'next/navigation';

// SSG: This function generates the static paths at build time
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 p-8 sm:p-24">
      <article className="max-w-2xl mx-auto space-y-8">
        <header className="space-y-4">
          <div className="inline-block px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest">
            Static Site Generation (SSG)
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
            {post.title}
          </h1>
          <time className="block text-zinc-500 font-mono text-sm">{post.date}</time>
        </header>

        <section className="prose dark:prose-invert prose-zinc lg:prose-xl">
          <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed italic border-l-4 border-zinc-200 dark:border-zinc-800 pl-6 mb-12">
            {post.excerpt}
          </p>
          <div className="text-zinc-800 dark:text-zinc-300 leading-8">
            {post.content}
          </div>
        </section>

        <footer className="pt-12 border-t border-zinc-100 dark:border-zinc-900 mt-24">
          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-8 border border-zinc-200 dark:border-zinc-800">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-50 mb-2">Architectural Reason: SSG</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              This page is <span className="font-bold text-indigo-600">pre-rendered at build time</span>. 
              Since the content of a blog post doesn't change often and is the same for all users, 
              SSG provides the best performance and SEO because the HTML is already generated 
              and ready to be served from a CDN.
            </p>
          </div>
        </footer>
      </article>
    </div>
  );
}
