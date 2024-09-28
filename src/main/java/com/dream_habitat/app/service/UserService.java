package com.dream_habitat.app.service;


import com.dream_habitat.app.dto.UserCreateDTO;
import com.dream_habitat.app.dto.UserDTO;
import com.dream_habitat.app.exception.userException.EmailAlreadyExistsException;
import com.dream_habitat.app.model.User;
import com.dream_habitat.app.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


import java.util.Optional;

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


}

