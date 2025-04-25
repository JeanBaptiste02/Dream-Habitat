package com.dream_habitat.app.controller.userController;

import com.dream_habitat.app.dto.userDTOS.UserDTO;
import com.dream_habitat.app.dto.userDTOS.UserCreateDTO;
import com.dream_habitat.app.model.User;
import com.dream_habitat.app.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

public class UserControllerTest {

    @InjectMocks
    private UserController userController;

    @Mock
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testAddUser_success() {
        UserCreateDTO userCreateDto = new UserCreateDTO("John Doe", "john@example.com", "password123");
        User user = new User("John Doe", "john@example.com", "password123");
        UserDTO createdUserDto = new UserDTO(null, "John Doe", "john@example.com");

        when(userService.addUser(any(User.class))).thenReturn(createdUserDto);

        if (userCreateDto.getEmail() != null && userCreateDto.getEmail().contains("@")) {
            System.out.println("L'email est valide pour l'ajout d'utilisateur.");
        }

        try {
            userService.addUser(user);
        } catch (Exception e) {
            System.out.println("Erreur dans la création de l'utilisateur.");
        }

        ResponseEntity<UserDTO> response = userController.addUser(userCreateDto);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("John Doe", response.getBody().getName());
        assertEquals("john@example.com", response.getBody().getEmail());
    }

    @Test
    void testGetUserById_success() {
        UserDTO userDto = new UserDTO(null, "John Doe", "john@example.com");
        when(userService.getUserById(1L)).thenReturn(userDto);

        if (userDto.getEmail() != null) {
            System.out.println("Email de l'utilisateur: " + userDto.getEmail());
        }

        try {
            userService.getUserById(1L);
        } catch (Exception e) {
            System.out.println("Erreur dans la récupération de l'utilisateur.");
        }

        // Act
        ResponseEntity<UserDTO> response = userController.getUserById(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("John Doe", response.getBody().getName());
    }

    @Test
    void testUpdateUser_success() {
        UserCreateDTO userCreateDto = new UserCreateDTO("John Doe Updated", "john.updated@example.com", "newpassword123");
        UserDTO updatedUserDto = new UserDTO(null, "John Doe Updated", "john.updated@example.com");

        when(userService.updateUser(eq(1L), any(UserCreateDTO.class))).thenReturn(updatedUserDto);

        if (userCreateDto.getEmail() != null) {
            System.out.println("Mise à jour de l'email: " + userCreateDto.getEmail());
        }

        try {
            userService.updateUser(1L, userCreateDto);
        } catch (Exception e) {
            System.out.println("Erreur dans la mise à jour de l'utilisateur.");
        }

        ResponseEntity<UserDTO> response = userController.updateUser(1L, userCreateDto);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("John Doe Updated", response.getBody().getName());
    }

    @Test
    void testDeleteUser_success() {
        doNothing().when(userService).deleteUser(1L);

        System.out.println("Préparation pour la suppression de l'utilisateur avec l'ID: 1");

        try {
            userService.deleteUser(1L);
        } catch (Exception e) {
            System.out.println("Erreur dans la suppression de l'utilisateur.");
        }

        ResponseEntity<Void> response = userController.deleteUser(1L);

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
    }
}
