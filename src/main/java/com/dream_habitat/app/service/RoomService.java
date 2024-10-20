package com.dream_habitat.app.service;

import com.dream_habitat.app.dto.roomDtOS.RoomDTO;
import com.dream_habitat.app.model.Room;
import com.dream_habitat.app.model.User;
import com.dream_habitat.app.repository.RoomRepository;
import com.dream_habitat.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoomService {
    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private UserRepository userRepository;

    /**
     * Creates a new album
     * @param roomDTO The DTO containing album details
     * @return The created album
     */
    public Room createRoom(RoomDTO roomDTO) {
        Optional<User> user = userRepository.findByEmail(roomDTO.getOwner().getEmail());
        if (user.isEmpty()) {
            throw new RuntimeException("User not found with name: " + roomDTO.getOwner().getEmail());
        }
        Room room = new Room();
        room.setTitle(roomDTO.getTitle());
        room.setOwner(user.orElse(null));
        return roomRepository.save(room);
    }

    /**
     * Retrieves an album by its ID
     * @param albumId The album with the specified ID
     * @return The album with the specified ID
     * @throws RuntimeException if no album is found with the given ID
     */
    public Room getRoomById(Long albumId) {
        return roomRepository.findById(albumId)
                .orElseThrow(() -> new RuntimeException("Album not found with ID: " + albumId));
    }

    /**
     * Retrieves all albums associated with a specific user ID
     * @param userId The ID of the user
     * @return A list of albums associated with the user
     */
    public List<Room> getRoomsByUserId(Long userId) {
        return roomRepository.findRoomsByOwnerId(userId);
    }

    /**
     * Retrieves all albums
     * @return A list of all albums
     */
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }
}
