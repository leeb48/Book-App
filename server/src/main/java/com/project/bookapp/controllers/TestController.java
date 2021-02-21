package com.project.bookapp.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.project.bookapp.config.Oauth2Properties;
import com.project.bookapp.domain.Book;
import com.project.bookapp.domain.googlebooks.Item;
import com.project.bookapp.services.BookService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/test")
public class TestController {

    private final BookService bookService;
    private final Oauth2Properties oauth2Properties;

    public TestController(BookService bookService, Oauth2Properties oauth2Properties) {
        this.bookService = bookService;
        this.oauth2Properties = oauth2Properties;
    }


    @PostMapping
    public ResponseEntity<?> test(@RequestBody Item bookItem) throws JsonProcessingException {

        Book newBook = bookService.saveOrUpdateBook(bookItem);


        return ResponseEntity.ok(oauth2Properties.getSuccessUrl());
    }

    @GetMapping
    public ResponseEntity<?> test() {
        return ResponseEntity.ok(oauth2Properties.getSuccessUrl());
    }
}
