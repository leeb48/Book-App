package com.project.reservation.payload.authpayload;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserInfoRes {

    public String username;
    public String firstName;
    public String lastName;
}
