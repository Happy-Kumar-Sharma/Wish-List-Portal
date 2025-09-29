import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyJwt } from '@/lib/auth';

export async function GET(req: NextRequest) {
  // Public: List all wishes with user and status
  const wishes = await prisma.wish.findMany({
    include: { user: { select: { id: true, fullName: true, email: true } } },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(wishes);
}

export async function POST(req: NextRequest) {
  // Auth: Create a new wish
  const token = req.headers.get('authorization')?.replace('Bearer ', '');
  const user = token && verifyJwt(token);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { productName, productLink, description } = await req.json();
  if (!productName || !productLink) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }
  const wish = await prisma.wish.create({
    data: {
      productName,
      productLink,
      description,
      userId: user.id,
    },
  });
  return NextResponse.json(wish);
}
