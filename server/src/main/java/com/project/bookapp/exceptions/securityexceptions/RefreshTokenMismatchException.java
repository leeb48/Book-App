package com.project.bookapp.exceptions.securityexceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class RefreshTokenMismatchException extends RuntimeException {
    public RefreshTokenMismatchException(String message) {
        super(message);
    }
}
