import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { deleteAuthCookie, getParsedAuthCookie } from './lib/services/server-actions/cookie';
import { IUserWithToken } from './lib/interfaces/user-interfaces';
import { hasValidAccessToken, hasValidRefreshToken, reauthenticate } from './lib/services/server-actions/authentication';


export async function middleware(request: NextRequest) {
    const isAccessTokenValid = await hasValidAccessToken()
    const isRefreshTokenValid = await hasValidRefreshToken()
    const parsedCookie = await getParsedAuthCookie()
    console.log("PARSED COOKIE: ", parsedCookie)
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
        !pathname.startsWith("/login") && pathname !== "/";
    if (!isAccessTokenValid && !isRefreshTokenValid && shouldRedirectToLogin) {
        // Delete Cookies if available
        console.log("02 Force Relogin: ", isAccessTokenValid, isRefreshTokenValid, shouldRedirectToLogin)
        await deleteAuthCookie()
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // 03 Auto Reauthenticate
    if (isRefreshTokenValid) {
        const isSuccessReauth = await reauthenticate()
        if (isSuccessReauth) {
            console.log("went inside REAUTH BLOCK, isSuccessReauth: ", isSuccessReauth)
            return NextResponse.next()
        }
    }
}

export const config = {
    matcher: ['/((?!api|_next|static|public|favicon.ico).*)']
}