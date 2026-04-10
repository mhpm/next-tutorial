import { NextResponse } from 'next/server';
import { posts } from '@/lib/data';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const index = posts.findIndex((p) => p.id === id);

  if (index === -1) {
    return NextResponse.json(
      { error: 'Post not found' },
      { status: 404 }
    );
  }

  posts[index].likes += 1;

  return NextResponse.json(
    { message: 'Post liked!', likes: posts[index].likes },
    { status: 200 }
  );
}
