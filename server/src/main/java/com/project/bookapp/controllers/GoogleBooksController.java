package com.project.bookapp.controllers;

import com.project.bookapp.domain.googlebooks.GoogleBooksResponse;
import com.project.bookapp.payload.bookspayload.BookSearchRequest;
import com.project.bookapp.services.ValidationService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;

import javax.validation.Valid;

import static com.project.bookapp.controllers.ControllerConstants.API_KEY;
import static com.project.bookapp.controllers.ControllerConstants.GOOGLE_BOOKS_BASE_URL;

@RestController
@RequestMapping(GoogleBooksController.BASE_URL)
public class GoogleBooksController {

    public static final String BASE_URL = "/api/books";

    private final ValidationService validationService;

    public GoogleBooksController(ValidationService validationService) {
        this.validationService = validationService;
    }


    @PostMapping("/search")
    public ResponseEntity<?> searchBooks(@Valid @RequestBody BookSearchRequest searchRequest, BindingResult result) {

        if (result.hasErrors()) {
            return validationService.createErrorResponse(result);
        }

        WebClient webClient = WebClient.builder()
                .baseUrl(GOOGLE_BOOKS_BASE_URL)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();


        String searchUri = createSearchQuery(searchRequest) + API_KEY;

        System.out.println(searchUri);

        GoogleBooksResponse res = webClient.get()
                .uri(searchUri)
                .retrieve()
                .bodyToMono(GoogleBooksResponse.class)
                .block();


        return ResponseEntity.ok(res.items);

    }

    private String createSearchQuery(BookSearchRequest searchRequest) {

        String title = "intitle:" + searchRequest.getTitle();
        String author = "inauthor:" + searchRequest.getAuthor();
        String publisher = "inpublisher:" + searchRequest.getPublisher();
        String subject = "subject:" + searchRequest.getSubject();
        String isbn = "isbn:" + searchRequest.getIsbn();

        return String.format("?q=%s+%s+%s+%s+%s", title, author, publisher, subject, isbn);
    }

}
