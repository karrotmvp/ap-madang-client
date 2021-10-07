import axios, { AxiosInstance } from 'axios';
import { DEV_API_URL, PROD_API_URL } from '../config/env.dev';

const baseURL =
  process.env.NODE_ENV === 'development' ? DEV_API_URL : PROD_API_URL;

const options = {
  withCredentials: true,
};

const customAxios: AxiosInstance = axios.create({
  baseURL: baseURL,
  ...options,
});

export default customAxios;
