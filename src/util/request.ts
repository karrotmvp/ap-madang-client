import axios, { AxiosInstance } from 'axios';
import Cookies from 'universal-cookie';

const baseURL = process.env.API_URL;

const cookies = new Cookies();

const options = {
  withCredentials: true,
  headers: {
    Authorization: cookies.get('Authorization') || '',
  },
};

const customAxios: AxiosInstance = axios.create({
  baseURL,
  ...options,
});

export default customAxios;
