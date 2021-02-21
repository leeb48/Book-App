package com.project.bookapp.security.oauth2;

import com.project.bookapp.config.Oauth2Properties;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.web.HttpSessionOAuth2AuthorizationRequestRepository;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class Oauth2AuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler {

    private final HttpSessionOAuth2AuthorizationRequestRepository httpSessionOAuth2AuthorizationRequestRepository;
    private final Oauth2Properties oauth2Properties;

    public Oauth2AuthenticationFailureHandler(
            HttpSessionOAuth2AuthorizationRequestRepository httpSessionOAuth2AuthorizationRequestRepository,
            Oauth2Properties oauth2Properties) {
        this.httpSessionOAuth2AuthorizationRequestRepository = httpSessionOAuth2AuthorizationRequestRepository;
        this.oauth2Properties = oauth2Properties;
    }


    @Override
    public void onAuthenticationFailure(HttpServletRequest request,
                                        HttpServletResponse response,
                                        AuthenticationException exception) throws IOException, ServletException {


        httpSessionOAuth2AuthorizationRequestRepository.removeAuthorizationRequest(request, response);

        getRedirectStrategy().sendRedirect(request, response, oauth2Properties.getFailureUrl());
    }
}
