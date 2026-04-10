import { NextResponse } from 'next/server';
import { posts, type Post } from '@/lib/data';

export async function GET() {
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.title || !body.content || !body.authorId) {
      return NextResponse.json(
        { error: 'Title, content, and authorId are required' },
        { status: 400 }
      );
    }

    const newPost: Post = {
      id: Math.random().toString(36).substring(2, 9),
      title: body.title,
      content: body.content,
      authorId: body.authorId,
      likes: 0,
    };

    posts.push(newPost);

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
