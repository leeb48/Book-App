package com.project.bookapp.services;

import com.project.bookapp.domain.Book;
import com.project.bookapp.domain.Bookshelf;
import com.project.bookapp.domain.User;
import com.project.bookapp.domain.googlebooks.Item;
import com.project.bookapp.domain.googlebooks.VolumeInfo;
import com.project.bookapp.exceptions.entityexceptions.DuplicateBookShelfNameException;
import com.project.bookapp.exceptions.entityexceptions.UserNotFoundException;
import com.project.bookapp.repositories.BookRepo;
import com.project.bookapp.repositories.BookshelfRepo;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class BookServiceTest {

    BookService bookService;


    @Mock
    UserService userService;

    @Mock
    BookRepo bookRepo;

    @Mock
    BookshelfRepo bookshelfRepo;

    @BeforeEach
    void setUp() {
        bookService = new BookService(userService, bookRepo, bookshelfRepo);
    }

    @Test
    public void saveOrUpdateBook() {
        // given
        Item googleBook = new Item();
        googleBook.id = "abcd";
        googleBook.volumeInfo = new VolumeInfo();


        Book book = new Book(googleBook);

        when(bookRepo.findByGoogleBooksId(anyString())).thenReturn(Optional.empty());
        when(bookRepo.save(any(Book.class))).thenReturn(book);

        // when
        Book savedBook = bookService.saveOrUpdateBook(googleBook);

        // then
        verify(bookRepo, times(1)).findByGoogleBooksId(anyString());
        verify(bookRepo, times(1)).save(any(Book.class));
    }

    @Test
    public void createBookShelf() throws Exception {
        // given
        User user = new User();
        user.setId(1L);
        user.setUsername("user1");

        when(userService.findUserByUsername(anyString())).thenReturn(user);
        when(bookshelfRepo.save(any(Bookshelf.class))).thenReturn(new Bookshelf());

        // when
        Bookshelf newBookshelf = bookService.createBookShelf(user.getUsername(), "newBookShelf");

        // then
        verify(userService, times(1)).findUserByUsername(anyString());
        verify(bookshelfRepo, times(1)).save(any(Bookshelf.class));

    }

    @Test
    public void createBookShelfWithNoUser() {

        // given
        when(userService.findUserByUsername(anyString())).thenThrow(new UserNotFoundException("User not found"));
        String username = "user";
        String bookShelfName = "bookShelf";

        // when
        Assertions.assertThrows(UserNotFoundException.class, () -> {
            bookService.createBookShelf(username, bookShelfName);
        });

        // then
        verify(userService, times(1)).findUserByUsername(anyString());
    }

    @Test
    public void createBookShelfDuplicateName() {

        // given
        when(userService.findUserByUsername(anyString())).thenReturn(new User());
        when(bookshelfRepo.existsBookShelfByBookshelfIdentifier(anyString())).thenReturn(true);
        String username = "user";
        String bookShelfName = "bookShelf";

        // when
        Assertions.assertThrows(DuplicateBookShelfNameException.class, () -> {
            bookService.createBookShelf(username, bookShelfName);
        });

        // then
        verify(userService, times(1)).findUserByUsername(anyString());
        verify(bookshelfRepo, times(1)).existsBookShelfByBookshelfIdentifier(anyString());
    }


    @Test
    public void addBooksToBookshelf() {
        // given
        String username = "user1";
        String bookShelfName = "bookshelf1";
        Item bookItem = new Item();
        bookItem.id = "abcd";
        bookItem.volumeInfo = new VolumeInfo();

        Bookshelf bookShelf = new Bookshelf();

        when(bookshelfRepo.findBybookshelfIdentifier(anyString())).thenReturn(Optional.of(bookShelf));
        when(bookRepo.findByGoogleBooksId(anyString())).thenReturn(Optional.of(new Book()));
        when(bookRepo.save(any(Book.class))).thenReturn(new Book());

        // when
        bookService.addBookToBookshelf(username, bookShelfName, bookItem);

        // then
        verify(bookshelfRepo, times(1)).findBybookshelfIdentifier(anyString());
        verify(bookRepo, times(1)).findByGoogleBooksId(anyString());
        verify(bookRepo, times(1)).save(any(Book.class));

        assertEquals((long) bookShelf.getBooks().size(), 1);

    }


}