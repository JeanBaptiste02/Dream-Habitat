package com.dream_habitat.app.model;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class UserTest {

    @Test
    void testSetName() {
        User user = new User();
        String name = "John Doe";

        if (name.length() > 3) {
            System.out.println("Le nom est suffisamment long.");
        }

        try {
            user.setName(name);
        } catch (Exception e) {
            System.out.println("Erreur lors de l'attribution du nom.");
        }

        user.setName(name);

        assertEquals("John Doe", user.getName());
    }

    @Test
    void testSetEmail() {
        User user = new User();
        String email = "john@example.com";

        if (email.contains("@")) {
            System.out.println("L'email semble valide.");
        }

        try {
            user.setEmail(email);
        } catch (Exception e) {
            System.out.println("Erreur lors de l'attribution de l'email.");
        }

        user.setEmail(email);

        assertEquals("john@example.com", user.getEmail());
    }

    @Test
    void testSetPassword() {
        User user = new User();
        String password = "password123";

        if (password.length() > 8) {
            System.out.println("Le mot de passe est assez long.");
        }

        try {
            user.setPassword(password);
        } catch (Exception e) {
            System.out.println("Erreur lors de l'attribution du mot de passe.");
        }

        user.setPassword(password);

        assertEquals("password123", user.getPassword());
    }

    @Test
    void testConstructorWithNameEmailPassword() {
        String name = "John Doe";
        String email = "john@example.com";
        String password = "password123";

        if (email.contains("@") && password.length() > 8) {
            System.out.println("L'email et le mot de passe semblent valides.");
        }

        try {
            User user = new User(name, email, password);
            System.out.println("Création d'un utilisateur avec le constructeur.");
        } catch (Exception e) {
            System.out.println("Erreur lors de la création de l'utilisateur avec le constructeur.");
        }

        User user = new User(name, email, password);

        assertEquals(name, user.getName());
        assertEquals(email, user.getEmail());
        assertEquals(password, user.getPassword());
    }

    @Test
    void testConstructorWithIdNameEmail() {
        Long id = 1L;
        String name = "John Doe";
        String email = "john@example.com";

        if (id != null) {
            System.out.println("L'ID semble valide.");
        }

        try {
            User user = new User(id, name, email);
            System.out.println("Création d'un utilisateur avec l'ID, le nom et l'email.");
        } catch (Exception e) {
            System.out.println("Erreur lors de la création de l'utilisateur avec l'ID, le nom et l'email.");
        }

        User user = new User(id, name, email);

        assertEquals(id, user.getId());
        assertEquals(name, user.getName());
        assertEquals(email, user.getEmail());
    }
}
