package com.dream_habitat.app.controller;

import com.dream_habitat.app.dto.roomDtOS.RoomDTO;
import com.dream_habitat.app.dto.roomDtOS.RoomResponse;
import com.dream_habitat.app.dto.userDTOS.UserDTO;
import com.dream_habitat.app.model.Room;
import com.dream_habitat.app.model.User;
import com.dream_habitat.app.repository.RoomRepository;
import com.dream_habitat.app.service.RoomService;
import com.dream_habitat.app.service.UserService;
import com.dream_habitat.app.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

import static java.util.stream.Collectors.toList;
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
    @Autowired
    private RoomRepository roomRepository;

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

        RoomResponse roomResponse = RoomResponse
                .builder()
                .id(createdRoom.getId())
                .title(createdRoom.getTitle())
                .userOwner(UserDTO.builder()
                        .id(user.getId())
                        .email(user.getEmail())
                        .name(user.getName())
                        .build())
                .build();

        return ResponseEntity.status(HttpStatus.CREATED).body(roomResponse);
    }

    @GetMapping("/all")
    public ResponseEntity<List<RoomResponse>> getAllAlbums() {
        List<Room> rooms = roomService.getAllRooms();

        List<RoomResponse> roomResponses = rooms.stream()
                .map(room -> RoomResponse.builder()
                        .id(room.getId())
                        .title(room.getTitle())
                        .userOwner(UserDTO.builder()
                                .id(room.getOwner().getId())
                                .email(room.getOwner().getEmail())
                                .name(room.getOwner().getName())
                                .build())
                        .build())
                .toList();

        return ResponseEntity.ok(roomResponses);
    }



    @GetMapping("/{albumId}")
    public ResponseEntity<RoomResponse> getAlbumById(@PathVariable Long albumId) {
        // Récupérer l'objet Room
        Room room = roomService.getRoomById(albumId);

        if (room == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        RoomResponse roomResponse = RoomResponse.builder()
                .id(room.getId())
                .title(room.getTitle())
                .userOwner(UserDTO.builder()
                        .id(room.getOwner().getId())
                        .email(room.getOwner().getEmail())
                        .name(room.getOwner().getName())
                        .build())
                .build();

        return ResponseEntity.ok(roomResponse);
    }



}
