package com.project.bookapp.payload.bookspayload;

import lombok.Data;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

@Data
public class BookSearchRequest {

    private String generalSearch = "";
    private String title = "";
    private String author = "";
    private String publisher = "";
    private String subject = "";
    private String isbn = "";

    private Integer startIndex = 0;

    @Min(10)
    @Max(40)
    private Integer resultsPerPage;

}
