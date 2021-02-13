package com.project.bookapp.repositories;

import com.project.bookapp.domain.Book;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BookRepo extends CrudRepository<Book, Long> {

    Optional<Book> findByGoogleBooksId(String googleBooksId);

}
