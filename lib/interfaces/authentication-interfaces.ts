import { IBaseApiResponse } from "./base-api-response-interface";
import { IUserWithToken } from "./user-interfaces";

export interface IAuthCookie extends IUserWithToken {
    user_name: string;
    access_token: string;
    expires_in: number;
}

export interface ILoginApiResponse extends IBaseApiResponse<IUserWithToken> {
    user_name: string;
    access_token: string;
    expires_in: number;
}

export interface ILoginOutput{
    message: string;
}