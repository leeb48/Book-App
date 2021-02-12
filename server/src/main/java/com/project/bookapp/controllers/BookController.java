package com.project.bookapp.controllers;

import com.project.bookapp.domain.Book;
import com.project.bookapp.domain.Bookshelf;
import com.project.bookapp.domain.googlebooks.Item;
import com.project.bookapp.payload.bookspayload.AddBooksToBookshelfRequest;
import com.project.bookapp.payload.bookspayload.BookAddedResponse;
import com.project.bookapp.payload.bookspayload.CreateBookshelfRequest;
import com.project.bookapp.services.BookService;
import com.project.bookapp.services.ValidationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping(BookController.BASE_URL)
public class BookController {
    public static final String BASE_URL = "/api/books";

    private final BookService bookService;
    private final ValidationService validationService;

    public BookController(BookService bookService, ValidationService validationService) {
        this.bookService = bookService;
        this.validationService = validationService;
    }

    @PostMapping("/create-bookshelf")
    public ResponseEntity<?> createBookShelf(@Valid @RequestBody CreateBookshelfRequest createBookShelfRequest,
                                             BindingResult result, Principal principal) throws Exception {

        if (result.hasErrors()) {
            return validationService.createErrorResponse(result);
        }

        String username = principal.getName();
        String bookShelfName = createBookShelfRequest.getBookshelfName();

        Bookshelf newBookshelf = bookService.createBookShelf(username, bookShelfName);

        return new ResponseEntity<>(newBookshelf, HttpStatus.CREATED);
    }

    @PostMapping("/add-book-to-bookshelf")
    public ResponseEntity<?> addBookToBookshelf(@Valid @RequestBody AddBooksToBookshelfRequest request,
                                                BindingResult result,
                                                Principal principal) {

        if (result.hasErrors()) {
            return validationService.createErrorResponse(result);
        }

        String bookshelfName = request.getBookshelfName();
        String username = principal.getName();
        Item bookItem = request.getBookItem();

        bookService.addBookToBookshelf(username, bookshelfName, bookItem);

        // send helpful message to the frontend
        String responseMessage = bookItem.volumeInfo.title + " added to " + bookshelfName + ".";
        BookAddedResponse response = new BookAddedResponse(responseMessage);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/get-bookshelves")
    public ResponseEntity<?> getUsersBookshelves(Principal principal) {

        String username = principal.getName();

        List<Bookshelf> bookshelves = bookService.getUsersBookShelves(username);

        return new ResponseEntity<>(bookshelves, HttpStatus.OK);
    }

    @GetMapping("/{bookshelfName}")
    public ResponseEntity<?> retrieveBooksFromBookshelf(@PathVariable String bookshelfName, Principal principal) {

        Set<Book> books = bookService.retrieveBooksFromBookshelf(bookshelfName, principal.getName());

        return new ResponseEntity<>(books, HttpStatus.OK);
    }
}
