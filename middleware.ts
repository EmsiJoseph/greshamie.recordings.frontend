import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { deleteAuthCookie } from './lib/services/server-actions/cookie';
import { hasValidAccessToken, hasValidRefreshToken, reauthenticate } from './lib/services/server-actions/authentication';


export async function middleware(request: NextRequest) {
    const isAccessTokenValid = await hasValidAccessToken()
    const isRefreshTokenValid = await hasValidRefreshToken()
    const { pathname } = request.nextUrl

    // 01 Login success redirect
    const isLoginSuccess =
        isAccessTokenValid &&
        pathname.startsWith("/login") &&
        !pathname.startsWith("/activity")
    if (isLoginSuccess) {
        return NextResponse.redirect(new URL('/activity', request.url))
    }

    // 02 Force Relogin
    const shouldRedirectToLogin =
        !pathname.startsWith("/login") &&
        pathname !== "/";
    if (!isAccessTokenValid && !isRefreshTokenValid && shouldRedirectToLogin) {
        // Delete Cookies if available
        await deleteAuthCookie()
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // 03 Auto Reauthenticate
    if (!isAccessTokenValid && isRefreshTokenValid) {
        const isSuccessReauth = await reauthenticate()
        if (isSuccessReauth) {
            return NextResponse.next()
        }
    }

    // console.log("Bool values ", isAccessTokenValid, isRefreshTokenValid, shouldRedirectToLogin)
}

export const config = {
    matcher: ['/((?!api|_next|static|public|favicon.ico).*)']
    
}