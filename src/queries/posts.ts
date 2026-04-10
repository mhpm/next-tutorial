import { posts } from '@/lib/db';

export async function getPosts() {
  return posts;
}

export async function getPostById(id: string) {
  return posts.find((p) => p.id === id);
}
