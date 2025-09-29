import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') || '';
  const status = searchParams.get('status');
  const where: any = {};
  if (q) {
    where.productName = { contains: q, mode: 'insensitive' };
  }
  if (status === 'purchased') where.purchased = true;
  if (status === 'not_purchased') where.purchased = false;
  const wishes = await prisma.wish.findMany({
    where,
    include: { user: { select: { id: true, fullName: true } } },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(wishes);
}
