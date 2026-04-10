import { NextResponse } from 'next/server';
import { users } from '@/lib/data';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const user = users.find((u) => u.id === id);

  if (!user) {
    return NextResponse.json(
      { error: 'User not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(user);
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const index = users.findIndex((u) => u.id === id);

    if (index === -1) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    if (body.name) users[index].name = body.name;
    if (body.email) users[index].email = body.email;
    if (body.status) users[index].status = body.status;

    return NextResponse.json(users[index]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const index = users.findIndex((user) => user.id === id);

  if (index === -1) {
    return NextResponse.json(
      { error: 'User not found' },
      { status: 404 }
    );
  }

  const deletedUser = users.splice(index, 1);

  return NextResponse.json(
    { message: 'User deleted successfully', user: deletedUser[0] },
    { status: 200 }
  );
}
