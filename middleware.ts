import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getParsedAuthCookie } from './lib/services/server-actions/cookie';

export async function middleware(request: NextRequest) {
    const parsedCookie = await getParsedAuthCookie();
    const { pathname } = request.nextUrl
    if (parsedCookie && !pathname.startsWith("/activity")) {
        return NextResponse.redirect(new URL('/activity', request.url))
    }

    if(!parsedCookie && !pathname.startsWith("/login")) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
}

export const config = {
    matcher: ["/login", "/activity"],
}