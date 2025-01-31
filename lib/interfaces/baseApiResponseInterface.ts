export interface IBaseApiResponse<T = any> {
    message?: string | [];
    errors?: string | [];
    data?: T;
    method: string;
} 