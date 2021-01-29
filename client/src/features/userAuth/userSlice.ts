import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  loadUserInfoApi,
  LoadUserInfoResponseDto,
  loginUserApi,
  LoginUserDto,
  LoginUserResponseDto,
  RegisterUserDto,
  RegisterUserResponseDto,
} from "api/authApi";
import { AppThunk } from "app/store";
import { registerUserApi } from "api/authApi";
import {
  clearInputErrors,
  InputErrors,
  setInputErrors,
} from "features/alerts/alertsSlice";

type UserState = {
  userInfo: UserInfo | null;
  isAuthenticated: boolean;
};

type UserInfo = {
  username: string;
  firstName: string;
  lastName: string;
};

const initialState: UserState = {
  userInfo: null,
  isAuthenticated: false,
};

// Case Reducers
const registerUserSuccessReducer: CaseReducer<
  UserState,
  PayloadAction<RegisterUserResponseDto>
> = (state, { payload }) => {
  state.isAuthenticated = payload.success;
  localStorage.setItem("jwt", payload.jwt);
  localStorage.setItem("refreshToken", payload.refreshToken);
};

const loginUserSuccessReducer: CaseReducer<
  UserState,
  PayloadAction<LoginUserResponseDto>
> = (state, { payload }) => {
  state.isAuthenticated = payload.success;
  localStorage.setItem("jwt", payload.jwt);
  localStorage.setItem("refreshToken", payload.refreshToken);
};

const refreshTokenSuccessReducer: CaseReducer<UserState> = (state) => {
  state.isAuthenticated = true;
};

const loadUserInfoReducer: CaseReducer<
  UserState,
  PayloadAction<LoadUserInfoResponseDto>
> = (state, { payload }) => {
  state = {
    ...state,
    userInfo: payload,
    isAuthenticated: true,
  };

  return state;
};

const logoutReducer: CaseReducer<UserState> = (state) => {
  state.isAuthenticated = false;
  state.userInfo = null;
  localStorage.removeItem("jwt");
  localStorage.removeItem("refreshToken");
};
const userInfo = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerUserSuccess: registerUserSuccessReducer,
    loginUserSucess: loginUserSuccessReducer,
    refreshTokenSuccess: refreshTokenSuccessReducer,
    loadUserInfoSuccess: loadUserInfoReducer,
    logoutSuccess: logoutReducer,
  },
});

export const {
  registerUserSuccess,
  loginUserSucess,
  refreshTokenSuccess,
  loadUserInfoSuccess,
  logoutSuccess,
} = userInfo.actions;

export default userInfo.reducer;

// Thunks
export const registerUser = (data: RegisterUserDto): AppThunk => async (
  dispatch
) => {
  try {
    const res = await registerUserApi(data);
    dispatch(registerUserSuccess(res));
    dispatch(loadUser());
    dispatch(clearInputErrors());
  } catch (error) {
    if (error.response) {
      dispatch(setInputErrors(error.response.data as InputErrors));
    }
  }
};

export const loginUser = (data: LoginUserDto): AppThunk => async (dispatch) => {
  try {
    const res = await loginUserApi(data);
    dispatch(loginUserSucess(res));
    dispatch(loadUser());
    dispatch(clearInputErrors());
  } catch (error) {
    if (error.response) {
      if (error.response) {
        dispatch(setInputErrors(error.response.data as InputErrors));
      }
    }
  }
};

export const loadUser = (): AppThunk => async (dispatch) => {
  try {
    const res = await loadUserInfoApi();

    dispatch(loadUserInfoSuccess(res));
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
    }
  }
};
