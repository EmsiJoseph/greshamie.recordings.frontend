import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getUserFromAuthCookie, deleteAuthCookie } from './lib/services/server-actions/cookie';

export async function middleware(request: NextRequest) {
    const user = await getUserFromAuthCookie();

    if (!user) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // Still has cookie at this point
    if (request.nextUrl.pathname.startsWith('/login')) {
        return NextResponse.redirect(new URL('/activity', request.url))
    }


    return NextResponse.next()
}

export const config = {
    matcher: ["/((?!public|api).*)"], // Protects everything EXCEPT "/public" and "/api"
}