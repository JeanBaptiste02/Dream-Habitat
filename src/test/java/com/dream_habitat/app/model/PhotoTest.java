package com.dream_habitat.app.model;

import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;

class PhotoTest {

    @Test
    void testDefaultConstructor() {
        Photo photo = new Photo();

        assertNull(photo.getId());
        assertNull(photo.getName());
        assertNull(photo.getPath());
        assertNull(photo.getDescription());
        assertNull(photo.getDate());
        assertNull(photo.getRoom());
        assertNull(photo.getOwner());
    }

    @Test
    void testParameterizedConstructor() {
        Room mockRoom = mock(Room.class);
        User mockOwner = mock(User.class);

        String name = "Sample Photo";
        String path = "/images/sample.jpg";
        String description = "This is a sample photo";
        LocalDateTime date = LocalDateTime.of(2023, 11, 20, 15, 0);

        Photo photo = new Photo(name, path, description, date, mockRoom, mockOwner);

        assertNull(photo.getId());
        assertEquals(name, photo.getName());
        assertEquals(path, photo.getPath());
        assertEquals(description, photo.getDescription());
        assertEquals(date, photo.getDate());
        assertEquals(mockRoom, photo.getRoom());
        assertEquals(mockOwner, photo.getOwner());
    }

    @Test
    void testSettersAndGetters() {
        Room mockRoom = mock(Room.class);
        User mockOwner = mock(User.class);

        Photo photo = new Photo();

        Long id = 1L;
        String name = "Test Photo";
        String path = "/photos/test.jpg";
        String description = "This is a test photo";
        LocalDateTime date = LocalDateTime.of(2023, 1, 1, 12, 0);

        photo.setId(id);
        photo.setName(name);
        photo.setPath(path);
        photo.setDescription(description);
        photo.setDate(date);
        photo.setRoom(mockRoom);
        photo.setOwner(mockOwner);

        assertEquals(id, photo.getId());
        assertEquals(name, photo.getName());
        assertEquals(path, photo.getPath());
        assertEquals(description, photo.getDescription());
        assertEquals(date, photo.getDate());
        assertEquals(mockRoom, photo.getRoom());
        assertEquals(mockOwner, photo.getOwner());
    }

    @Test
    void testOwnerSetterAndGetter() {
        User mockOwner = mock(User.class);

        Photo photo = new Photo();

        photo.setOwner(mockOwner);
        assertEquals(mockOwner, photo.getOwner());
    }
}