"use server";
import { IAuthCookie, ILoginApiResponse } from "@/lib/interfaces/authentication-interfaces";
import { IUserWithToken } from "@/lib/interfaces/user-interfaces";
// TODO: Secure cookie, don't expose user data and tokens on cookie [security risk]
import {cookies} from "next/headers";
// import {IAuthCookie, ILoginApiResponse, ILoginOutput, IUser} from "@/lib/interfaces";

const auth = "auth";

/**
 * Retrieves the authentication cookie from the user's browser.
 *
 * @return {Promise<IAuthCookie | null>} - A Promise that resolves with the value of the authentication cookie,
 * or null if the cookie is not found.
 */
export const getParsedAuthCookie = async (): Promise<IAuthCookie | null> => {
    const cookieHeader = (await cookies()).get(auth);  // await cookies()
    return cookieHeader ? JSON.parse(cookieHeader.value) : null;
}

/**
 * Sets the authentication cookie with the provided login data.
 *
 * @param {ILoginApiResponse} response - The login data from the API response.
 * @return {Promise<boolean>} - A Promise that resolves when the cookie is successfully set.
 */
export const setAuthCookie = async (response: ILoginApiResponse): Promise<boolean> => {
    const authCookie = JSON.stringify(response);
    const isAuthCookieSet = (await cookies()).set(auth, authCookie, { 
        httpOnly: true,
        secure: false,
        maxAge: 60 * 60 * 24,
    });
    return !!isAuthCookieSet;
}

/**
 * Function to get the user object from the auth cookie.
 *
 * @return {Promise<IUser | null>} The user object from the auth cookie, or null if the cookie is not present.
 */
export const getUserFromAuthCookie = async (): Promise<IUserWithToken | null> => {
    const cookie = (await cookies()).get(auth);  // await cookies()
    if (!cookie) {
        return null;
    }
    const cookieValue = JSON.parse(cookie.value) as IUserWithToken;
    return cookieValue;
}

/**
 * Function to delete the auth cookie.
 *
 * @return {Promise<boolean>} Promise that resolves when the cookie is deleted.
 */
export const deleteAuthCookie = async (): Promise<boolean> => {
    const isDeleted = (await cookies()).delete(auth);  // await cookies()
    return !!isDeleted;
};

/**
 * Function to get the Gresham Token from the auth cookie.
 *
 * @return {Promise<string | null>} The pahiram token from the auth cookie, or null if the cookie is not present.
 */
export const getAuthToken = async (): Promise<string | null> => {
    const cookie = (await cookies()).get(auth);  // await cookies()
    return cookie ? JSON.parse(cookie.value).auth_token : null;
}