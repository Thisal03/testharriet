import axios from "axios";
import { getToken } from "./get-token";

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REST_API_ENDPOINT || 'http://localhost:3000/api',
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use(
  (config) => {
    const token = getToken();
    config.headers = Object.assign({}, config.headers, {
      Authorization: `Bearer ${token ? token : ""}`,
    });
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;
