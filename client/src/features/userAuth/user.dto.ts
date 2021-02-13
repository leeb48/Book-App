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

export interface LoginUserDto {
  username: string;
  password: string;
}

export interface LoginUserResponseDto {
  success: boolean;
  jwt: string;
  refreshToken: string;
}

// Refresh Token
export interface RefreshTokenDto {
  refreshToken: string | null;
}

export interface RefreshTokenResponseDto {
  success: boolean;
  jwt: string;
  refreshToken: string;
}

// Load User
export interface LoadUserInfoResponseDto {
  username: string;
  firstName: string;
  lastName: string;
}
