package com.project.bookapp.security.oauth2;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.web.HttpSessionOAuth2AuthorizationRequestRepository;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static com.project.bookapp.security.SecurityConstants.OAUTH2_FAILURE_REDIRECT_URL;

@Component
public class Oauth2AuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler {

    private final HttpSessionOAuth2AuthorizationRequestRepository httpSessionOAuth2AuthorizationRequestRepository;

    public Oauth2AuthenticationFailureHandler(
            HttpSessionOAuth2AuthorizationRequestRepository httpSessionOAuth2AuthorizationRequestRepository
    ) {
        this.httpSessionOAuth2AuthorizationRequestRepository = httpSessionOAuth2AuthorizationRequestRepository;
    }


    @Override
    public void onAuthenticationFailure(HttpServletRequest request,
                                        HttpServletResponse response,
                                        AuthenticationException exception) throws IOException, ServletException {


        httpSessionOAuth2AuthorizationRequestRepository.removeAuthorizationRequest(request, response);

        getRedirectStrategy().sendRedirect(request, response, OAUTH2_FAILURE_REDIRECT_URL);
    }
}
