import { axiosInstance as axios } from "../utils";

const findAll = async () => {
  try {
    const res = await axios().get(`/shoe_styles`);
    return res;
  } catch (err) {
    throw err;
  }
}


export const Style = {
  findAll
}