
import axios from "axios";
import { getAccessToken } from "../services/server-actions/cookie";


// Add the skipAuth Flag to the AxiosRequestConfig interface
declare module 'axios' {
    export interface AxiosRequestConfig {
        skipAuth?: boolean; // Optional, defaults to `false`
    }
}

const regularHeaders = {
    "Accept": "application/json",
    "Content-Type": "application/json",
};

// Gresham Config
const GreshamAxiosConfig = axios.create({
    baseURL: process.env.NEXT_PUBLIC_GRESHAM_BACKEND,
    // timeout: 5000,
    headers: regularHeaders,
});

// Inject auth token by default
GreshamAxiosConfig.interceptors.request.use(
    async (config) => {
        // Extract `skipAuth` and remove it from the config object
        const { skipAuth, ...restConfig } = config;

        // If skipAuth is true, remove Authorization header
        if (skipAuth === true) {
            if (restConfig.headers?.Authorization) {
                delete restConfig.headers.Authorization;
            }
            return restConfig;
        }

        // Otherwise, inject the Bearer token
        const bearerToken = await getAccessToken();
        if (bearerToken) {
            restConfig.headers.Authorization = `Bearer ${bearerToken.value}`;
        }

        return restConfig;
    },
    (error) => {
        return Promise.reject(error);
    }
);




export { GreshamAxiosConfig };