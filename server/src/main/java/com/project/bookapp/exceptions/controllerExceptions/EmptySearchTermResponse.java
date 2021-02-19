package com.project.bookapp.exceptions.controllerExceptions;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class EmptySearchTermResponse {
    private String emptySearchTerm;
}
