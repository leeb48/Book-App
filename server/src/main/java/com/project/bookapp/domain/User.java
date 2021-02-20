package com.project.bookapp.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@Table(name = "users", uniqueConstraints = {@UniqueConstraint(columnNames = {"username"})})
public class User extends BaseEntity implements UserDetails {

    @OneToMany(mappedBy = "user")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    Set<BookRating> ratings = new HashSet<>();

    @Email(message = "Username must be an email")
    @NotBlank(message = "Username is required")
    private String username;
    private String firstName;
    private String lastName;
    @NotNull
    @Enumerated(EnumType.STRING)
    private AuthProvider authProvider;
    private String providerId;
    @JsonIgnore
    @ToString.Exclude
    private String password;
    @JsonIgnore
    @ToString.Exclude
    private String refreshToken;
    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(updatable = false)
    private Date createAt;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date updatedAt;
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    @ToString.Exclude
    @JsonIgnore
    private Set<Bookshelf> bookShelves = new HashSet<>();

    @PrePersist
    protected void onCreate() {
        this.createAt = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = new Date();
    }

    // UserDetails Methods
    @Override
    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isEnabled() {
        return true;
    }
}
