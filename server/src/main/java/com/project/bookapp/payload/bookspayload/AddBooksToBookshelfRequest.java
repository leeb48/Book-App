package com.project.bookapp.payload.bookspayload;

import com.project.bookapp.domain.googlebooks.Item;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class AddBooksToBookshelfRequest {

    @NotBlank
    @NotNull
    private String bookshelfName;

    @NotNull
    private Item book;
}
