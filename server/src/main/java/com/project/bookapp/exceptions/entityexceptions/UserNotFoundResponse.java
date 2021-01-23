package com.project.bookapp.exceptions.entityexceptions;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserNotFoundResponse {
    public String userNotFound;
}
