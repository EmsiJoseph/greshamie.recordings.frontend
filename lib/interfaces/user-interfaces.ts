export interface IUser {
    user_name: string;
}

export interface IUserWithToken {
    user: IUser;
    access_token: string;
    expires_in: number;
    is_authenticated: boolean;
}
