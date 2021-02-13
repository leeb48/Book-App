package com.project.bookapp.controllers;

import com.project.bookapp.domain.googlebooks.GoogleBooksResponse;
import com.project.bookapp.exceptions.controllerExceptions.EmptySearchTermException;
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

    public static final String BASE_URL = "/api/search";

    private final ValidationService validationService;

    public GoogleBooksController(ValidationService validationService) {
        this.validationService = validationService;
    }


    @PostMapping()
    public ResponseEntity<?> searchBooks(@Valid @RequestBody BookSearchRequest searchRequest, BindingResult result) {

        if (result.hasErrors()) {
            return validationService.createErrorResponse(result);
        }

        WebClient webClient = WebClient.builder()
                .baseUrl(GOOGLE_BOOKS_BASE_URL)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();


        String searchUri = createSearchQuery(searchRequest) + API_KEY;


        GoogleBooksResponse res = webClient.get()
                .uri(searchUri)
                .retrieve()
                .bodyToMono(GoogleBooksResponse.class)
                .block();


        return ResponseEntity.ok(res);

    }

    private String createSearchQuery(BookSearchRequest searchRequest) {

        String generalSearch = !searchRequest.getGeneralSearch().trim().equals("") ? searchRequest.getGeneralSearch() : "";
        String title = !searchRequest.getTitle().trim().equals("") ? "+intitle:" + searchRequest.getTitle() : "";
        String author = !searchRequest.getAuthor().trim().equals("") ? "+inauthor:" + searchRequest.getAuthor() : "";
        String publisher = !searchRequest.getPublisher().trim().equals("") ? "+inpublisher:" + searchRequest.getPublisher() : "";
        String subject = !searchRequest.getSubject().trim().equals("") ? "+subject:" + searchRequest.getSubject() : "";
        String isbn = !searchRequest.getIsbn().trim().equals("") ? "+isbn:" + searchRequest.getIsbn() : "";
        String startIndex = String.valueOf(searchRequest.getStartIndex());
        String resultsPerPage = String.valueOf(searchRequest.getResultsPerPage());

        String searchTerms = String.format("%s%s%s%s%s%s", generalSearch, title, author, publisher, subject, isbn);
        String searchModifiers = String.format("&startIndex=%s&maxResults=%s", startIndex, resultsPerPage);

        if (searchTerms.equals("")) {
            throw new EmptySearchTermException("At least one search field must be provided");
        }

        return String.format("?q=%s%s", searchTerms, searchModifiers);

    }

}
