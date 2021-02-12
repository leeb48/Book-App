package com.project.bookapp.exceptions.entityexceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class DuplicateBookShelfNameException extends RuntimeException {
    public DuplicateBookShelfNameException(String message) {
        super(message);
    }
}
