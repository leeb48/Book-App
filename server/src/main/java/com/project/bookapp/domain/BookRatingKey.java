package com.project.bookapp.domain;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class BookRatingKey implements Serializable {

    @Column(name = "user_id")
    public Long userId;

    @Column(name = "book_id")
    public Long bookId;

}
