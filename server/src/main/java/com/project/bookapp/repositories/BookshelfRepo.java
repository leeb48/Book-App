package com.project.bookapp.repositories;

import com.project.bookapp.domain.Bookshelf;
import com.project.bookapp.domain.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookshelfRepo extends CrudRepository<Bookshelf, Long> {

    Optional<Bookshelf> findBybookshelfIdentifier(String bookShelfIdentifier);

    Boolean existsBookShelfByBookshelfIdentifier(String bookShelfIdentifier);

    List<Bookshelf> findBookshelvesByUser(User user);
}
