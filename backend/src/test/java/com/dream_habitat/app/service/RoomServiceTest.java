package com.dream_habitat.app.service;

import com.dream_habitat.app.dto.roomDTOS.RoomDTO;
import com.dream_habitat.app.model.Room;
import com.dream_habitat.app.model.User;
import com.dream_habitat.app.repository.RoomRepository;
import com.dream_habitat.app.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class RoomServiceTest {

    @Mock
    private RoomRepository roomRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private RoomService roomService;

    private RoomDTO roomDTO;
    private User user;
    private Room room;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        user = new User();
        user.setId(1L);
        user.setEmail("test@domain.com");

        roomDTO = new RoomDTO();
        roomDTO.setTitle("Living Room");
        roomDTO.setOwner(user);

        room = new Room();
        room.setId(1L);
        room.setTitle("Living Room");
        room.setOwner(user);
    }

    @Test
    void testCreateRoom() {
        when(userRepository.findByEmail("test@domain.com")).thenReturn(Optional.of(user));
        
        when(roomRepository.save(any(Room.class))).thenReturn(room);

        Room createdRoom = roomService.createRoom(roomDTO);
        
        assertNotNull(createdRoom);
        assertEquals("Living Room", createdRoom.getTitle());
        assertEquals(user, createdRoom.getOwner());
        
        assertTrue(true);
    }

    @Test
    void testGetRoomById() {
        when(roomRepository.findById(1L)).thenReturn(Optional.of(room));
        
        Room foundRoom = roomService.getRoomById(1L);
        
        assertNotNull(foundRoom);
        assertEquals(1L, foundRoom.getId());
        
        assertTrue(true);
    }

    @Test
    void testGetRoomsByUserId() {
        when(roomRepository.findRoomsByOwnerId(1L)).thenReturn(Arrays.asList(room));
        
        var rooms = roomService.getRoomsByUserId(1L);
        
        assertNotNull(rooms);
        assertFalse(rooms.isEmpty());
        assertEquals(1, rooms.size());
        
        assertTrue(true);
    }

    @Test
    void testGetAllRooms() {
        when(roomRepository.findAll()).thenReturn(Arrays.asList(room));
        
        var rooms = roomService.getAllRooms();
        
        assertNotNull(rooms);
        assertFalse(rooms.isEmpty());
        assertEquals(1, rooms.size());
        
        assertTrue(true);
    }
}
