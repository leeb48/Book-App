package com.project.bookapp.services;

import com.project.bookapp.domain.Book;
import com.project.bookapp.domain.Bookshelf;
import com.project.bookapp.domain.User;
import com.project.bookapp.domain.googlebooks.Item;
import com.project.bookapp.exceptions.entityexceptions.BookshelfNotFoundException;
import com.project.bookapp.exceptions.entityexceptions.DuplicateBookshelfNameException;
import com.project.bookapp.exceptions.securityexceptions.NotAuthorizedException;
import com.project.bookapp.repositories.BookRepo;
import com.project.bookapp.repositories.BookshelfRepo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    private final UserService userService;
    private final BookRepo bookRepo;
    private final BookshelfRepo bookShelfRepo;

    public BookService(UserService userService, BookRepo bookRepo, BookshelfRepo bookShelfRepo) {
        this.userService = userService;
        this.bookRepo = bookRepo;
        this.bookShelfRepo = bookShelfRepo;
    }

    public Book saveOrUpdateBook(Item bookItemFromGoogleBooks) {

        Book googleBook = new Book(bookItemFromGoogleBooks);

        Optional<Book> currBook = bookRepo.findByGoogleBooksId(googleBook.getGoogleBooksId());

        // if book already exists in the DB, then update the book info
        currBook.ifPresent(book -> googleBook.setId(book.getId()));

        return bookRepo.save(googleBook);
    }

    public Bookshelf createBookShelf(String username, String bookshelfName) throws Exception {
        User user = userService.findUserByUsername(username);

        String bookshelfIdentifier = username + "-" + bookshelfName;

        if (bookShelfRepo.existsBookShelfByBookshelfIdentifier(bookshelfIdentifier)) {
            throw new DuplicateBookshelfNameException("BookShelf name of '" + bookshelfName + "' already taken");
        }

        Bookshelf newBookshelf = new Bookshelf();
        newBookshelf.setUser(user);
        newBookshelf.setBookshelfIdentifier(bookshelfIdentifier);
        newBookshelf.setBookshelfName(bookshelfName);

        return bookShelfRepo.save(newBookshelf);
    }

    public List<Bookshelf> getUsersBookShelves(String username) {
        User user = userService.findUserByUsername(username);

        return bookShelfRepo.findBookshelvesByUser(user);
    }

    public Bookshelf getBookshelf(String username, String bookshelfName) {

        String bookshelfIdentifier = username + "-" + bookshelfName;

        Optional<Bookshelf> bookshelf = bookShelfRepo.findBybookshelfIdentifier(bookshelfIdentifier);

        if (!bookshelf.isPresent()) {
            throw new BookshelfNotFoundException("Bookshelf with the name '" + bookshelfName + "' was not found.");
        }

        return bookshelf.get();
    }

    @Transactional
    public Book addBookToBookshelf(String username, String bookshelfName, Item googleBook) {

        Bookshelf bookshelf = getBookshelf(username, bookshelfName);

        Book book = saveOrUpdateBook(googleBook);

        bookshelf.addBook(book);

        return book;
    }

    public Book getBookById(String bookId) {
        Long id = Long.valueOf(bookId);

        return bookRepo.findById(id).orElse(null);
    }

    @Transactional
    public void removeBookFromBookshelf(String username, String bookshelfName, Book book) {


        Bookshelf bookshelf = getBookshelf(username, bookshelfName);
        Optional<Book> bookToBeRemoved = bookRepo.findByGoogleBooksId(book.getGoogleBooksId());


        if (!bookToBeRemoved.isPresent()) {
            throw new BookshelfNotFoundException("Book not found");
        }


        bookshelf.removeBook(bookToBeRemoved.get());
    }

    public void removeBookshelf(String username, String bookshelfName) {
        User user = userService.findUserByUsername(username);
        Bookshelf bookshelf = getBookshelf(username, bookshelfName);

        if (!user.getId().equals(bookshelf.getUser().getId())) {
            throw new NotAuthorizedException("User is not authorized to remove the bookshelf");
        }

        bookShelfRepo.delete(bookshelf);
    }

}
