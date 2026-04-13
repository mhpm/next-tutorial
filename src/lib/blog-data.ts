export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'nextjs-rendering-strategies',
    title: 'Understanding Next.js Rendering',
    excerpt: 'Learn the difference between SSG, SSR, and ISR.',
    content: 'Next.js offers multiple ways to render your content. Static Site Generation (SSG) is the most performant...',
    date: '2024-03-20',
  },
  {
    slug: 'mastering-server-actions',
    title: 'Mastering Server Actions',
    excerpt: 'How to handle mutations without API routes.',
    content: 'Server Actions are a powerful way to handle form submissions and data mutations directly in your components...',
    date: '2024-03-21',
  },
];
