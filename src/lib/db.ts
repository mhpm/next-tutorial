import { User, Post } from '@/types';

// In-memory "database" simulation
export let users: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', status: 'online' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', status: 'offline' },
  { id: '3', name: 'Mike Johnson', email: 'mike@example.com', status: 'online' },
  { id: '4', name: 'Sarah Wilson', email: 'sarah@example.com', status: 'offline' },
  { id: '5', name: 'David Brown', email: 'david@example.com', status: 'online' },
  { id: '6', name: 'Emily Davis', email: 'emily@example.com', status: 'offline' },
  { id: '7', name: 'Michael Wilson', email: 'michael@example.com', status: 'online' },
  { id: '8', name: 'Jessica Brown', email: 'jessica@example.com', status: 'offline' },
  { id: '9', name: 'Christopher Davis', email: 'christopher@example.com', status: 'online' },
  { id: '10', name: 'Amanda Wilson', email: 'amanda@example.com', status: 'offline' },
];

export let posts: Post[] = [
  { id: '1', title: 'First Post', content: 'This is the first post.', authorId: '1', likes: 10 },
  { id: '2', title: 'Second Post', content: 'This is the second post.', authorId: '2', likes: 5 },
  { id: '3', title: 'Third Post', content: 'This is the third post.', authorId: '3', likes: 15 },
  { id: '4', title: 'Fourth Post', content: 'This is the fourth post.', authorId: '4', likes: 8 },
  { id: '5', title: 'Fifth Post', content: 'This is the fifth post.', authorId: '5', likes: 20 },
  { id: '6', title: 'Sixth Post', content: 'This is the sixth post.', authorId: '6', likes: 12 },
  { id: '7', title: 'Seventh Post', content: 'This is the seventh post.', authorId: '7', likes: 3 },
  { id: '8', title: 'Eighth Post', content: 'This is the eighth post.', authorId: '8', likes: 18 },
  { id: '9', title: 'Ninth Post', content: 'This is the ninth post.', authorId: '9', likes: 25 },
  { id: '10', title: 'Tenth Post', content: 'This is the tenth post.', authorId: '10', likes: 7 },
];
