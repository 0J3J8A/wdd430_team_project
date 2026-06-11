// src/app/api/auth/logout/route.ts
import { deleteSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function POST(_request: NextRequest) {
  await deleteSession();
  redirect('/');
}