package com.dream_habitat.app.dto.roomDTOs;

import com.dream_habitat.app.dto.roomDTOS.RoomDTO;
import com.dream_habitat.app.model.User;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class RoomDTOTest {

    @Test
    void testDefaultConstructor() {
        RoomDTO roomDTO = new RoomDTO();
        assertNull(roomDTO.getId());
        assertNull(roomDTO.getTitle());
        assertNull(roomDTO.getOwner());
    }

    @Test
    void testAllArgsConstructor() {
        User user = new User();
        user.setEmail("test@example.com");

        RoomDTO roomDTO = new RoomDTO(1L, "Test Room", user);
        assertEquals(1L, roomDTO.getId());
        assertEquals("Test Room", roomDTO.getTitle());
        assertEquals("test@example.com", roomDTO.getOwner().getEmail());
    }

    @Test
    void testTitleConstructor() {
        RoomDTO roomDTO = new RoomDTO("Test Room");
        assertNull(roomDTO.getId());
        assertEquals("Test Room", roomDTO.getTitle());
        assertNull(roomDTO.getOwner());
    }

    @Test
    void testEmailAndIdConstructor() {
        RoomDTO roomDTO = new RoomDTO("test@example.com", 1L);
        assertEquals(1L, roomDTO.getId());
        assertNotNull(roomDTO.getOwner());
        assertEquals("test@example.com", roomDTO.getOwner().getEmail());
    }

    @Test
    void testSettersAndGetters() {
        RoomDTO roomDTO = new RoomDTO();
        roomDTO.setId(1L);
        roomDTO.setTitle("Updated Room");
        User user = new User();
        user.setEmail("new@example.com");
        roomDTO.setOwner(user);

        assertEquals(1L, roomDTO.getId());
        assertEquals("Updated Room", roomDTO.getTitle());
        assertEquals("new@example.com", roomDTO.getOwner().getEmail());
    }
}
