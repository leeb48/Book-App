import { refreshAxios, springAxios } from "../config/springAxios";

// Auth ---------------------------------------------------------------------

// Register User
export interface RegisterUserDto {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  password2: string;
}

export interface RegisterUserResponseDto {
  success: boolean;
  jwt: string;
  refreshToken: string;
}

export const registerUserApi = async (data: RegisterUserDto) => {
  try {
    const res = await springAxios.post<RegisterUserResponseDto>(
      "/auth/register",
      data
    );

    return res.data;
  } catch (error) {
    throw error;
  }
};

// Login User
export interface LoginUserDto {
  username: string;
  password: string;
}

export interface LoginUserResponseDto {
  success: boolean;
  jwt: string;
  refreshToken: string;
}

export const loginUserApi = async (data: LoginUserDto) => {
  try {
    const res = await springAxios.post<LoginUserResponseDto>(
      "/auth/login",
      data
    );

    return res.data;
  } catch (error) {
    throw error;
  }
};

// Refresh Token
export interface RefreshTokenDto {
  refreshToken: string | null;
}

export interface RefreshTokenResponseDto {
  success: boolean;
  jwt: string;
  refreshToken: string;
}

export const refreshTokenApi = async (data: RefreshTokenDto) => {
  try {
    const res = await refreshAxios.post<RefreshTokenResponseDto>(
      "/auth/refresh",
      data
    );

    return res.data;
  } catch (error) {
    throw error;
  }
};

// Load User
export interface LoadUserInfoResponseDto {
  username: string;
  firstName: string;
  lastName: string;
}

export const loadUserInfoApi = async () => {
  try {
    const res = await springAxios.get<LoadUserInfoResponseDto>(
      "/users/get-user-info"
    );

    return res.data;
  } catch (error) {
    throw error;
  }
};
