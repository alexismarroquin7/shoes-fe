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
  },
  CONFIRM_EMAIL: {
    START: "AUTH--CONFIRM-EMAIL--START",
    SUCCESS: "AUTH--CONFIRM-EMAIL--SUCCESS",
    FAIL: "AUTH--CONFIRM-EMAIL--FAIL"
  }
}

const register = (credentials) => async dispatch => {
  dispatch({
    type: ACTION.REGISTER.START
  });
  
  try {
    const res = await axios().post(`/auth/register`, credentials);
    dispatch({
      type: ACTION.REGISTER.SUCCESS,
      payload: {
        user: res.data
      }
    });
  } catch(err) {
    dispatch({
      type: ACTION.REGISTER.FAIL,
      payload: {
        error: err.response
      }
    });
  }
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

const confirmEmail = (token) => async dispatch => {
  dispatch({ type: ACTION.CONFIRM_EMAIL.START });
  try {
    const res = await axios().put(`/auth/confirm-email/${token}`);
    dispatch({ type: ACTION.CONFIRM_EMAIL.SUCCESS, payload: { user: res.data } });
  } catch (err) {
    dispatch({ type: ACTION.CONFIRM_EMAIL.FAIL, payload: { error: err.response } });
  }
};

export const Auth = {
  ...ACTION,
  register,
  login,
  logout,
  confirmEmail
}