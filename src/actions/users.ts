'use server'

import { users } from '@/lib/db';
import { User } from '@/types';
import { revalidatePath } from 'next/cache';

export async function createUser(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const status = (formData.get('status') as 'online' | 'offline') || 'offline';

  if (!name || !email) {
    throw new Error('Name and email are required');
  }

  const newUser: User = {
    id: Math.random().toString(36).substring(2, 9),
    name,
    email,
    status,
  };

  users.push(newUser);
  revalidatePath('/dashboard');
  return newUser;
}

export async function updateUser(id: string, data: Partial<User>) {
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    throw new Error('User not found');
  }

  if (data.name) users[index].name = data.name;
  if (data.email) users[index].email = data.email;
  if (data.status) users[index].status = data.status;

  revalidatePath('/dashboard');
  return users[index];
}

export async function deleteUser(id: string) {
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    throw new Error('User not found');
  }

  const deletedUser = users.splice(index, 1)[0];
  revalidatePath('/dashboard');
  return deletedUser;
}
