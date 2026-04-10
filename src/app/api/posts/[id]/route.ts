import { NextResponse } from 'next/server';
import { posts } from '@/lib/data';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return NextResponse.json(
      { error: 'Post not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(post);
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const index = posts.findIndex((p) => p.id === id);

    if (index === -1) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    if (body.title) posts[index].title = body.title;
    if (body.content) posts[index].content = body.content;
    if (body.authorId) posts[index].authorId = body.authorId;
    if (typeof body.likes === 'number') posts[index].likes = body.likes;

    return NextResponse.json(posts[index]);
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
  const index = posts.findIndex((p) => p.id === id);

  if (index === -1) {
    return NextResponse.json(
      { error: 'Post not found' },
      { status: 404 }
    );
  }

  const deletedPost = posts.splice(index, 1);

  return NextResponse.json(
    { message: 'Post deleted successfully', post: deletedPost[0] },
    { status: 200 }
  );
}
