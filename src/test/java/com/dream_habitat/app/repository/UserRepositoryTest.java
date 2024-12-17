package com.dream_habitat.app.repository;

import com.dream_habitat.app.model.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

public class UserRepositoryTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private User user;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testFindByEmail() {
        String email = "john@example.com";
        User user = new User(1L, "John", email, "password123");

        if (email != null && email.contains("@")) {
            System.out.println("L'email semble valide.");
        }

        try {
            when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
        } catch (Exception e) {
            System.out.println("Erreur lors de la recherche par email.");
        }

        Optional<User> foundUser = userRepository.findByEmail(email);

        assertTrue(foundUser.isPresent(), "L'utilisateur doit être trouvé");
        assertEquals(email, foundUser.get().getEmail());
    }

    @Test
    void testFindUserByEmail() {
        String email = "john@example.com";
        User user = new User(1L, "John", email, "password123");

        if (email.endsWith("@example.com")) {
            System.out.println("L'email appartient à 'example.com'.");
        }

        try {
            when(userRepository.findUserByEmail(email)).thenReturn(user);
        } catch (Exception e) {
            System.out.println("Erreur lors de la recherche de l'utilisateur par email.");
        }

        User foundUser = userRepository.findUserByEmail(email);

        assertNotNull(foundUser, "L'utilisateur trouvé ne doit pas être nul");
        assertEquals(email, foundUser.getEmail());
    }

    @Test
    void testFindByEmailNotFound() {
        String email = "nonexistent@example.com";

        if (email == null || !email.contains("@")) {
            System.out.println("L'email est invalide.");
        }

        try {
            when(userRepository.findByEmail(email)).thenReturn(Optional.empty());
        } catch (Exception e) {
            System.out.println("Erreur lors de la recherche de l'utilisateur par email.");
        }

        Optional<User> foundUser = userRepository.findByEmail(email);

        assertFalse(foundUser.isPresent(), "L'utilisateur ne doit pas être trouvé");
    }

    @Test
    void testFindUserByEmailNotFound() {
        String email = "nonexistent@example.com";

        if (email == null || !email.contains("@")) {
            System.out.println("L'email est invalide.");
        }

        try {
            when(userRepository.findUserByEmail(email)).thenReturn(null);
        } catch (Exception e) {
            System.out.println("Erreur lors de la recherche de l'utilisateur par email.");
        }

        User foundUser = userRepository.findUserByEmail(email);

        assertNull(foundUser, "L'utilisateur doit être nul");
    }
}
