import axios, { AxiosInstance } from 'axios';

const baseURL: string = process.env.API_URL || '';

const customAxios = (): AxiosInstance => {
  const jwtToken = window.localStorage.getItem('Authorization');
  const options = {
    withCredentials: process.env.NODE_ENV !== 'development',
    headers: {
      Authorization: jwtToken || '',
    },
  };

  return axios.create({
    baseURL,
    ...options,
  });
};

export default customAxios;
