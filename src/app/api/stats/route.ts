import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const totalUsers = await prisma.user.count();
  const usersWithWishes = await prisma.user.count({ where: { wishes: { some: {} } } });
  const totalWishes = await prisma.wish.count();
  const purchased = await prisma.wish.count({ where: { purchased: true } });
  const notPurchased = totalWishes - purchased;
  const wishes = await prisma.wish.findMany({
    select: { productName: true, productLink: true, purchased: true },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json({
    totalUsers,
    usersWithWishes,
    totalWishes,
    purchased,
    notPurchased,
    wishes,
  });
}
