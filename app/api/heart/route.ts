import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code } = body;

    if (!code) {
      return NextResponse.json({ error: 'Code is required' }, { status: 400 });
    }

    return NextResponse.json({ updatedCode: code });

  } catch (e) {
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}


export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { code } = body;

    if (!code) {
      return NextResponse.json({ error: 'Code is required' }, { status: 400 });
    }

    return NextResponse.json({ deletedCode: code }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
