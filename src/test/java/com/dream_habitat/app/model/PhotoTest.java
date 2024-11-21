package com.dream_habitat.app.model;

import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;

class PhotoTest {

    @Test
    void testDefaultConstructor() {
        // Creating an empty Photo object using the default constructor
        Photo photo = new Photo();

        // Assertions to verify the default constructor
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
        // Mocking dependencies
        Room mockRoom = mock(Room.class);
        User mockOwner = mock(User.class);

        // Setting up data
        String name = "Sample Photo";
        String path = "/images/sample.jpg";
        String description = "This is a sample photo";
        LocalDateTime date = LocalDateTime.of(2023, 11, 20, 15, 0);

        // Creating a Photo object using the parameterized constructor
        Photo photo = new Photo(name, path, description, date, mockRoom, mockOwner);

        // Assertions to verify the parameterized constructor
        assertNull(photo.getId()); // ID should not be set by the constructor
        assertEquals(name, photo.getName());
        assertEquals(path, photo.getPath());
        assertEquals(description, photo.getDescription());
        assertEquals(date, photo.getDate());
        assertEquals(mockRoom, photo.getRoom());
        assertEquals(mockOwner, photo.getOwner());
    }

    @Test
    void testSettersAndGetters() {
        // Mocking dependencies
        Room mockRoom = mock(Room.class);
        User mockOwner = mock(User.class);

        // Creating a Photo object
        Photo photo = new Photo();

        // Setting up data
        Long id = 1L;
        String name = "Test Photo";
        String path = "/photos/test.jpg";
        String description = "This is a test photo";
        LocalDateTime date = LocalDateTime.of(2023, 1, 1, 12, 0);

        // Using setters to set data
        photo.setId(id);
        photo.setName(name);
        photo.setPath(path);
        photo.setDescription(description);
        photo.setDate(date);
        photo.setRoom(mockRoom);
        photo.setOwner(mockOwner);

        // Assertions to verify the setters and getters
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
        // Mocking User
        User mockOwner = mock(User.class);

        // Creating a Photo object
        Photo photo = new Photo();

        // Setting and getting the owner
        photo.setOwner(mockOwner);
        assertEquals(mockOwner, photo.getOwner());
    }
}