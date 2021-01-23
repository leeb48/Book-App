package com.authentication.demo.security.oauth2.userinfo;

import java.util.Map;

public class GoogleOauth2UserInfo extends OAuth2UserInfo {

    public GoogleOauth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public String getId() {
        return (String) this.attributes.get("sub");
    }

    @Override
    public String getName() {
        return (String) this.attributes.get("name");
    }

    @Override
    public String getEmail() {
        return (String) this.attributes.get("email");
    }
}
