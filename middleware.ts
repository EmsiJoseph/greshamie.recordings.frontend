import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getParsedAuthCookie } from './lib/services/server-actions/cookie';

export async function middleware(request: NextRequest) {
    const parsedCookie = await getParsedAuthCookie();
    console.log("parsed cookie" , parsedCookie)
    if (parsedCookie) {
        return NextResponse.redirect(new URL('/activity', request.url))
    }
}

export const config = {
    matcher: ["/activity", "/login"],
}