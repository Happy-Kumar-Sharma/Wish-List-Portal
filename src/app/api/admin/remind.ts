import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyJwt } from '@/lib/auth';
import { sendMail } from '@/lib/email';

export async function POST(req: NextRequest) {
  const token = req.headers.get('authorization')?.replace('Bearer ', '');
  const user = token && verifyJwt(token);
  if (!user || user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  const users = await prisma.user.findMany({
    where: { wishes: { none: {} } },
  });
  for (const u of users) {
    await sendMail({
      to: u.email,
      subject: 'Wish List Reminder',
      html: `<p>Hello ${u.fullName},<br/>Please submit your wish list on the portal.</p>`
    });
  }
  return NextResponse.json({ message: 'Reminders sent', count: users.length });
}
