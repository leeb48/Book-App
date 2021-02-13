import { EnhancedStore } from "@reduxjs/toolkit";
import axios from "axios";
import { RefreshTokenDto, RefreshTokenResponseDto } from "features/userAuth";
import { refreshTokenSuccess } from "features/userAuth/userSlice";

export const springAxios = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:8080/api"
      : "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

springAxios.interceptors.request.use(
  (config) => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      config.headers.Authorization = `Bearer ${jwt}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export const refreshAxios = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:8080/api"
      : "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

refreshAxios.interceptors.request.use(
  (config) => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      config.headers.Authorization = `Bearer ${jwt}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// called with store so that the interceptor can dispatch some action to redux
export const refreshTokenInterceptor = (store: EnhancedStore) => {
  // Refresh Token Axios Interceptor
  springAxios.interceptors.response.use(
    (res) => {
      return res;
    },
    async (error) => {
      const originalRequest = error.config;

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const data: RefreshTokenDto = {
          refreshToken: localStorage.getItem("refreshToken"),
        };

        try {
          const res = await refreshAxios.post<RefreshTokenResponseDto>(
            "/auth/refresh",
            data
          );

          localStorage.setItem("jwt", res.data.jwt);
          localStorage.setItem("refreshToken", res.data.refreshToken);
          store.dispatch(refreshTokenSuccess());
        } catch (error) {
          localStorage.removeItem("jwt");
          localStorage.removeItem("refreshToken");
          console.log(error.response);
        }

        return springAxios(originalRequest);
      }
      return Promise.reject(error);
    }
  );
};
