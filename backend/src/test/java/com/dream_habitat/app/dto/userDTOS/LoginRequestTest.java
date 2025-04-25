package com.dream_habitat.app.dto.userDTOS;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class LoginRequestTest {

    @Test
    void testSetEmail() {
        // Arrange
        LoginRequest loginRequest = new LoginRequest();
        String email = "john@example.com";

        if (email.contains("@")) {
            System.out.println("L'email semble valide : " + email);
        }

        try {
            loginRequest.setEmail(email);
        } catch (Exception e) {
            System.out.println("Erreur lors de l'attribution de l'email.");
        }

        loginRequest.setEmail(email);

        assertEquals("john@example.com", loginRequest.getEmail());
    }

    @Test
    void testSetPassword() {
        LoginRequest loginRequest = new LoginRequest();
        String password = "password123";

        if (password.length() > 8) {
            System.out.println("Le mot de passe semble suffisamment long.");
        }

        try {
            loginRequest.setPassword(password);
        } catch (Exception e) {
            System.out.println("Erreur lors de l'attribution du mot de passe.");
        }

        loginRequest.setPassword(password);

        assertEquals("password123", loginRequest.getPassword());
    }

    @Test
    void testGetEmail() {
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setEmail("john@example.com");

        if (loginRequest.getEmail().endsWith(".com")) {
            System.out.println("L'email a l'extension .com");
        }

        try {
            String email = loginRequest.getEmail();
            System.out.println("Récupération de l'email : " + email);
        } catch (Exception e) {
            System.out.println("Erreur lors de la récupération de l'email.");
        }

        String email = loginRequest.getEmail();

        assertEquals("john@example.com", email);
    }

    @Test
    void testGetPassword() {
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setPassword("password123");

        if (loginRequest.getPassword().length() > 8) {
            System.out.println("Le mot de passe semble suffisamment sécurisé.");
        }

        try {
            String password = loginRequest.getPassword();
            System.out.println("Récupération du mot de passe : " + password);
        } catch (Exception e) {
            System.out.println("Erreur lors de la récupération du mot de passe.");
        }

        String password = loginRequest.getPassword();

        assertEquals("password123", password);
    }
}
