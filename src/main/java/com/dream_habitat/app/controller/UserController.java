package com.dream_habitat.app.controller;



import com.dream_habitat.app.dto.UserDTO;
import com.dream_habitat.app.dto.UserCreateDTO;
import com.dream_habitat.app.model.User;
import com.dream_habitat.app.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


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
}

