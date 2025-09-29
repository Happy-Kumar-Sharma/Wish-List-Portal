import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/auth';
import { sendMail } from '@/lib/email';

export async function POST(req: NextRequest) {
  const { fullName, email, password } = await req.json();
  if (!fullName || !email || !password) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) {
    return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
  }
  const hashed = await hashPassword(password);
  const user = await prisma.user.create({
    data: { fullName, email, password: hashed },
  });
  await sendMail({
    to: email,
    subject: 'Welcome to Wish List Portal',
    html: `<p>Hello ${fullName},<br/>Your registration is successful!</p>`
  });
  return NextResponse.json({ message: 'Registered', user: { id: user.id, email: user.email } });
}
