package com.project.bookapp.services;

import com.project.bookapp.domain.User;
import com.project.bookapp.exceptions.entityexceptions.DuplicateUsernameException;
import com.project.bookapp.exceptions.entityexceptions.UserNotFoundException;
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


    public User findUserByUsername(String username) {

        Optional<User> user = userRepo.findByUsername(username);

        if (!user.isPresent()) {
            throw new UserNotFoundException("User with username '" + username + "' not found.");
        }
       
        return user.get();
    }

    public User saveUser(User user) throws Exception {
        try {
            if (user.getId() == null) {

                if (userRepo.existsByUsername(user.getUsername())) {
                    throw new DuplicateUsernameException("Username already exists");
                }

                user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));

            }
            return userRepo.save(user);

        } catch (Exception e) {
            throw new Exception(e);
        }
    }

    public User loadUserById(Long id) {
        Optional<User> userOptional = userRepo.findById(id);
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
