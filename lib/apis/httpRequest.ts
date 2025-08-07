import axios from 'axios';
import { getAuthorization } from './cache';

export const httpRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL!,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

httpRequest.interceptors.request.use(
  async function (config) {
    const token = await getAuthorization();
    config.headers['Authorization'] = 'Bearer ' + token;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

httpRequest.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);
