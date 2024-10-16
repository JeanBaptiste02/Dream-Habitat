package com.dream_habitat.app.service;


import com.dream_habitat.app.dto.UserCreateDTO;
import com.dream_habitat.app.dto.UserDTO;
import com.dream_habitat.app.exception.userException.EmailAlreadyExistsException;
import com.dream_habitat.app.model.User;
import com.dream_habitat.app.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDTO addUser(User user) {
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            throw new EmailAlreadyExistsException("L'email est déjà utilisé : " + user.getEmail());
        }

        // Encode le mot de passe ici avant de sauvegarder
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);

        User savedUser = userRepository.save(user);
        return new UserDTO(savedUser.getId(), savedUser.getName(), savedUser.getEmail());
    }

    /**
     * Retrieves a user by their email address
     * @param email The email address of the user to retrieve
     * @return The user with the specified email address
     */
    public User getUserByEmail(String email){return userRepository.findUserByEmail(email);}

    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id).orElseThrow();
        return new UserDTO(user.getId(), user.getName(), user.getEmail());
    }
    
    public List<UserDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(user -> new UserDTO(user.getId(), user.getName(), user.getEmail()))
                .collect(Collectors.toList());
    }

    public UserDTO updateUser(Long id, UserCreateDTO userCreateDto) {
        User user = userRepository.findById(id).orElseThrow();
        user.setName(userCreateDto.getName());
        user.setEmail(userCreateDto.getEmail());
        User updatedUser = userRepository.save(user);
        return new UserDTO(updatedUser.getId(), updatedUser.getName(), updatedUser.getEmail());
    }
}

