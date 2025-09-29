import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyJwt } from '@/lib/auth';

// PATCH: Edit wish, DELETE: Delete wish, POST: Mark as purchased
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const token = req.headers.get('authorization')?.replace('Bearer ', '');
  const user = token && verifyJwt(token);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const wish = await prisma.wish.findUnique({ where: { id: Number(params.id) } });
  if (!wish || wish.userId !== user.id || wish.purchased) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  const { productName, productLink, description } = await req.json();
  const updated = await prisma.wish.update({
    where: { id: wish.id },
    data: { productName, productLink, description },
  });
  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const token = req.headers.get('authorization')?.replace('Bearer ', '');
  const user = token && verifyJwt(token);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const wish = await prisma.wish.findUnique({ where: { id: Number(params.id) } });
  if (!wish || wish.userId !== user.id || wish.purchased) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  await prisma.wish.delete({ where: { id: wish.id } });
  return NextResponse.json({ message: 'Deleted' });
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  // Mark as purchased
  const token = req.headers.get('authorization')?.replace('Bearer ', '');
  const user = token && verifyJwt(token);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const wish = await prisma.wish.findUnique({ where: { id: Number(params.id) } });
  if (!wish || wish.purchased) {
    return NextResponse.json({ error: 'Already purchased or not found' }, { status: 400 });
  }
  const updated = await prisma.wish.update({
    where: { id: wish.id },
    data: { purchased: true, purchasedBy: user.id },
  });
  // TODO: Send notification to wish owner
  return NextResponse.json(updated);
}
