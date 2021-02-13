package com.project.bookapp.security;

import java.util.concurrent.TimeUnit;

public class SecurityConstants {
    public static final String SIGN_UP_URLS = "/api/auth/**";
    public static final String OAUTH2_URLS = "/api/oauth2/**";
    public static final String SECRET = "SecretKeyToGenerateJWTs";
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final long JWT_EXPIRATION_TIME = 30_000_000;
    public static final int TOKEN_COOKIE_EXPIRE_TIME = 10;
    public static final long REFRESH_TOKEN_EXPIRATION_TIME = TimeUnit.DAYS.toMillis(3);

    public static final String OAUTH2_SUCCESS_REDIRECT_URL = System.getenv("OAUTH2_SUCCESS_REDIRECT_URL");
    public static final String OAUTH2_FAILURE_REDIRECT_URL = System.getenv("OAUTH2_FAILURE_REDIRECT_URL");
}
