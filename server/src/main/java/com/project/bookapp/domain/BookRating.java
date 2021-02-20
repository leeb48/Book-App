package com.project.bookapp.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;

@Data
@Entity
@EqualsAndHashCode
public class BookRating {

    @EmbeddedId
    BookRatingKey id = new BookRatingKey();

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    User user;

    @ManyToOne
    @MapsId("bookId")
    @JoinColumn(name = "book_id")
    Book book;

    int ratings;

    public BookRating() {
    }

    public BookRating(User user, Book book, int ratings) {
        this.user = user;
        this.book = book;
        this.ratings = ratings;
    }
}
