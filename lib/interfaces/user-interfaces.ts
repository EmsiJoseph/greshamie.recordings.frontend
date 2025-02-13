export interface IUser {
    userName?: string;
}

export interface IAccessToken {
    value?: string,
    expiresAt?: string, // UTC String
}

export interface IRefreshToken {
    value?: string,
    expiresAt?: string, // UTC String
}

export interface IUserWithToken {
    user?: IUser;
    accessToken?: IAccessToken;
    refreshToken?: IRefreshToken,
}

export interface ILoginOutput {
    message: string;
}