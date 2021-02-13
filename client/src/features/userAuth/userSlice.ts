import { createSlice } from "@reduxjs/toolkit";
import {
  loadUserInfoReducer,
  loginUserSuccessReducer,
  logoutReducer,
  refreshTokenSuccessReducer,
  registerUserSuccessReducer,
} from "./userCaseReducers";

export type UserState = {
  userInfo: UserInfo | null;
  isAuthenticated: boolean;
};

export type UserInfo = {
  username: string;
  firstName: string;
  lastName: string;
};

const initialState: UserState = {
  userInfo: null,
  isAuthenticated: false,
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
