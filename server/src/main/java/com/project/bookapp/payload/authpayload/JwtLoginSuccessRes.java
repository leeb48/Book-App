package com.project.bookapp.payload.authpayload;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JwtLoginSuccessRes {

    private boolean success;
    private String jwt;
    private String refreshToken;
}
