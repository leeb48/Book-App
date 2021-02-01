package com.project.bookapp.security;

import com.project.bookapp.domain.UserEntity;
import com.project.bookapp.security.jwt.JwtTokenProvider;
import com.project.bookapp.services.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles(profiles = "test")
public class TokenAuthenticationTest {

    @Autowired
    JwtTokenProvider jwtTokenProvider;
    @Autowired
    private MockMvc mvc;
    @MockBean
    private UserService userService;

    @Test
    void noAccessToUnauthenticatedUsers() throws Exception {

        mvc.perform(get("/api/users/get-user-info")).andExpect(status().isUnauthorized());

    }

    @Test
    void accessWithValidJwt() throws Exception {

        UserEntity testUserEntity = new UserEntity();
        testUserEntity.setId(1L);
        testUserEntity.setUsername("testUser");

        when(userService.findUserByUsername(anyString())).thenReturn(testUserEntity);
        when(userService.loadUserById(testUserEntity.getId())).thenReturn(testUserEntity);

        String jwt = "Bearer " + jwtTokenProvider.generateToken(testUserEntity);

        MvcResult result = mvc.perform(get("/api/users/get-user-info").header("Authorization", jwt))
                .andExpect(status().isOk()).andReturn();
    }

    @Test
    void accessWithInvalidJwt() throws Exception {

        mvc.perform(get("/api/users/get-user-info")
                .header("Authorization", "Bearer invalidjwtToken"))
                .andExpect(status().isUnauthorized());

    }
}
