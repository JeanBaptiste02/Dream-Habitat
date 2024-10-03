package com.dream_habitat.app.repository;


import com.dream_habitat.app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    /**
     * Retrieves a user by their email address
     * @param email The email address of the user
     * @return The user with the specified email address, or null if not found
     */
    User findUserByEmail(String email);
}

