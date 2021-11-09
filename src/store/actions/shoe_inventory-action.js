import { axiosInstance as axios } from "../../utils";

const ACTION = {
  FETCH_ALL: {
    START: "SHOE-INVENTORY--FETCH-ALL--START",
    SUCCESS: "SHOE-INVENTORY--FETCH-ALL--SUCCESS",
    FAIL: "SHOE-INVENTORY--FETCH-ALL--FAIL"
  },
  FETCH_BY_SHOE_ID: {
    START: "SHOE-INVENTORY--FETCH-BY-SHOE-ID--START",
    SUCCESS: "SHOE-INVENTORY--FETCH-BY-SHOE-ID--SUCCESS",
    FAIL: "SHOE-INVENTORY--FETCH-BY-SHOE-ID--FAIL"
  }
};

const findAll = () => async dispatch => {
  dispatch({
    type: ACTION.FETCH_ALL.START
  });

  try {
    const res = await axios().get(`/shoe_inventory`);
    dispatch({
      type: ACTION.FETCH_ALL.SUCCESS,
      payload: {
        shoe_inventory: res.data
      }
    });
    
  } catch (err) {
    dispatch({
      type: ACTION.FETCH_ALL.FAIL,
      payload: {
        error: err.response
      }
    });
  }

};

const findByShoeId = shoe_id => async dispatch => {
  dispatch({
    type: ACTION.FETCH_BY_SHOE_ID.START
  });

  try {
    const shoeId = `shoe_id=${shoe_id}`;
    const res = await axios().get(`/shoe_inventory?${shoeId}`);
    dispatch({
      type: ACTION.FETCH_BY_SHOE_ID.SUCCESS,
      payload: {
        shoe_inventory: res.data
      }
    });
    
  } catch (err) {
    dispatch({
      type: ACTION.FETCH_BY_SHOE_ID.FAIL,
      payload: {
        error: err.response
      }
    });
  }

};

export const ShoeInventory = {
  ...ACTION,
  findAll,
  findByShoeId
}