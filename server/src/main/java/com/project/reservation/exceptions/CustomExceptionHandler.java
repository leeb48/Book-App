package com.project.reservation.exceptions;

import com.project.reservation.exceptions.entityexceptions.DuplicateUsernameException;
import com.project.reservation.exceptions.entityexceptions.DuplicateUsernameResponse;
import com.project.reservation.exceptions.entityexceptions.UserNotFoundException;
import com.project.reservation.exceptions.entityexceptions.UserNotFoundResponse;
import com.project.reservation.exceptions.oauth2exceptions.Oauth2AuthenticationException;
import com.project.reservation.exceptions.response.ExceptionMessageResponse;
import com.project.reservation.exceptions.securityexceptions.AuthenticationException;
import com.project.reservation.exceptions.securityexceptions.RefreshTokenMismatchException;
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
    public final ResponseEntity<Object> handleDuplicateUsernameException(DuplicateUsernameException ex,
                                                                         WebRequest request) {
        DuplicateUsernameResponse exceptionRes = new DuplicateUsernameResponse(ex.getMessage());

        return new ResponseEntity<>(exceptionRes, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleDuplicateUsernameException(UserNotFoundException ex,
                                                                         WebRequest request) {

        UserNotFoundResponse exceptionRes = new UserNotFoundResponse(ex.getMessage());

        return new ResponseEntity<>(exceptionRes, HttpStatus.BAD_REQUEST);
    }


    @ExceptionHandler
    public final ResponseEntity<Object> authenticationException(AuthenticationException ex,
                                                                WebRequest request) {
        ExceptionMessageResponse exceptionRes = new ExceptionMessageResponse(ex.getMessage());

        return new ResponseEntity<>(exceptionRes, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> authenticationException(RefreshTokenMismatchException ex,
                                                                WebRequest request) {
        ExceptionMessageResponse exceptionRes = new ExceptionMessageResponse(ex.getMessage());

        return new ResponseEntity<>(exceptionRes, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> oAuth2AuthenticationException(Oauth2AuthenticationException ex,
                                                                      WebRequest request) {
        ExceptionMessageResponse exceptionRes = new ExceptionMessageResponse(ex.getMessage());

        return new ResponseEntity<>(exceptionRes, HttpStatus.BAD_REQUEST);
    }

}
