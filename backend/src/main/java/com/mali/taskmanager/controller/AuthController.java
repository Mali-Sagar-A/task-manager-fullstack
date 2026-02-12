package com.mali.taskmanager.controller;

import com.mali.taskmanager.dto.LoginRequest;
import com.mali.taskmanager.model.User;
import com.mali.taskmanager.repository.UserRepository;
import com.mali.taskmanager.security.JwtUtil;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    


    @PostMapping("/register")
    public String register(@RequestBody User user) {

        if (userRepository.existsByEmail(user.getEmail())) {
            return "Email already registered";
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);

        return "User registered successfully";
    }
    
    @PostMapping("/login")
    public Map<String, String> login(@RequestBody LoginRequest loginRequest) {

        var userOptional = userRepository
                .findByEmailIgnoreCase(loginRequest.getEmail());

        if (userOptional.isEmpty()) {
            throw new RuntimeException("Invalid credentials");
        }

        User user = userOptional.get();

        if (!passwordEncoder.matches(
                loginRequest.getPassword(),
                user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtUtil.generateToken(user.getEmail());

        return Map.of("token", token);
    }


    
    @GetMapping("/test")
    public String test() {
        return "JWT works!";
    }




}
