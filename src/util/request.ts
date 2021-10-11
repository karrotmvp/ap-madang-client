import axios, { AxiosInstance } from 'axios';

const baseURL = process.env.API_URL;

const options = {
  withCredentials: true,
};

const customAxios: AxiosInstance = axios.create({
  baseURL,
  ...options,
});

export default customAxios;
