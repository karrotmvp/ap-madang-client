import axios, { AxiosInstance } from 'axios';
import { API_URL_DEV, API_URL_PROD } from '../config/env';

const baseURL =
  process.env.NODE_ENV === 'development' ? API_URL_DEV : API_URL_PROD;

const options = {
  withCredentials: true,
};

const customAxios: AxiosInstance = axios.create({
  baseURL: baseURL,
  ...options,
});

export default customAxios;
