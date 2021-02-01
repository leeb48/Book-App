package com.project.bookapp.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@Table(name = "BOOK")
public class BookEntity extends BaseEntity {


    @ElementCollection
    @Column(name = "book_identifier")
    @MapKeyColumn(name = "identifier_type")
    @CollectionTable(name = "industry_identifiers", joinColumns = @JoinColumn(name = "book_id"))
    Map<String, String> industryIdentifiers = new HashMap<>();
    private String googleBooksId;
    private String title;
    private String subtitle;
    @ElementCollection(targetClass = String.class)
    @CollectionTable(name = "authors", joinColumns = @JoinColumn(name = "book_id"))
    @Column(name = "authors")
    private List<String> authors = new ArrayList<>();
    private String publisher;
    private String publishedDate;
    private String description;
    private String categories;
    private String maturityRating;
    private String imageLinks;
}
