import { IUser } from "../../../models/IUser";
import { AuthState, AuthActions, AuthActionEnum } from "./types";

const initialState: AuthState = {
  isAuth: false,
  user: {} as IUser,
  isLoading: false,
  error: ""
}

const authReducer = (state = initialState, action: AuthActions): AuthState => {
  switch(action.type) {
    case AuthActionEnum.SET_AUTH: 
      return {...state, isAuth: action.payload, isLoading: false}
    case AuthActionEnum.SET_USER:
      return { ...state, user: action.payload }
    case AuthActionEnum.SET_LOADING:
      return { ...state, isLoading: action.payload }
    case AuthActionEnum.SET_ERROR:
      return { ...state, error: action.payload, isLoading: false }
    default:
      return state
  }
}

export default authReducer;