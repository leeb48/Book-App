package com.project.bookapp.repositories;

import com.project.bookapp.domain.BookRating;
import com.project.bookapp.domain.BookRatingKey;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRatingRepo extends CrudRepository<BookRating, BookRatingKey> {
}
