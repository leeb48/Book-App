package com.authentication.demo.validators;

import com.authentication.demo.payload.authpayload.RegisterUserRequest;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class UserValidator implements Validator {
    @Override
    public boolean supports(Class<?> aClass) {
        return RegisterUserRequest.class.equals(aClass);
    }

    @Override
    public void validate(Object object, Errors errors) {

        RegisterUserRequest user = (RegisterUserRequest) object;

        if (user.getPassword().length() < 6) {
            errors.rejectValue("password", "Length", "Password must be at least 6 characters");
        }

        if (!user.getPassword().equals(user.getPassword2())) {
            errors.rejectValue("password2", "Match", "Passwords must match");
        }
    }
}
