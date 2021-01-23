export const githubLoginUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080/api/oauth2/authorize/github"
    : "/api/oauth2/authorize/github";
export const googleLoginUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080/api/oauth2/authorize/google"
    : "/api/oauth2/authorize/google";
