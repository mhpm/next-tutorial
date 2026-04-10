import { users } from '@/lib/db';

export async function getUsers(nameQuery?: string) {
  if (nameQuery) {
    return users.filter((user) =>
      user.name.toLowerCase().includes(nameQuery.toLowerCase())
    );
  }
  return users;
}

export async function getUserById(id: string) {
  return users.find((u) => u.id === id);
}
