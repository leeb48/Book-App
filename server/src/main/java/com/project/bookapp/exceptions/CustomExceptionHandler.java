package com.project.bookapp.exceptions;

import com.project.bookapp.exceptions.controllerExceptions.EmptySearchTermException;
import com.project.bookapp.exceptions.entityexceptions.*;
import com.project.bookapp.exceptions.oauth2exceptions.Oauth2AuthenticationException;
import com.project.bookapp.exceptions.response.ExceptionMessageResponse;
import com.project.bookapp.exceptions.securityexceptions.AuthenticationException;
import com.project.bookapp.exceptions.securityexceptions.RefreshTokenMismatchException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@RestController
public class CustomExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler
    public final ResponseEntity<Object> handleDuplicateUsernameExceptionHandler(DuplicateUsernameException ex,
                                                                                WebRequest request) {
        DuplicateUsernameResponse exceptionRes = new DuplicateUsernameResponse(ex.getMessage());

        return new ResponseEntity<>(exceptionRes, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleDuplicateUsernameExceptionHandler(UserNotFoundException ex,
                                                                                WebRequest request) {

        UserNotFoundResponse exceptionRes = new UserNotFoundResponse(ex.getMessage());

        return new ResponseEntity<>(exceptionRes, HttpStatus.BAD_REQUEST);
    }


    @ExceptionHandler
    public final ResponseEntity<Object> authenticationExceptionHandler(AuthenticationException ex,
                                                                       WebRequest request) {
        ExceptionMessageResponse exceptionRes = new ExceptionMessageResponse(ex.getMessage());

        return new ResponseEntity<>(exceptionRes, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> authenticationExceptionHandler(RefreshTokenMismatchException ex,
                                                                       WebRequest request) {
        ExceptionMessageResponse exceptionRes = new ExceptionMessageResponse(ex.getMessage());

        return new ResponseEntity<>(exceptionRes, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> oAuth2AuthenticationExceptionHandler(Oauth2AuthenticationException ex,
                                                                             WebRequest request) {
        ExceptionMessageResponse exceptionRes = new ExceptionMessageResponse(ex.getMessage());

        return new ResponseEntity<>(exceptionRes, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> EmptySearchTermExceptionHandler(EmptySearchTermException ex,
                                                                        WebRequest request) {
        ExceptionMessageResponse exceptionRes = new ExceptionMessageResponse(ex.getMessage());

        return new ResponseEntity<>(exceptionRes, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> BookSearchNotFoundExceptionHandler(BookShelfNotFoundException ex,
                                                                           WebRequest request) {
        ExceptionMessageResponse exceptionRes = new ExceptionMessageResponse(ex.getMessage());

        return new ResponseEntity<>(exceptionRes, HttpStatus.BAD_REQUEST);
    }

}
