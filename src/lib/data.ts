export interface User {
  id: string;
  name: string;
  email: string;
  status: 'online' | 'offline';
}

// In-memory "database"
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
