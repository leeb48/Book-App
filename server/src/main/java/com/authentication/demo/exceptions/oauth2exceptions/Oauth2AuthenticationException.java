package com.authentication.demo.exceptions.oauth2exceptions;

public class Oauth2AuthenticationException extends RuntimeException {
    public Oauth2AuthenticationException(String message) {
        super(message);
    }
}
