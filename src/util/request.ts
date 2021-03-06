import axios, { AxiosInstance } from 'axios';

const baseURL: string = process.env.API_URL || '';

const createAxios = (baseURL: string): AxiosInstance => {
  const jwtToken =
    window.sessionStorage.getItem('Authorization') ||
    window.localStorage.getItem('Authorization');

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

const landongmoAPI = () => createAxios(baseURL);

export default landongmoAPI;
