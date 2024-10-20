package com.dream_habitat.app.controller;

import com.dream_habitat.app.dto.roomDtOS.RoomDTO;
import com.dream_habitat.app.dto.roomDtOS.RoomResponse;
import com.dream_habitat.app.model.Room;
import com.dream_habitat.app.model.User;
import com.dream_habitat.app.service.RoomService;
import com.dream_habitat.app.service.UserService;
import com.dream_habitat.app.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

import static org.springframework.data.repository.util.ClassUtils.ifPresent;

@RestController
@RequestMapping("api/room")
public class RoomController {
    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private RoomService roomService;

    @Autowired
    UserService userService;

    /**
     * Creates a new album
     * @param roomDTO The DTO (Data Transfer Object) containing album details
     * @return ResponseEntity with the created rooms and HTTP status 201 (CREATED)
     */
    @PostMapping("/create")
    public ResponseEntity<RoomResponse> createAlbum(@RequestBody RoomDTO roomDTO) {
        if (roomDTO.getTitle() == null || roomDTO.getTitle().isEmpty()) {
            return ResponseEntity.badRequest().build(); // Bad Request avec une réponse vide
        }

        Optional<User> userOptional = userService.getUserByEmail(roomDTO.getOwner().getEmail());

        if (!userOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        User user = userOptional.get();

        Room createdRoom = roomService.createRoom(roomDTO);

        RoomResponse roomResponse = RoomResponse.builder()
                .id(createdRoom.getId())
                .title(createdRoom.getTitle())
                .email(user.getEmail())
                .name(user.getName())
                .build();

        return ResponseEntity.status(HttpStatus.CREATED).body(roomResponse);
    }


}
