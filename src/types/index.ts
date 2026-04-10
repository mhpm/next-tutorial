export interface User {
  id: string;
  name: string;
  email: string;
  status: 'online' | 'offline';
}

export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  likes: number;
}
