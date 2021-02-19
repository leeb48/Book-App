package com.project.bookapp.payload.bookspayload;

import com.project.bookapp.domain.Book;
import lombok.Data;

@Data
public class RemoveBookFromBookshelfRequest {
    private String bookshelfName;
    private Book book;
}
