import { axiosInstance as axios } from "../utils";

const findAll = async () => {
  try {
    const res = await axios().get(`/colors`);
    return res;
  } catch (err) {
    throw err;
  }
}


export const Color = {
  findAll
}