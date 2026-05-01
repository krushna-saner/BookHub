package com.bookhub.controller;

import com.bookhub.model.User;
import com.bookhub.service.UserService;
import com.bookhub.util.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    // ✅ SIGNUP
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        try {
            User savedUser = userService.register(user);

            return ResponseEntity.ok("Signup successful ✅");

        } catch (Exception e) {
            return ResponseEntity
                    .status(400)
                    .body(e.getMessage()); // Email already exists
        }
    }

    // ✅ LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {

        User foundUser = userService.login(user.getEmail(), user.getPassword());

        if (foundUser != null) {

            String token = JwtUtil.generateToken(foundUser.getEmail());

            // 🔥 IMPORTANT RESPONSE (PROFESSIONAL)
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("email", foundUser.getEmail());
            response.put("name", foundUser.getName());
            response.put("role", foundUser.getRole()); // ADMIN / USER

            return ResponseEntity.ok(response);

        } else {
            return ResponseEntity
                    .status(401)
                    .body("Invalid email or password ❌");
        }
    }
}