package com.project.bookapp.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@Table(name = "BOOKSHELF")
public class BookShelfEntity extends BaseEntity {

    @ManyToMany
    @JoinTable(
            name = "added_books",
            joinColumns = @JoinColumn(name = "book_shelf_id"),
            inverseJoinColumns = @JoinColumn(name = "book_id")
    )
    Set<BookEntity> books = new HashSet<>();


    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity userEntity;
}
