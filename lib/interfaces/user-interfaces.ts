export interface IUser {
    user_name?: string;
}

export interface IAccessToken {
    value?: string,
    expiresIn?: string, // UTC String
}

export interface IRefreshToken {
    value?: string,
    expiresIn?: string, // UTC String
}

export interface IUserWithToken {
    user?: IUser;
    accessToken?: IAccessToken;
    refreshToken?: IRefreshToken,
}

export interface ILoginOutput {
    message: string;
}