import axios from 'axios';
import cookieService from './cookie.service';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const TIMEOUT = 120000;

const request = axios.create({});

request.interceptors.request.use(async (config) => {
  const token = (await cookieService.getItem('accessToken'))?.token;

  if (!token) {
    console.error('No access token found');
    return Promise.reject(new Error('Invalid token'));
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
