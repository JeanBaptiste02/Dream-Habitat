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
     * @return ResponseEntity with the created album and HTTP status 201 (CREATED)
     */
    @PostMapping("/create")
    public ResponseEntity<RoomResponse> createAlbum(@RequestBody RoomDTO roomDTO) {
        if (roomDTO.getTitle() == null || roomDTO.getTitle().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        Optional<User> userOptional = userService.getUserByEmail(roomDTO.getOwner().getEmail());

        if (userOptional.isPresent()) {
            User user = userOptional.get();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new RoomResponse());
        }

        Room createdRoom = roomService.createRoom(roomDTO);
        RoomResponse roomResponse = new RoomResponse(createdRoom.getId(),createdRoom.getTitle(),createdRoom.getOwner().getEmail(),createdRoom.getOwner().getName());
        return ResponseEntity.status(HttpStatus.CREATED).body(roomResponse);
    }

}
