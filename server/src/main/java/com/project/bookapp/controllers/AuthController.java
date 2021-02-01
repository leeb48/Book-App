package com.project.bookapp.controllers;

import com.project.bookapp.domain.AuthProvider;
import com.project.bookapp.domain.UserEntity;
import com.project.bookapp.exceptions.entityexceptions.UserNotFoundException;
import com.project.bookapp.exceptions.securityexceptions.RefreshTokenMismatchException;
import com.project.bookapp.payload.authpayload.JwtLoginSuccessRes;
import com.project.bookapp.payload.authpayload.LoginRequest;
import com.project.bookapp.payload.authpayload.RefreshTokenRequest;
import com.project.bookapp.payload.authpayload.RegisterUserRequest;
import com.project.bookapp.security.jwt.JwtTokenProvider;
import com.project.bookapp.services.UserService;
import com.project.bookapp.services.ValidationService;
import com.project.bookapp.validators.UserValidator;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@RestController
@RequestMapping(AuthController.BASE_URL)
public class AuthController {
    public static final String BASE_URL = "/api/auth";

    private final UserService userService;
    private final UserValidator validator;
    private final ValidationService validationService;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;


    public AuthController(UserService userService,
                          UserValidator validator,
                          ValidationService validationService,
                          AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider) {
        this.userService = userService;
        this.validator = validator;
        this.validationService = validationService;
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest,
                                   BindingResult result) throws Exception {


        if (result.hasErrors()) {
            return validationService.createErrorResponse(result);
        }


        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        UserEntity userEntity = (UserEntity) authentication.getPrincipal();

        String jwt = jwtTokenProvider.generateToken(userEntity);
        String refreshToken = jwtTokenProvider.generateRefreshToken();

        userEntity.setRefreshToken(refreshToken);

        userService.saveUser(userEntity);


        return ResponseEntity.ok(new JwtLoginSuccessRes(true, jwt, refreshToken));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterUserRequest user,
                                      BindingResult result) throws Exception {

        validator.validate(user, result);

        if (result.hasErrors()) {
            return validationService.createErrorResponse(result);
        }

        UserEntity newUserEntity = new UserEntity();

        newUserEntity.setUsername(user.getUsername());
        newUserEntity.setPassword(user.getPassword());
        newUserEntity.setFirstName(user.getFirstName());
        newUserEntity.setLastName(user.getLastName());
        newUserEntity.setAuthProvider(AuthProvider.local);

        UserEntity createdUserEntity = userService.saveUser(newUserEntity);

        String jwt = jwtTokenProvider.generateToken(newUserEntity);
        String refreshToken = jwtTokenProvider.generateRefreshToken();

        createdUserEntity.setRefreshToken(refreshToken);
        userService.saveUser(createdUserEntity);

        return ResponseEntity.ok(new JwtLoginSuccessRes(true, jwt, refreshToken));
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@RequestBody RefreshTokenRequest refreshTokenRequest,
                                          HttpServletRequest req) throws Exception {


        String jwt = jwtTokenProvider.getJwtFromReqHeader(req);
        String username = jwtTokenProvider.getUsernameFromExpiredJwt(jwt);

        // find the user and compare the passed in refresh token to the one stored in the DB
        UserEntity userEntity = userService.findUserByUsername(username);

        if (userEntity == null) {
            throw new UserNotFoundException("User with username '" + username + "' not found");
        }

        if (!userEntity.getRefreshToken().equals(refreshTokenRequest.getRefreshToken()) ||
                !jwtTokenProvider.validateToken(refreshTokenRequest.getRefreshToken())) {
            throw new RefreshTokenMismatchException("Invalid refreshToken");
        }

        // generate new tokens
        String newJwt = jwtTokenProvider.generateToken(userEntity);
        String newRefreshToken = jwtTokenProvider.generateRefreshToken();

        userEntity.setRefreshToken(newRefreshToken);
        userService.saveUser(userEntity);


        return ResponseEntity.ok(new JwtLoginSuccessRes(true, newJwt, newRefreshToken));
    }


}
