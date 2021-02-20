package com.project.bookapp.payload.bookspayload;

import lombok.Data;

@Data
public class BookRatingRequest {
    private String bookId;
    private int rating;
}
