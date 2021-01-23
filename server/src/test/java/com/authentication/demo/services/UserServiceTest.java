package com.authentication.demo.services;

import com.authentication.demo.domain.User;
import com.authentication.demo.repositories.UserRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    UserRepo userRepo;

    @Mock
    BCryptPasswordEncoder passwordEncoder;

    UserService userService;

    @BeforeEach
    void setUp() {
        userService = new UserService(userRepo, passwordEncoder);
    }

    @Test
    void saveUserWithDuplicateUsername() {

        // given
        User newUser = new User();
        newUser.setId(null);
        newUser.setUsername("user1");
        when(userRepo.existsByUsername(anyString())).thenReturn(true);

        // when
        Throwable thrown = assertThrows(Throwable.class,
                () -> userService.saveUser(newUser),
                "Expected userService.saveUser to throw, but it didn't");

        assertTrue(thrown.getMessage().contains("Username already exists"));

    }

    @Test
    void loadUserById() {
    }
}