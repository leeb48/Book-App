import { AppThunk } from "app/store";
import { springAxios } from "config/springAxios";
import {
  clearInputErrors,
  InputErrors,
  setInputErrors,
} from "features/alerts/alertsSlice";
import {
  LoadUserInfoResponseDto,
  LoginUserDto,
  LoginUserResponseDto,
  RegisterUserDto,
  RegisterUserResponseDto,
} from ".";
import {
  loadUserInfoSuccess,
  loginUserSucess,
  registerUserSuccess,
} from "./userSlice";

// Thunks
export const registerUser = (data: RegisterUserDto): AppThunk => async (
  dispatch
) => {
  try {
    const res = await springAxios.post<RegisterUserResponseDto>(
      "/auth/register",
      data
    );

    dispatch(registerUserSuccess(res.data));
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
    const res = await springAxios.post<LoginUserResponseDto>(
      "/auth/login",
      data
    );
    dispatch(loginUserSucess(res.data));
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
    const res = await springAxios.get<LoadUserInfoResponseDto>(
      "/users/get-user-info"
    );

    dispatch(loadUserInfoSuccess(res.data));
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
    }
  }
};
