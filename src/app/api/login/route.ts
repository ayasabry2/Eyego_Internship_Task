import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: 'Email and password are required.' },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return NextResponse.json(
      { error: 'Password must be at least 8 characters long.' },
      { status: 400 }
    );
  }

  const validEmail = 'Aya.Sabry@gmail.com';
  const validPassword = 'password';

  if (email !== validEmail) {
    return NextResponse.json(
      { error: 'Email is incorrect.' },
      { status: 401 }
    );
  }

  if (password !== validPassword) {
    return NextResponse.json(
      { error: 'Password is incorrect.' },
      { status: 401 }
    );
  }

  return NextResponse.json(
    {
      id: 1,
      firstName: 'Aya',
      lastName: 'Sabry',
      email: validEmail,
      role: 'Admin',
    },
    { status: 200 }
  );
}
