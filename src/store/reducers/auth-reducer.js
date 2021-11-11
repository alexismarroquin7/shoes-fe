import { Auth } from "../actions";

const initialState = {
  status: {
    loading: false,
    error: {
      message: ''
    }
  },
  user: {},
  token: ''
}

export const authReducer = (state=initialState, action) => {
  switch(action.type){
    case Auth.REGISTER.START:
      return state;
    case Auth.REGISTER.SUCCESS:
      return state;
    case Auth.REGISTER.FAIL:
      return state;
    case Auth.LOGIN.START:  
    return {
        ...state,
        status: {
          ...state.status,
          loading: true,
          error: {
            ...state.status.error,
            message: ''
          }
        }
      };
    case Auth.LOGIN.SUCCESS:
      return {
        ...state,
        status: {
          ...state.status,
          loading: false,
          error: {
          ...state.status.error,
            message: ''
          }
        },
        user: {
          ...state.user,
          ...action.payload.data.user
        },
      };
    case Auth.LOGIN.FAIL:
      return {
        ...state,
        status: {
          ...state.status,
          loading: false,
          error: {
            ...state.status.error,
            message: action.payload.error.data.message
          }
        }
      };
    case Auth.LOGOUT.START:
      return state;
    case Auth.LOGOUT.SUCCESS:
      return state;
    case Auth.LOGOUT.FAIL:
      return state;
    default:
      return state;
  }
}