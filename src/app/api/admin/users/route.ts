import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyJwt } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const token = req.headers.get('authorization')?.replace('Bearer ', '');
  const user = token && verifyJwt(token);
  if (!user || user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  const users = await prisma.user.findMany({
    include: { wishes: true },
    orderBy: { createdAt: 'desc' },
  });
  const result = users.map(u => ({
    id: u.id,
    fullName: u.fullName,
    email: u.email,
    wishesCount: u.wishes.length,
    hasWishes: u.wishes.length > 0,
    createdAt: u.createdAt,
  }));
  return NextResponse.json(result);
}
