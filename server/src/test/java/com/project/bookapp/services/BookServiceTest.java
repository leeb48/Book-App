package com.project.bookapp.services;

import com.project.bookapp.domain.Book;
import com.project.bookapp.domain.BookShelf;
import com.project.bookapp.domain.User;
import com.project.bookapp.domain.googlebooks.Item;
import com.project.bookapp.domain.googlebooks.VolumeInfo;
import com.project.bookapp.repositories.BookRepo;
import com.project.bookapp.repositories.BookShelfRepo;
import com.project.bookapp.repositories.UserRepo;
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
    UserRepo userRepo;

    @Mock
    BookRepo bookRepo;

    @Mock
    BookShelfRepo bookShelfRepo;

    @BeforeEach
    void setUp() {
        bookService = new BookService(userRepo, bookRepo, bookShelfRepo);
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
    public void createBookShelf() {
        // given
        User user = new User();
        user.setId(1L);
        user.setUsername("user1");

        when(userRepo.findByUsername(anyString())).thenReturn(Optional.of(user));
        when(bookShelfRepo.save(any(BookShelf.class))).thenReturn(new BookShelf());

        // when
        BookShelf newBookShelf = bookService.createBookShelf(user.getUsername(), "newBookShelf");

        // then
        verify(userRepo, times(1)).findByUsername(anyString());
        verify(bookShelfRepo, times(1)).save(any(BookShelf.class));

    }

    @Test
    public void addBooksToBookShelf() {
        // given
        String username = "user1";
        String bookShelfName = "bookshelf1";
        Item bookItem = new Item();
        bookItem.id = "abcd";
        bookItem.volumeInfo = new VolumeInfo();

        BookShelf bookShelf = new BookShelf();

        when(bookShelfRepo.findByBookShelfName(anyString())).thenReturn(Optional.of(bookShelf));
        when(bookRepo.findByGoogleBooksId(anyString())).thenReturn(Optional.of(new Book()));
        when(bookRepo.save(any(Book.class))).thenReturn(new Book());

        // when
        bookService.addBooksToBookShelf(username, bookShelfName, bookItem);

        // then
        verify(bookShelfRepo, times(1)).findByBookShelfName(anyString());
        verify(bookRepo, times(1)).findByGoogleBooksId(anyString());
        verify(bookRepo, times(1)).save(any(Book.class));

        assertEquals((long) bookShelf.getBooks().size(), 1);

    }


}