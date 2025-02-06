export interface IUser {
    id: number;
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    is_active: boolean;
    is_staff: boolean;
    is_superuser: boolean;
    date_joined: string;
    last_login: string;
}

export interface IUserWithToken {
    user: IUser;
    auth_token: string;
    expires_at: string;
}
