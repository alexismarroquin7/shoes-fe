import { axiosInstance as axios } from "../utils";

const create = async (shoe) => {
  try {
    const res = await axios().post(`/shoes`, shoe);
    return res;
  } catch (err) {
    throw err;
  }
}


export const Shoe = {
  create
}