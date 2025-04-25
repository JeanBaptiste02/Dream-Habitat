package com.dream_habitat.app.controller;

import com.dream_habitat.app.dto.roomDTOS.RoomDTO;
import com.dream_habitat.app.dto.roomDTOS.RoomResponse;
import com.dream_habitat.app.dto.userDTOS.UserDTO;
import com.dream_habitat.app.model.Room;
import com.dream_habitat.app.model.User;
import com.dream_habitat.app.service.RoomService;
import com.dream_habitat.app.service.UserService;
import com.dream_habitat.app.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * @class RoomController
 * @brief Controller for managing rooms (creation, retrieval, updating, and deletion).
 */
@RestController
@RequestMapping("api/room")
public class RoomController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private RoomService roomService;

    @Autowired
    private UserService userService;

    /**
     * @brief Creates a new room.
     * 
     * @param roomDTO The DTO (Data Transfer Object) containing room details.
     * 
     * @return ResponseEntity containing the created room and HTTP status 201 (CREATED) if successful.
     * @return ResponseEntity with HTTP status 400 if the request is invalid (e.g., missing parameters).
     * @return ResponseEntity with HTTP status 404 if the user is not found.
     */
    @PostMapping("/create")
    public ResponseEntity<RoomResponse> createAlbum(@RequestBody RoomDTO roomDTO) {
        if (roomDTO.getTitle() == null || roomDTO.getTitle().isEmpty()) {
            return ResponseEntity.badRequest().build(); // Bad Request with an empty response
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

    /**
     * @brief Retrieves all rooms.
     * 
     * @return ResponseEntity containing a list of RoomResponse objects with HTTP status 200 if successful.
     * @return ResponseEntity with HTTP status 404 if no rooms are found.
     */
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

    /**
     * @brief Retrieves a room by its ID.
     * 
     * @param albumId The ID of the room.
     * 
     * @return ResponseEntity containing the RoomResponse object with HTTP status 200 if found.
     * @return ResponseEntity with HTTP status 404 if the room is not found.
     */
    @GetMapping("/{albumId}")
    public ResponseEntity<RoomResponse> getAlbumById(@PathVariable Long albumId) {
        // Retrieve the Room object
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

    /**
     * @brief Retrieves all rooms associated with a user based on the authentication token.
     * 
     * @param token The authorization token of the user.
     * 
     * @return ResponseEntity containing a list of rooms associated with the user with HTTP status 200 if successful.
     * @return ResponseEntity with HTTP status 401 if the user is unauthorized (token missing or invalid).
     */
    @GetMapping("/user")
    public ResponseEntity<List<Room>> getAlbumsByUserId(@RequestHeader(value="Authorization") String token) {
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
            Long userId = jwtUtil.extractUser(token).getId();
            List<Room> albums = roomService.getRoomsByUserId(userId);
            return ResponseEntity.ok(albums);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }
}
