package com.bookhub.service;

import com.bookhub.model.User;
import com.bookhub.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User register(User user) {
    	 User existing = userRepository.findByEmail(user.getEmail());

    	    if (existing != null) {
    	        throw new RuntimeException("Email already exists");
    	    }
    	    if (user.getRole() == null) {
    	        user.setRole("USER"); // ✅ DEFAULT
    	    }
        return userRepository.save(user);
    }

    public User login(String email, String password) {
        User user = userRepository.findByEmail(email);

        if (user != null && user.getPassword().equals(password)) {
            return user;
        }
        return null;
    }
}