import { axiosInstance as axios } from "../utils";

const findAll = async () => {
  try {
    const res = await axios().get(`/brands`);
    return res;
  } catch (err) {
    throw err;
  }
}


export const Brand = {
  findAll
}