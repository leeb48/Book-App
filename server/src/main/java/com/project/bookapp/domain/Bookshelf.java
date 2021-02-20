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
@Table(name = "bookshelf", uniqueConstraints = {@UniqueConstraint(columnNames = {"bookshelfIdentifier"})})
public class Bookshelf extends BaseEntity {

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "added_books",
            joinColumns = @JoinColumn(name = "bookshelf_id"),
            inverseJoinColumns = @JoinColumn(name = "book_id")
    )
    @EqualsAndHashCode.Exclude
    Set<Book> books = new HashSet<>();

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    @EqualsAndHashCode.Exclude
    private User user;

    @NotBlank
    private String bookshelfIdentifier;

    @NotBlank
    private String bookshelfName;

    public void addBook(Book book) {
        books.add(book);
    }

    public void removeBook(Book book) {
        books.remove(book);
    }
}
