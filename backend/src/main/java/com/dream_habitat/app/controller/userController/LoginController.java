package com.dream_habitat.app.controller.userController;

import com.dream_habitat.app.dto.userDTOS.LoginRequest;
import com.dream_habitat.app.dto.userDTOS.LoginResponse;
import com.dream_habitat.app.model.User;
import com.dream_habitat.app.service.UserService;
import com.dream_habitat.app.service.jwt.UserServiceImp;
import com.dream_habitat.app.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

/**
 * @class LoginController
 * @brief Controller for handling user login requests.
 * 
 * This controller processes login requests, authenticates the user and generates a JWT token if the authentication is successful.
 */
@RestController
@RequestMapping("/api")
public class LoginController {

    private final AuthenticationManager authenticationManager;
    private final UserServiceImp userServiceImp;
    private final JwtUtil jwtUtil;
    private final UserService userService;

    /**
     * @brief Constructor for initializing the LoginController.
     * 
     * @param authenticationManager The authentication manager used for validating user credentials.
     * @param userServiceImp The service for loading user details from the database.
     * @param jwtUtil Utility class for generating JWT tokens.
     * @param userService The service for managing user-related operations.
     */
    @Autowired
    public LoginController(AuthenticationManager authenticationManager, UserServiceImp userServiceImp, JwtUtil jwtUtil, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.userServiceImp = userServiceImp;
        this.jwtUtil = jwtUtil;
        this.userService = userService;
    }

    /**
     * @brief Authenticates the user and generates a JWT token.
     * 
     * @param loginRequest The LoginRequest object containing the user's credentials (email and password).
     * 
     * @return ResponseEntity containing the LoginResponse object with the JWT token if successful.
     * @return ResponseEntity with HTTP status 401 if authentication fails.
     * @return ResponseEntity with HTTP status 404 if the user is not found.
     * 
     * @details This method handles the user login process by authenticating the user using their email and password.
     * If authentication is successful, a JWT token is generated and returned in the response.
     */
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        // Try to authenticate the user with the provided credentials
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        UserDetails userDetails;
        // Load the user details based on the provided email
        try {
            userDetails = userServiceImp.loadUserByUsername(loginRequest.getEmail());
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        // Get the user from the database and generate a JWT token for them
        Optional<User> user = userService.getUserByEmail(loginRequest.getEmail());
        String jwt = jwtUtil.generateToken(user.orElse(null));
        LoginResponse loginResponse = new LoginResponse(jwt);

        // Return the generated JWT token in the response
        return ResponseEntity.ok(loginResponse);
    }
}
