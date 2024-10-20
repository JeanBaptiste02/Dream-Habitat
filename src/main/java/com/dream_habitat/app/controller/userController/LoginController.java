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
 * Controller for handling user login requests
 * @author Jean-Baptiste, Kamel, Victor, Mahdi
 */
@RestController
@RequestMapping("/api")
public class LoginController {
    private final AuthenticationManager authenticationManager;
    private final UserServiceImp userServiceImp;
    private final JwtUtil jwtUtil;
    private final UserService userService;

    /**
     * Constructs a new instance of the LoginController
     * @param authenticationManager The AuthenticationManager instance
     * @param userServiceImp The UserServiceImp instance
     * @param jwtUtil The JwtUtil instance
     * @param userService The UserService instance
     */
    @Autowired
    public LoginController(AuthenticationManager authenticationManager, UserServiceImp userServiceImp, JwtUtil jwtUtil, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.userServiceImp = userServiceImp;
        this.jwtUtil = jwtUtil;
        this.userService = userService;
    }

    /**
     * Handles user login requests and generates JWT tokens
     * @param loginRequest The LoginRequest object containing user credentials
     * @return ResponseEntity containing a LoginResponse object with a JWT token
     */
    @PostMapping("/login")
    public ResponseEntity<LoginResponse>  login(@RequestBody LoginRequest loginRequest) {
        try{
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(),loginRequest.getPassword())
            );
        }catch (AuthenticationException e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        UserDetails userDetails;
        try {
            userDetails = userServiceImp.loadUserByUsername(loginRequest.getEmail());
        }catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        Optional<User> user = userService.getUserByEmail(loginRequest.getEmail()) ;
        String jwt = jwtUtil.generateToken(user.orElse(null));
        LoginResponse loginResponse = new LoginResponse(jwt);
        return ResponseEntity.ok(loginResponse);
    }
}

