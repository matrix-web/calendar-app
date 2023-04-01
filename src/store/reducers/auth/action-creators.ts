import { IUser } from "../../../models/IUser";
import { AuthActionEnum, setAuthAction, setErrorAction, setIsLoadingAction, setUserAction } from "./types";
import { AppDispatch } from "../..";
import { UserService } from "../../../api/services/UserService";

export const AuthActionCreators = {
  setUser: (user: IUser): setUserAction => ({
    type: AuthActionEnum.SET_USER,
    payload: user
  }),
  setIsAuth: (isAuth: boolean): setAuthAction => ({
    type: AuthActionEnum.SET_AUTH,
    payload: isAuth
  }),
  setError: (error: string): setErrorAction => ({
    type: AuthActionEnum.SET_ERROR,
    payload: error
  }),
  setIsLoading: (isLoading: boolean): setIsLoadingAction => ({
    type: AuthActionEnum.SET_LOADING,
    payload: isLoading
  }),
  login: (username: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(AuthActionCreators.setIsLoading(true));
      setTimeout(async () => {
        const { users } = await UserService.getUsers();
      
        const mockUser = users.find(user => user.username === username && user.password === password);
        if (mockUser) {
          localStorage.setItem("auth", "true");
          localStorage.setItem("username", mockUser.username);
          dispatch(AuthActionCreators.setUser(mockUser));
          dispatch(AuthActionCreators.setIsAuth(true));
        } else {
          dispatch(AuthActionCreators.setError("Invalid username or password"));
        }

        dispatch(AuthActionCreators.setIsLoading(false));
      }, 1000);
    } catch (err) {
      dispatch(AuthActionCreators.setError("An error occurred during authorization"))
    }
  },
  logout: () => async (dispatch: AppDispatch) => {
    localStorage.removeItem("auth");
    localStorage.removeItem("username");
    dispatch(AuthActionCreators.setUser({} as IUser));
    dispatch(AuthActionCreators.setIsAuth(false));
  } 
}