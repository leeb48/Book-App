package com.project.bookapp.security.oauth2;

import com.project.bookapp.config.Oauth2Properties;
import com.project.bookapp.domain.User;
import com.project.bookapp.exceptions.oauth2exceptions.Oauth2AuthenticationException;
import com.project.bookapp.security.jwt.JwtTokenProvider;
import com.project.bookapp.services.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static com.project.bookapp.security.SecurityConstants.TOKEN_COOKIE_EXPIRE_TIME;

@Component
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtTokenProvider jwtTokenProvider;
    private final UserService userService;
    private final Oauth2Properties oauth2Properties;

    public OAuth2AuthenticationSuccessHandler(JwtTokenProvider jwtTokenProvider, UserService userService, Oauth2Properties oauth2Properties) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.userService = userService;
        this.oauth2Properties = oauth2Properties;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication)
            throws IOException, ServletException, Oauth2AuthenticationException {


        Oauth2UserPrincipal userPrincipal = (Oauth2UserPrincipal) authentication.getPrincipal();

        User user = userService.findUserByUsername(userPrincipal.getUsername());

        String jwt = jwtTokenProvider.generateToken(user);
        String refreshToken = jwtTokenProvider.generateRefreshToken();


        user.setRefreshToken(refreshToken);

        try {
            userService.saveUser(user);
        } catch (Exception ex) {
            throw new Oauth2AuthenticationException("Exception thrown at 'onAuthenticationSuccess'.");
        }

        Cookie jwtCookie = new Cookie("jwt", jwt);
        jwtCookie.setPath("/");
        jwtCookie.setMaxAge(TOKEN_COOKIE_EXPIRE_TIME);

        Cookie refreshTokenCookie = new Cookie("refreshToken", refreshToken);
        refreshTokenCookie.setPath("/");
        refreshTokenCookie.setMaxAge(TOKEN_COOKIE_EXPIRE_TIME);

        response.addCookie(jwtCookie);
        response.addCookie(refreshTokenCookie);

        response.sendRedirect(oauth2Properties.getSuccessUrl());
    }
}
