import axios, { AxiosInstance } from 'axios';
import Cookies from 'universal-cookie';

const baseURL: string = process.env.API_URL || '';

const customAxios = (): AxiosInstance => {
  const options = {
    withCredentials: process.env.NODE_ENV !== 'development',
    headers: {
      Authorization: new Cookies().get('Authorization') || '',
    },
  };
  return axios.create({
    baseURL,
    ...options,
  });
};

export default customAxios;
