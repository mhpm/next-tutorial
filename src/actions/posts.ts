'use server'

import { posts } from '@/lib/db';
import { Post } from '@/types';
import { revalidatePath } from 'next/cache';

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const authorId = formData.get('authorId') as string;

  if (!title || !content || !authorId) {
    throw new Error('Title, content, and authorId are required');
  }

  const newPost: Post = {
    id: Math.random().toString(36).substring(2, 9),
    title,
    content,
    authorId,
    likes: 0,
  };

  posts.push(newPost);
  revalidatePath('/dashboard');
  return newPost;
}

export async function updatePost(id: string, data: Partial<Post>) {
  const index = posts.findIndex((p) => p.id === id);

  if (index === -1) {
    throw new Error('Post not found');
  }

  if (data.title) posts[index].title = data.title;
  if (data.content) posts[index].content = data.content;
  if (data.authorId) posts[index].authorId = data.authorId;
  if (typeof data.likes === 'number') posts[index].likes = data.likes;

  revalidatePath('/dashboard');
  return posts[index];
}

export async function deletePost(id: string) {
  const index = posts.findIndex((p) => p.id === id);

  if (index === -1) {
    throw new Error('Post not found');
  }

  const deletedPost = posts.splice(index, 1)[0];
  revalidatePath('/dashboard');
  return deletedPost;
}
