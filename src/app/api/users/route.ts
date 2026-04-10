import { NextResponse } from 'next/server';
import { users, type User } from '@/lib/data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');

  if (name) {
    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(name.toLowerCase())
    );
    return NextResponse.json(filteredUsers);
  }

  return NextResponse.json(users);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    const newUser: User = {
      id: Math.random().toString(36).substring(2, 9),
      name: body.name,
      email: body.email,
      status: body.status || 'offline',
    };

    users.push(newUser);

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
