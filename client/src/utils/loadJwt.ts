import Cookies from "js-cookie";

export const loadJwt = () => {
  let jwt = null;

  // jwt was stored from previous authentication method
  if (localStorage.getItem("jwt")) {
    jwt = localStorage.getItem("jwt");

    // jwt was sent from backend through oauth2 process via cookie
  } else if (Cookies.get("jwt")) {
    jwt = Cookies.get("jwt");
    const refreshToken = Cookies.get("refreshToken");

    if (jwt && refreshToken) {
      localStorage.setItem("jwt", jwt);
      localStorage.setItem("refreshToken", refreshToken);
    }
  }

  return jwt;
};
