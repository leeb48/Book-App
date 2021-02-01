package com.project.bookapp.services;

import com.project.bookapp.domain.UserEntity;
import com.project.bookapp.exceptions.entityexceptions.DuplicateUsernameException;
import com.project.bookapp.repositories.UserRepo;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    private final UserRepo userRepo;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserService(UserRepo userRepo, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepo = userRepo;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    public UserEntity findUserByUsername(String username) {

        return userRepo.findByUsername(username).orElse(null);
    }

    public UserEntity saveUser(UserEntity userEntity) throws Exception {
        try {
            if (userEntity.getId() == null) {

                if (userRepo.existsByUsername(userEntity.getUsername())) {
                    throw new DuplicateUsernameException("Username already exists");
                }

                userEntity.setPassword(bCryptPasswordEncoder.encode(userEntity.getPassword()));

            }
            return userRepo.save(userEntity);

        } catch (Exception e) {
            throw new Exception(e);
        }
    }

    public UserEntity loadUserById(Long id) {
        Optional<UserEntity> userOptional = userRepo.findById(id);
        if (!userOptional.isPresent()) {
            throw new UsernameNotFoundException("User Not Found");
        }

        return userOptional.get();
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepo.findByUsername(username).orElse(null);
    }

}
