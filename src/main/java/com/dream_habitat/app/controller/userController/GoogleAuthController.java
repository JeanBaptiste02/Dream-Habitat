package com.dream_habitat.app.controller.userController;

import com.dream_habitat.app.model.User;
import com.dream_habitat.app.service.UserService;
import com.dream_habitat.app.utils.JwtUtil; // Assuming you have a JwtUtil class for token generation
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth/google")
public class GoogleAuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    public GoogleAuthController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping("/success")
    public ResponseEntity<String> googleLoginSuccess(@AuthenticationPrincipal OAuth2User oAuth2User) {
        // Extract user info from OAuth2User
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");

        // Check if user exists, create if not
        User user = userService.getUserByEmail(email)
                .orElseGet(() -> userService.createUserFromGoogleAuth(name, email));

        // Generate JWT token
        String jwtToken = jwtUtil.generateToken1(user.getEmail());

        // Return the token in the response
        return ResponseEntity.ok("Bearer " + jwtToken);
    }
}