package com.project.bookapp.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/test")
public class TestController {

    @GetMapping()
    public ResponseEntity<?> testRoute(HttpServletRequest request) {

       return new ResponseEntity<>("Test Route", HttpStatus.OK);
    }
}
