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
      return {
        ...state,
        status: {
          ...state.status,
          loading: false,
          error: {
            ...state.status.error,
            message: ''
          }
        }
      };
    case Auth.REGISTER.SUCCESS:
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
          ...action.payload.user
        }
      };
    case Auth.REGISTER.FAIL:
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
        token: action.payload.data.token
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
    
    case Auth.CONFIRM_EMAIL.START:
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
    case Auth.CONFIRM_EMAIL.SUCCESS:
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
          ...action.payload.user
        }
      };
    case Auth.CONFIRM_EMAIL.FAIL:
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