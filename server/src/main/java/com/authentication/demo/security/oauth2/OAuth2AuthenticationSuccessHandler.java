package com.authentication.demo.security.oauth2;

import com.authentication.demo.domain.User;
import com.authentication.demo.exceptions.oauth2exceptions.Oauth2AuthenticationException;
import com.authentication.demo.security.jwt.JwtTokenProvider;
import com.authentication.demo.services.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static com.authentication.demo.security.SecurityConstants.OAUTH2_SUCCESS_REDIRECT_URL;
import static com.authentication.demo.security.SecurityConstants.TOKEN_COOKIE_EXPIRE_TIME;

@Component
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtTokenProvider jwtTokenProvider;
    private final UserService userService;

    public OAuth2AuthenticationSuccessHandler(JwtTokenProvider jwtTokenProvider, UserService userService) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.userService = userService;
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

        response.sendRedirect(OAUTH2_SUCCESS_REDIRECT_URL);
    }
}
