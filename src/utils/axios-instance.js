import axios from "axios";

export const axiosInstance = () => axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? `http://localhost:4000/api` : `${process.env.REACT_APP_PRODUCTION_DATABASE_URL}/api`
});