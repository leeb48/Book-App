package com.project.bookapp.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.HashSet;
import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@Table(name = "BOOKSHELF", uniqueConstraints = {@UniqueConstraint(columnNames = {"bookShelfName"})})
public class BookShelf extends BaseEntity {

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "added_books",
            joinColumns = @JoinColumn(name = "book_shelf_id"),
            inverseJoinColumns = @JoinColumn(name = "book_id")
    )
    Set<Book> books = new HashSet<>();

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    @NotBlank
    private String bookShelfName;

    public void addBook(Book book) {
        books.add(book);
    }
}
