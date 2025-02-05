import { IBaseApiResponse } from "./base-api-response-interface";
import { IUser, IUserWithToken } from "./userInterfaces";

export interface IAuthCookie extends IUserWithToken {
    // No additional fields, just inherits from IUserWithToken
}

export interface ILoginApiResponse extends IBaseApiResponse<IUserWithToken> {
    // No additional fields, just inherits from IBaseApiResponse<IUserWithToken>
}