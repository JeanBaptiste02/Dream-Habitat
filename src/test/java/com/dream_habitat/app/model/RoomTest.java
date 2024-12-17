package com.dream_habitat.app.model;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class RoomTest {

    @Test
    void testDefaultConstructor() {
        Room room = new Room();
        assertNull(room.getId());
        assertNull(room.getTitle());
        assertNull(room.getOwner());
    }

    @Test
    void testParameterizedConstructor() {
        User user = new User();
        user.setId(1L);
        user.setEmail("test@example.com");

        Room room = new Room(1L, "Test Room", user);
        assertEquals(1L, room.getId());
        assertEquals("Test Room", room.getTitle());
        assertEquals(user, room.getOwner());
    }

    @Test
    void testSettersAndGetters() {
        Room room = new Room();
        room.setId(2L);
        room.setTitle("Updated Room");

        User user = new User();
        user.setId(2L);
        user.setEmail("owner@example.com");
        room.setOwner(user);

        assertEquals(2L, room.getId());
        assertEquals("Updated Room", room.getTitle());
        assertEquals(user, room.getOwner());
        assertEquals("owner@example.com", room.getOwner().getEmail());
    }

    @Test
    void testOwnerAssociation() {
        User owner = new User();
        owner.setId(3L);
        owner.setEmail("test@owner.com");

        Room room = new Room();
        room.setOwner(owner);

        assertNotNull(room.getOwner());
        assertEquals(3L, room.getOwner().getId());
        assertEquals("test@owner.com", room.getOwner().getEmail());
    }
}
