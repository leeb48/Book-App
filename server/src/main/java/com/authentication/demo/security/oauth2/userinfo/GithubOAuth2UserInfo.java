package com.authentication.demo.security.oauth2.userinfo;

import java.util.Map;

public class GithubOAuth2UserInfo extends OAuth2UserInfo {

    public GithubOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public String getId() {
        return ((Integer) attributes.get("id")).toString();
    }

    @Override
    public String getName() {
        String name = (String) attributes.get("name");

        if (name == null) {
            return (String) attributes.get("login");
        }

        return name;
    }

    @Override
    public String getEmail() {

        String email = (String) attributes.get("email");

        if (email == null) {
            String login = (String) attributes.get("login");
            email = login + "@github.com";
        }

        return email;

    }
}
