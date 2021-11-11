import axios from "axios";

export const axiosInstance = () => axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? `${process.env.REACT_APP_DEV_BACKEND_URL}/api` : `${process.env.REACT_APP_PRODUCTION_DATABASE_URL}/api`
});