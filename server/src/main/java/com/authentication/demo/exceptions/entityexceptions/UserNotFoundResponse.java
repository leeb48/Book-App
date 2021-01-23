package com.authentication.demo.exceptions.entityexceptions;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserNotFoundResponse {
    public String userNotFound;
}
