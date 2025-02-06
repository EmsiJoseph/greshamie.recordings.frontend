import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getUserFromAuthCookie } from './lib/services/server-actions/cookie';

export async function middleware(request: NextRequest) {
    const user = await getUserFromAuthCookie();
    if (!user) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/admin/:path*',]
}