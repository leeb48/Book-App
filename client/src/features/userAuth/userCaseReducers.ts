import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import {
  LoadUserInfoResponseDto,
  LoginUserResponseDto,
  RegisterUserResponseDto,
} from ".";
import { UserState } from "./userSlice";

// Case Reducers
export const registerUserSuccessReducer: CaseReducer<
  UserState,
  PayloadAction<RegisterUserResponseDto>
> = (state, { payload }) => {
  state.isAuthenticated = payload.success;
  localStorage.setItem("jwt", payload.jwt);
  localStorage.setItem("refreshToken", payload.refreshToken);
};

export const loginUserSuccessReducer: CaseReducer<
  UserState,
  PayloadAction<LoginUserResponseDto>
> = (state, { payload }) => {
  state.isAuthenticated = payload.success;
  localStorage.setItem("jwt", payload.jwt);
  localStorage.setItem("refreshToken", payload.refreshToken);
};

export const refreshTokenSuccessReducer: CaseReducer<UserState> = (state) => {
  state.isAuthenticated = true;
};

export const loadUserInfoReducer: CaseReducer<
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

export const logoutReducer: CaseReducer<UserState> = (state) => {
  state.isAuthenticated = false;
  state.userInfo = null;
  localStorage.removeItem("jwt");
  localStorage.removeItem("refreshToken");
};
