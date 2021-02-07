package com.project.bookapp.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.project.bookapp.domain.Book;
import com.project.bookapp.domain.googlebooks.Item;
import com.project.bookapp.services.BookService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class TestController {

    private final BookService bookService;

    public TestController(BookService bookService) {
        this.bookService = bookService;
    }


    @PostMapping
    public ResponseEntity<?> test(@RequestBody Item bookItem) throws JsonProcessingException {

        Book newBook = bookService.saveOrUpdateBook(bookItem);


        return ResponseEntity.ok(newBook);
    }
}
