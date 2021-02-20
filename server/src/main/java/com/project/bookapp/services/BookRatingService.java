package com.project.bookapp.services;

import com.project.bookapp.domain.Book;
import com.project.bookapp.domain.BookRating;
import com.project.bookapp.domain.BookRatingKey;
import com.project.bookapp.domain.User;
import com.project.bookapp.repositories.BookRatingRepo;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Optional;
import java.util.OptionalDouble;

@Service
public class BookRatingService {

    private final BookRatingRepo bookRatingRepo;

    public BookRatingService(BookRatingRepo bookRatingRepo) {
        this.bookRatingRepo = bookRatingRepo;
    }

    public void rateBook(User user, Book book, int rating) {

        BookRatingKey key = new BookRatingKey(user.getId(), book.getId());


        Optional<BookRating> bookRatingOptional = bookRatingRepo.findById(key);


        // allow users to modify their rating
        BookRating bookRating;
        if (bookRatingOptional.isPresent()) {
            bookRating = bookRatingOptional.get();
            bookRating.setRatings(rating);
        } else {
            bookRating = new BookRating(user, book, rating);
        }

        bookRatingRepo.save(bookRating);
    }

    public double getBooksRating(Book book) {

        OptionalDouble ratingOptional = book.getRatings().stream().mapToDouble(BookRating::getRatings).average();

        if (ratingOptional.isPresent()) {
            BigDecimal bd = BigDecimal.valueOf(ratingOptional.getAsDouble()).setScale(2, RoundingMode.HALF_UP);
            return bd.doubleValue();
        }


        return 0;
    }

}
