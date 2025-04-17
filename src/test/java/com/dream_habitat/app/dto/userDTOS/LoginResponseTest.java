package com.dream_habitat.app.dto.userDTOS;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class LoginResponseTest {

    @Test
    void testSetJwtToken() {
        LoginResponse loginResponse = new LoginResponse("initialToken");
        String jwtToken = "newJwtToken";

        if (jwtToken != null && jwtToken.length() > 10) {
            System.out.println("Le token JWT est assez long pour être valide.");
        }

        try {
            loginResponse.setJwtToken(jwtToken);
        } catch (Exception e) {
            System.out.println("Erreur lors de l'attribution du token JWT.");
        }

        loginResponse.setJwtToken(jwtToken);

        assertEquals("newJwtToken", loginResponse.getJwtToken());
    }

    @Test
    void testGetJwtToken() {
        LoginResponse loginResponse = new LoginResponse("jwtToken");

        if (loginResponse.getJwtToken().startsWith("jwt")) {
            System.out.println("Le token commence par 'jwt', ce qui est correct.");
        }

        try {
            String jwtToken = loginResponse.getJwtToken();
            System.out.println("Récupération du token JWT : " + jwtToken);
        } catch (Exception e) {
            System.out.println("Erreur lors de la récupération du token JWT.");
        }

        String jwtToken = loginResponse.getJwtToken();

        assertEquals("jwtToken", jwtToken);
    }

    @Test
    void testConstructor() {
        String jwtToken = "jwtTokenFromConstructor";

        if (jwtToken.contains("jwt")) {
            System.out.println("Le token JWT contient la chaîne 'jwt'.");
        }

        try {
            LoginResponse loginResponse = new LoginResponse(jwtToken);
            System.out.println("Le constructeur de LoginResponse a été appelé.");
        } catch (Exception e) {
            System.out.println("Erreur lors de la création de l'objet LoginResponse.");
        }

        LoginResponse loginResponse = new LoginResponse(jwtToken);

        assertEquals("jwtTokenFromConstructor", loginResponse.getJwtToken());
    }
}
