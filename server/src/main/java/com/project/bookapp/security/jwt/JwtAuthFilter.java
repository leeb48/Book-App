package com.project.bookapp.security.jwt;

import com.project.bookapp.domain.UserEntity;
import com.project.bookapp.exceptions.entityexceptions.UserNotFoundException;
import com.project.bookapp.exceptions.securityexceptions.AuthenticationException;
import com.project.bookapp.services.UserService;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;
    private final UserService userService;

    public JwtAuthFilter(JwtTokenProvider jwtTokenProvider, UserService userService) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.userService = userService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest,
                                    HttpServletResponse httpServletResponse,
                                    FilterChain filterChain) throws ServletException, IOException {

        try {

            String jwt = jwtTokenProvider.getJwtFromReqHeader(httpServletRequest);


            // validate jwt
            if (StringUtils.hasText(jwt) && jwtTokenProvider.validateToken(jwt)) {
                Long userId = jwtTokenProvider.getUserIdFromJwt(jwt);
                UserEntity userEntity = userService.loadUserById(userId);

                if (userEntity == null) throw new UserNotFoundException("User with ID: '" + userId + "' not found.");


                // create a valid authentication object with user
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userEntity,
                        // Roles
                        null,
                        // Authorities
                        Collections.emptyList()
                );

                SecurityContextHolder.getContext().setAuthentication(authentication);
            }

        } catch (Exception ex) {
            logger.error("Could not set user authentication in security context", ex);
            throw new AuthenticationException("User could not be authenticated");
        }

        filterChain.doFilter(httpServletRequest, httpServletResponse);

    }

}
