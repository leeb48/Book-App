package com.project.bookapp.payload.bookspayload;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class CreateBookshelfRequest {

    @NotBlank
    @NotNull
    private String bookshelfName;
}
