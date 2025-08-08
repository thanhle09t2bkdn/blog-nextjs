import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getCurrentUserServer } from '@/lib/servers/user.actions';
import { Role } from '@/types/index';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  console.log(path);
  const user = await getCurrentUserServer();
  if (path.includes('/manage') && user?.role?.name !== Role.Admin) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
