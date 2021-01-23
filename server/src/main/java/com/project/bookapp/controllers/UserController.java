package com.project.bookapp.controllers;

import com.project.bookapp.domain.User;
import com.project.bookapp.payload.authpayload.UserInfoRes;
import com.project.bookapp.services.UserService;
import com.project.bookapp.exceptions.entityexceptions.UserNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping(UserController.BASE_URL)
public class UserController {
    public static final String BASE_URL = "/api/users";

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/get-user-info")
    public ResponseEntity<?> getUserInfo(Principal principal) {

        User user = userService.findUserByUsername(principal.getName());

        if (user == null) {
            throw new UserNotFoundException("User with username '" + principal.getName() + "' not found.");
        }

        UserInfoRes response = new UserInfoRes(
                user.getUsername(), user.getFirstName(), user.getLastName()
        );

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
