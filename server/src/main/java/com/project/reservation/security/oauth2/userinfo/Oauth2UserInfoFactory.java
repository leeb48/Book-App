package com.project.reservation.security.oauth2.userinfo;

import com.project.reservation.domain.AuthProvider;
import com.project.reservation.exceptions.oauth2exceptions.Oauth2AuthenticationException;

import java.util.Map;

public class Oauth2UserInfoFactory {
    public static OAuth2UserInfo getOauth2UserInfo(String registrationId, Map<String, Object> attributes) {

        if (registrationId.equalsIgnoreCase(AuthProvider.github.toString())) {
            return new GithubOAuth2UserInfo(attributes);
        } else if (registrationId.equalsIgnoreCase(AuthProvider.google.toString())) {
            return new GoogleOauth2UserInfo(attributes);
        } else {
            throw new Oauth2AuthenticationException("Login with " + registrationId + " is not supported yet.");
        }

    }
}
