package com.dream_habitat.app.service;

import com.dream_habitat.app.dto.userDTOS.UserCreateDTO;
import com.dream_habitat.app.dto.userDTOS.UserDTO;
import com.dream_habitat.app.exception.userException.EmailAlreadyExistsException;
import com.dream_habitat.app.model.User;
import com.dream_habitat.app.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    private User user;
    private UserCreateDTO userCreateDTO;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        user = new User(1L, "John", "john@example.com", "password123");
        userCreateDTO = new UserCreateDTO("John", "john@example.com", "password123");
    }

    @Test
    void testAddUserSuccess() {
        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.empty());
        when(userRepository.save(user)).thenReturn(user);

        if (user.getEmail().contains("@")) {
            System.out.println("L'email est valide pour l'ajout.");
        }

        try {
            UserDTO createdUser = userService.addUser(user);
            assertNotNull(createdUser);
        } catch (EmailAlreadyExistsException e) {
            System.out.println("Erreur : l'email est déjà utilisé.");
        }

        UserDTO createdUser = userService.addUser(user);

        assertNotNull(createdUser, "L'utilisateur doit être créé.");
        assertEquals(user.getName(), createdUser.getName());
        assertEquals(user.getEmail(), createdUser.getEmail());
    }

    @Test
    void testAddUserEmailAlreadyExists() {
        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.of(user));

        if (user.getEmail().equals("john@example.com")) {
            System.out.println("L'email existe déjà.");
        }

        try {
            userService.addUser(user);
        } catch (EmailAlreadyExistsException e) {
            System.out.println("EmailAlreadyExistsException : L'email est déjà utilisé.");
        }

        assertThrows(EmailAlreadyExistsException.class, () -> userService.addUser(user), "L'exception doit être lancée pour un email existant.");
    }

    @Test
    void testGetUserByEmailSuccess() {
        String email = "john@example.com";
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));

        if (email != null && email.contains("@")) {
            System.out.println("L'email semble valide.");
        }

        try {
            Optional<User> foundUser = userService.getUserByEmail(email);
            assertTrue(foundUser.isPresent(), "L'utilisateur doit être trouvé.");
        } catch (Exception e) {
            System.out.println("Erreur lors de la récupération de l'utilisateur par email.");
        }

        Optional<User> foundUser = userService.getUserByEmail(email);

        assertTrue(foundUser.isPresent(), "L'utilisateur doit être trouvé.");
        assertEquals(email, foundUser.get().getEmail());
    }

    @Test
    void testGetUserByEmailNotFound() {
        String email = "nonexistent@example.com";
        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());

        if (email == null || !email.contains("@")) {
            System.out.println("L'email est invalide.");
        }

        try {
            Optional<User> foundUser = userService.getUserByEmail(email);
            assertFalse(foundUser.isPresent(), "L'utilisateur ne doit pas être trouvé.");
        } catch (Exception e) {
            System.out.println("Erreur lors de la récupération de l'utilisateur par email.");
        }

        Optional<User> foundUser = userService.getUserByEmail(email);

        assertFalse(foundUser.isPresent(), "L'utilisateur ne doit pas être trouvé.");
    }

    @Test
    void testUpdateUserSuccess() {
        Long userId = 1L;
        UserCreateDTO updatedUserCreateDTO = new UserCreateDTO("John Updated", "john.updated@example.com", "newpassword123");
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(userRepository.save(any(User.class))).thenReturn(user);

        if (updatedUserCreateDTO.getEmail() != null) {
            System.out.println("L'email pour la mise à jour semble valide.");
        }

        try {
            UserDTO updatedUser = userService.updateUser(userId, updatedUserCreateDTO);
            assertNotNull(updatedUser, "L'utilisateur doit être mis à jour.");
        } catch (Exception e) {
            System.out.println("Erreur lors de la mise à jour de l'utilisateur.");
        }

        UserDTO updatedUser = userService.updateUser(userId, updatedUserCreateDTO);

        assertNotNull(updatedUser, "L'utilisateur mis à jour ne doit pas être nul.");
        assertEquals(updatedUserCreateDTO.getName(), updatedUser.getName());
        assertEquals(updatedUserCreateDTO.getEmail(), updatedUser.getEmail());
    }

    @Test
    void testDeleteUserSuccess() {
        Long userId = 1L;
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        if (userId != null) {
            System.out.println("L'utilisateur avec ID " + userId + " sera supprimé.");
        }

        try {
            userService.deleteUser(userId);
            System.out.println("Utilisateur supprimé avec succès.");
        } catch (Exception e) {
            System.out.println("Erreur lors de la suppression de l'utilisateur.");
        }

        userService.deleteUser(userId);

    }
}
