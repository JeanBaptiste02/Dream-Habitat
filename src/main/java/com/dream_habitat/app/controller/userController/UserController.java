package com.dream_habitat.app.controller.userController;

import com.dream_habitat.app.model.User;
import com.dream_habitat.app.dto.userDTOS.UserDTO;
import com.dream_habitat.app.dto.userDTOS.UserCreateDTO;
import com.dream_habitat.app.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @class UserController
 * @brief Controller for handling user-related operations.
 * 
 * This controller manages user actions, such as adding, updating, retrieving, and deleting users in the database.
 */
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    /**
     * @brief Constructor for initializing UserController with UserService.
     * 
     * @param userService The service for managing user-related operations.
     */
    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * @brief Adds a new user to the database.
     * 
     * @param userCreateDto The DTO containing the user's information (name, email, password).
     * 
     * @return ResponseEntity containing the created UserDTO object, with HTTP status 201.
     * @return ResponseEntity with HTTP status 400 if the request is incorrect.
     */
    @PostMapping("/addUser")
    public ResponseEntity<UserDTO> addUser(@RequestBody UserCreateDTO userCreateDto) {
        User user = new User(userCreateDto.getName(), userCreateDto.getEmail(), userCreateDto.getPassword());
        UserDTO createdUser = userService.addUser(user);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }
    
    /**
     * @brief Retrieves a user by their ID.
     * 
     * @param id The ID of the user to retrieve.
     * 
     * @return ResponseEntity containing the UserDTO object, with HTTP status 200.
     * @return ResponseEntity with HTTP status 404 if the user is not found.
     */
    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
        UserDTO userDto = userService.getUserById(id);
        return ResponseEntity.ok(userDto);
    }
    
    /**
     * @brief Retrieves all users in the database.
     * 
     * @return ResponseEntity containing a list of UserDTO objects, with HTTP status 200.
     */
    @GetMapping("/")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<UserDTO> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }
    
    /**
     * @brief Updates an existing user's information.
     * 
     * @param id The ID of the user to update.
     * @param userCreateDto The DTO containing the updated user's information.
     * 
     * @return ResponseEntity containing the updated UserDTO object, with HTTP status 200.
     * @return ResponseEntity with HTTP status 400 if the request is incorrect.
     * @return ResponseEntity with HTTP status 404 if the user is not found.
     */
    @PutMapping("/update/{id}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable Long id, @RequestBody UserCreateDTO userCreateDto) {
        UserDTO updatedUser = userService.updateUser(id, userCreateDto);
        return ResponseEntity.ok(updatedUser);
    }
    
    /**
     * @brief Deletes a user from the database.
     * 
     * @param id The ID of the user to delete.
     * 
     * @return ResponseEntity with HTTP status 204 if the user was successfully deleted.
     * @return ResponseEntity with HTTP status 404 if the user was not found.
     */
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
