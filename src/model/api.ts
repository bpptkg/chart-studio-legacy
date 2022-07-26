import axios, { AxiosInstance } from 'axios';

export const api: AxiosInstance = axios.create({
  baseURL: `${process.env.VUE_APP_BMA_URL}/api/v1/`,
  headers: {
    Authorization: `Api-Key ${process.env.VUE_APP_BMA_API_KEY}`,
  },
});
