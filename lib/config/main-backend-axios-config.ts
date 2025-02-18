import axios from "axios";
import { getAccessToken } from "../services/server-actions/cookie";

const regularHeaders = {
  Accept: "application/json",
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
    const bearerToken = await getAccessToken();
    if (bearerToken) {
      config.headers.Authorization = `Bearer ${bearerToken.value}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


const GreshamAxiosConfigAuth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_GRESHAM_AUTH,
  // timeout: 5000,
  headers: regularHeaders,
});

// Inject auth token by default
GreshamAxiosConfigAuth.interceptors.request.use(
  async (config) => {
    const bearerToken = await getAccessToken();
    if (bearerToken) {
      config.headers.Authorization = `Bearer ${bearerToken.value}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { GreshamAxiosConfig, GreshamAxiosConfigAuth };
