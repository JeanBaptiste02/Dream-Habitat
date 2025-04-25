package com.dream_habitat.app.controller;

import com.dream_habitat.app.dto.roomDTOS.RoomDTO;
import com.dream_habitat.app.dto.roomDTOS.RoomResponse;
import com.dream_habitat.app.model.Room;
import com.dream_habitat.app.model.User;
import com.dream_habitat.app.service.RoomService;
import com.dream_habitat.app.service.UserService;
import com.dream_habitat.app.utils.JwtUtil;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class RoomControllerTest {

    @Mock
    private JwtUtil jwtUtil;

    @Mock
    private RoomService roomService;

    @Mock
    private UserService userService;

    @InjectMocks
    private RoomController roomController;

    public RoomControllerTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateAlbum() {
        RoomDTO roomDTO = new RoomDTO();
        roomDTO.setTitle("Test Room");
        User owner = new User();
        owner.setId(1L);
        owner.setEmail("test@example.com");
        roomDTO.setOwner(owner); // Ensure owner is not null

        when(userService.getUserByEmail(anyString())).thenReturn(Optional.of(owner));
        when(roomService.createRoom(any(RoomDTO.class))).thenReturn(new Room());

        ResponseEntity<RoomResponse> response = roomController.createAlbum(roomDTO);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        verify(roomService, times(1)).createRoom(roomDTO);
    }

    @Test
    void testGetAllAlbums() {
        when(roomService.getAllRooms()).thenReturn(Collections.emptyList());

        ResponseEntity<List<RoomResponse>> response = roomController.getAllAlbums();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(0, response.getBody().size());
    }

    @Test
    void testGetAlbumById() {
        Room room = new Room();
        room.setId(1L);
        room.setTitle("Test Room");
        User user = new User();
        user.setId(1L);
        user.setEmail("test@example.com");
        room.setOwner(user);

        when(roomService.getRoomById(1L)).thenReturn(room);

        ResponseEntity<RoomResponse> response = roomController.getAlbumById(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Test Room", response.getBody().getTitle());
    }

    @Test
    void testGetAlbumsByUserId() {
        when(jwtUtil.extractUser(anyString())).thenReturn(new User());
        when(roomService.getRoomsByUserId(anyLong())).thenReturn(Collections.emptyList());

        ResponseEntity<List<Room>> response = roomController.getAlbumsByUserId("Bearer testToken");

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(0, response.getBody().size());
    }
}