package com.authentication.demo.exceptions.entityexceptions;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DuplicateUsernameResponse {
    public String duplicateUsername;
}
