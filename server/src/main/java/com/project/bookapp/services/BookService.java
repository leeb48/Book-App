package com.project.bookapp.services;

import com.project.bookapp.domain.Book;
import com.project.bookapp.domain.Bookshelf;
import com.project.bookapp.domain.User;
import com.project.bookapp.domain.googlebooks.Item;
import com.project.bookapp.exceptions.entityexceptions.BookshelfNotFoundException;
import com.project.bookapp.exceptions.entityexceptions.DuplicateBookshelfNameException;
import com.project.bookapp.repositories.BookRepo;
import com.project.bookapp.repositories.BookshelfRepo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Set;

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

    public Set<Book> retrieveBooksFromBookshelf(String bookShelfName, String username) {

        String bookShelfIdentifier = username + "-" + bookShelfName;

        Optional<Bookshelf> bookShelf = bookShelfRepo.findBybookshelfIdentifier(bookShelfIdentifier);

        return bookShelf.map(Bookshelf::getBooks).orElse(null);

    }

    @Transactional
    public void addBookToBookshelf(String username, String bookShelfName, Item googleBook) {

        String bookShelfIdentifier = username + '-' + bookShelfName;

        Optional<Bookshelf> bookShelf = bookShelfRepo.findBybookshelfIdentifier(bookShelfIdentifier);

        if (!bookShelf.isPresent()) {
            throw new BookshelfNotFoundException("Bookshelf with the name '" + bookShelfName + "' was not found.");
        }

        Book book = saveOrUpdateBook(googleBook);

        bookShelf.get().addBook(book);
    }


}
