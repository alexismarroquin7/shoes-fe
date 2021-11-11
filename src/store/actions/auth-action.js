import { axiosInstance as axios } from "../../utils";

const ACTION = {
  REGISTER: {
    START: "AUTH--REGISTER--START",
    SUCCESS: "AUTH--REGISTER--SUCCESS",
    FAIL: "AUTH--REGISTER--FAIL"
  },
  LOGIN: {
    START: "AUTH--LOGIN--START",
    SUCCESS: "AUTH--LOGIN--SUCCESS",
    FAIL: "AUTH--LOGIN--FAIL"
  },
  LOGOUT: {
    START: "AUTH--LOGOUT--START",
    SUCCESS: "AUTH--LOGOUT--SUCCESS",
    FAIL: "AUTH--LOGOUT--FAIL"
  }
}

const register = (credentials) => async dispatch => {
  
};

const login = ({email,password}) => async dispatch => {
  dispatch({
    type: ACTION.LOGIN.START
  });
  
  try {
    const res = await axios().post(`/auth/login`, {email,password});
    dispatch({
      type: ACTION.LOGIN.SUCCESS,
      payload: {
        data: res.data
      }
    });
  } catch(err) {
    dispatch({
      type: ACTION.LOGIN.FAIL,
      payload: {
        error: err.response
      }
    });
  }
};

const logout = () => async dispatch => {

};

export const Auth = {
  ...ACTION,
  register,
  login,
  logout
}