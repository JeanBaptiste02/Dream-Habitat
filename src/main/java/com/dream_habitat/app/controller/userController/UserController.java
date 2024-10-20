package com.dream_habitat.app.controller.userController;



import com.dream_habitat.app.dto.userDTOS.UserDTO;
import com.dream_habitat.app.dto.userDTOS.UserCreateDTO;
import com.dream_habitat.app.model.User;
import com.dream_habitat.app.service.UserService;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/addUser")
    public ResponseEntity<UserDTO> addUser(@RequestBody UserCreateDTO userCreateDto) {
        User user = new User(userCreateDto.getName(), userCreateDto.getEmail(), userCreateDto.getPassword());

        UserDTO createdUser = userService.addUser(user);

        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
        UserDTO userDto = userService.getUserById(id);
        return ResponseEntity.ok(userDto);
    }
    
    @GetMapping("/")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<UserDTO> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }
    
    @PutMapping("/update/{id}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable Long id, @RequestBody UserCreateDTO userCreateDto) {
        UserDTO updatedUser = userService.updateUser(id, userCreateDto);
        return ResponseEntity.ok(updatedUser);
    }
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

}

