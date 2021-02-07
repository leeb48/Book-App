package com.project.bookapp.services;

import com.project.bookapp.domain.Book;
import com.project.bookapp.domain.BookShelf;
import com.project.bookapp.domain.User;
import com.project.bookapp.domain.googlebooks.Item;
import com.project.bookapp.exceptions.entityexceptions.BookShelfNotFoundException;
import com.project.bookapp.exceptions.entityexceptions.UserNotFoundException;
import com.project.bookapp.repositories.BookRepo;
import com.project.bookapp.repositories.BookShelfRepo;
import com.project.bookapp.repositories.UserRepo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class BookService {

    private final UserRepo userRepo;
    private final BookRepo bookRepo;
    private final BookShelfRepo bookShelfRepo;

    public BookService(UserRepo userRepo, BookRepo bookRepo, BookShelfRepo bookShelfRepo) {
        this.userRepo = userRepo;
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

    public BookShelf createBookShelf(String username, String bookShelfName) {
        Optional<User> user = userRepo.findByUsername(username);

        if (!user.isPresent()) {
            throw new UserNotFoundException("Book-Shelf could not be created because user was not found");
        }

        BookShelf newBookShelf = new BookShelf();
        newBookShelf.setUser(user.get());
        newBookShelf.setBookShelfName(username + "-" + bookShelfName);

        return bookShelfRepo.save(newBookShelf);
    }

    @Transactional
    public void addBooksToBookShelf(String username, String bookShelfName, Item googleBook) {

        String bookShelfNameQuery = username + '-' + bookShelfName;

        Optional<BookShelf> bookShelf = bookShelfRepo.findByBookShelfName(bookShelfNameQuery);

        if (!bookShelf.isPresent()) {
            throw new BookShelfNotFoundException("Bookshelf with the name '" + bookShelfNameQuery + "' was not found.");
        }

        Book book = saveOrUpdateBook(googleBook);

        bookShelf.get().addBook(book);
    }
}
