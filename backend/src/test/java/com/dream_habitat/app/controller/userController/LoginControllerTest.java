package com.dream_habitat.app.controller.userController;

import com.dream_habitat.app.dto.userDTOS.LoginRequest;
import com.dream_habitat.app.dto.userDTOS.LoginResponse;
import com.dream_habitat.app.model.User;
import com.dream_habitat.app.service.UserService;
import com.dream_habitat.app.service.jwt.UserServiceImp;
import com.dream_habitat.app.utils.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

public class LoginControllerTest {

    @InjectMocks
    private LoginController loginController;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private UserServiceImp userServiceImp;

    @Mock
    private JwtUtil jwtUtil;

    @Mock
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testLogin_successful() {
        LoginRequest loginRequest = new LoginRequest();
        User mockUser = new User();
        mockUser.setEmail("test@example.com");
        mockUser.setPassword("password123");

        when(authenticationManager.authenticate(any())).thenReturn(null);
        when(userServiceImp.loadUserByUsername("test@example.com")).thenReturn(mock(UserDetails.class));
        when(userService.getUserByEmail("test@example.com")).thenReturn(Optional.of(mockUser));
        when(jwtUtil.generateToken(mockUser)).thenReturn("mockJwtToken");

        ResponseEntity<LoginResponse> response = loginController.login(loginRequest);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
    }

    @Test
    void testLogin_userNotFound() {
        LoginRequest loginRequest = new LoginRequest();

        when(authenticationManager.authenticate(any())).thenReturn(null); // Simulate successful authentication
        when(userServiceImp.loadUserByUsername("test@example.com")).thenThrow(UsernameNotFoundException.class);

        ResponseEntity<LoginResponse> response = loginController.login(loginRequest);
    }

    @Test
    void testLogin_unauthorized() {
        LoginRequest loginRequest = new LoginRequest();

        when(authenticationManager.authenticate(any())).thenThrow(new RuntimeException("Authentication failed"));
    }

    @Test
    void testLogin_emptyEmail() {
        LoginRequest loginRequest = new LoginRequest();

        if (loginRequest.getEmail() == null || loginRequest.getEmail().isEmpty()) {
            System.out.println("L'email est vide ou nul, aucune authentification ne peut être effectuée.");
        }

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
        } catch (Exception e) {
            System.out.println("Erreur d'authentification avec l'email vide.");
        }

        ResponseEntity<LoginResponse> response = loginController.login(loginRequest);

    }

    @Test
    void testLogin_nullEmail() {
        LoginRequest loginRequest = new LoginRequest();

        if (loginRequest.getEmail() == null) {
            System.out.println("L'email est nul, l'authentification ne peut pas être effectuée.");
        }

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
        } catch (Exception e) {
            System.out.println("Erreur d'authentification avec l'email nul.");
        }

        User mockUser = new User();
        mockUser.setEmail("test@example.com");
        mockUser.setPassword("password123");

        when(userServiceImp.loadUserByUsername(loginRequest.getEmail())).thenReturn(mock(UserDetails.class));
        when(userService.getUserByEmail(loginRequest.getEmail())).thenReturn(Optional.of(mockUser));
        when(jwtUtil.generateToken(mockUser)).thenReturn("mockJwtToken");

        ResponseEntity<LoginResponse> response = loginController.login(loginRequest);

        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("mockJwtToken", response.getBody().getJwtToken());
    }


}
