package com.project.bookapp.exceptions.entityexceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class BookShelfNotFoundException extends RuntimeException {
    public BookShelfNotFoundException(String message) {
        super(message);
    }
}
