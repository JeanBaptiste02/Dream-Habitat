package com.dream_habitat.app.service;

import com.dream_habitat.app.dto.RoomDTO;
import com.dream_habitat.app.model.Room;
import com.dream_habitat.app.model.User;
import com.dream_habitat.app.repository.RoomRepository;
import com.dream_habitat.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        User user = userRepository.findUserByEmail(roomDTO.getOwner().getEmail());
        if (user == null) {
            throw new RuntimeException("User not found with name: " + roomDTO.getOwner().getEmail());
        }
        Room room = new Room();
        room.setTitle(roomDTO.getTitle());
        room.setOwner(user);
        return roomRepository.save(room);
    }
}
