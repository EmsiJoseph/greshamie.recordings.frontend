export interface IBaseApiResponse<T = any> {
    message?: string | [];
    errors?: string | string[] | Record<string, any>;
    data?: T;
    method?: string;
}

export interface IParsedApiResponse<T = any> extends IBaseApiResponse<T> {
    successMessage?: string;
}