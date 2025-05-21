import axios from "axios";
import cookieService from "./cookie.service";

const BASE_URL = "";
const TIMEOUT = 60000;

const request = axios.create({});
let failedQueue: any[] = [];

request.interceptors.request.use(async (config) => {
  const token = cookieService.getFromCookie("accessToken");
  if (!token) {
    return Promise.reject(new Error("Invalid token"));
  }
  config.headers.Authorization = `Bearer ${token}`;
  config.baseURL = BASE_URL;
  config.timeout = TIMEOUT;
  return config;
});

request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error.response);
  }
);

export default request;
