package com.project.bookapp.services;

import com.project.bookapp.domain.AuthProvider;
import com.project.bookapp.domain.UserEntity;
import com.project.bookapp.exceptions.oauth2exceptions.Oauth2AuthenticationException;
import com.project.bookapp.repositories.UserRepo;
import com.project.bookapp.security.oauth2.Oauth2UserPrincipal;
import com.project.bookapp.security.oauth2.userinfo.OAuth2UserInfo;
import com.project.bookapp.security.oauth2.userinfo.Oauth2UserInfoFactory;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomOauth2UserService extends DefaultOAuth2UserService {

    private final UserRepo userRepo;

    public CustomOauth2UserService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        OAuth2User oAuth2User = super.loadUser(userRequest);

        return processOAuth2User(userRequest, oAuth2User);
    }

    private OAuth2User processOAuth2User(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) {

        OAuth2UserInfo oAuth2UserInfo = Oauth2UserInfoFactory
                .getOauth2UserInfo(oAuth2UserRequest.getClientRegistration().getRegistrationId(),
                        oAuth2User.getAttributes());


        Optional<UserEntity> userOptional = userRepo.findByUsername(oAuth2UserInfo.getEmail());

        UserEntity userEntity;
        if (userOptional.isPresent()) {

            userEntity = userOptional.get();


            String requestOauth2RegistrationId = oAuth2UserRequest.getClientRegistration().getRegistrationId();

            if (!userEntity.getAuthProvider().equals(AuthProvider.valueOf(requestOauth2RegistrationId))) {
                throw new Oauth2AuthenticationException("Looks like you're signed up with " +
                        userEntity.getAuthProvider() + " account. Please use your " +
                        userEntity.getAuthProvider() + " account to login.");
            }

            userRepo.save(userEntity);

        } else {
            userEntity = registerNewUser(oAuth2UserRequest, oAuth2UserInfo);
        }

        return Oauth2UserPrincipal.create(userEntity);
    }

    private UserEntity registerNewUser(OAuth2UserRequest oAuth2UserRequest, OAuth2UserInfo oAuth2UserInfo) {
        UserEntity userEntity = new UserEntity();

        userEntity.setAuthProvider(AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId()));
        userEntity.setProviderId(oAuth2UserInfo.getId());
        userEntity.setUsername(oAuth2UserInfo.getEmail());
        return userRepo.save(userEntity);
    }
}
