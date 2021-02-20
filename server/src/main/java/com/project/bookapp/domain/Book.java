package com.project.bookapp.domain;

import com.project.bookapp.converters.AuthorsConverter;
import com.project.bookapp.converters.CategoriesConverter;
import com.project.bookapp.converters.ImageLinksConverter;
import com.project.bookapp.converters.IndustryIdentifierConverter;
import com.project.bookapp.domain.googlebooks.ImageLinks;
import com.project.bookapp.domain.googlebooks.IndustryIdentifier;
import com.project.bookapp.domain.googlebooks.Item;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@Table(name = "book", uniqueConstraints = {@UniqueConstraint(columnNames = {"googleBooksId"})})
public class Book extends BaseEntity {

    @OneToMany(mappedBy = "book")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    Set<BookRating> ratings = new HashSet<>();

    @Convert(converter = IndustryIdentifierConverter.class)
    private List<IndustryIdentifier> industryIdentifiers;
    private String googleBooksId;
    private String title;
    private String subtitle;
    @Convert(converter = AuthorsConverter.class)
    private List<String> authors;
    private String publisher;
    private String publishedDate;
    @Lob
    private String description;
    @Convert(converter = CategoriesConverter.class)
    private List<String> categories;
    private String maturityRating;
    @Convert(converter = ImageLinksConverter.class)
    @Lob
    private ImageLinks imageLinks;

    public Book(Item googleBookItem) {
        this.googleBooksId = googleBookItem.id;
        this.industryIdentifiers = googleBookItem.volumeInfo.industryIdentifiers;
        this.title = googleBookItem.volumeInfo.title;
        this.subtitle = googleBookItem.volumeInfo.subtitle;
        this.authors = googleBookItem.volumeInfo.authors;
        this.publisher = googleBookItem.volumeInfo.publisher;
        this.publishedDate = googleBookItem.volumeInfo.publishedDate;
        this.description = googleBookItem.volumeInfo.description;
        this.categories = googleBookItem.volumeInfo.categories;
        this.maturityRating = googleBookItem.volumeInfo.maturityRating;
        this.imageLinks = googleBookItem.volumeInfo.imageLinks;
    }

    public Book() {

    }
}
