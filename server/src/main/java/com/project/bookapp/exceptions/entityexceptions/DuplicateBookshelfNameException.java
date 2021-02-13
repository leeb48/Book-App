package com.project.bookapp.exceptions.entityexceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class DuplicateBookshelfNameException extends RuntimeException {
    public DuplicateBookshelfNameException(String message) {
        super(message);
    }
}
