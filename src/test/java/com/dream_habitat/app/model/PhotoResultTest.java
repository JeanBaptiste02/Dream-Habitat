package com.dream_habitat.app.model;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

public class PhotoResultTest {

    private PhotoResult photoResult;
    private Photo photo;
    private Room room;
    private User owner;

    @BeforeEach
    public void setUp() {
        photo = new Photo();
        photo.setId(1L);
        photo.setName("Test Photo");
        photo.setPath("/path/to/photo.jpg");
        photo.setDescription("Test Description");

        room = new Room();
        room.setId(1L);
        room.setTitle("Living Room");

        owner = new User("owner1", "owner1@example.com", "password123");

        photoResult = new PhotoResult();
        photoResult.setId(1L);
        photoResult.setName("Test Photo Result");
        photoResult.setPath("/path/to/photo.jpg");
        photoResult.setDescription("Test Description");
        photoResult.setDate(LocalDateTime.now());
        photoResult.setRoom(room);
        photoResult.setPhoto(photo);
        photoResult.setOwner(owner);
    }

    @Test
    public void testGettersAndSetters() {
        assertNotNull(photoResult);
        assertEquals(1L, photoResult.getId(), "L'ID de la photo ne correspond pas");
        assertEquals("Test Photo Result", photoResult.getName(), "Le nom de la photo ne correspond pas");
        assertEquals("/path/to/photo.jpg", photoResult.getPath(), "Le chemin de la photo ne correspond pas");
        assertEquals("Test Description", photoResult.getDescription(), "La description de la photo ne correspond pas");
        assertNotNull(photoResult.getDate(), "La date ne doit pas être nulle");
        assertEquals(room, photoResult.getRoom(), "La chambre ne correspond pas");
        assertEquals(photo, photoResult.getPhoto(), "La photo ne correspond pas");
        assertEquals(owner, photoResult.getOwner(), "Le propriétaire ne correspond pas");
    }

    @Test
    public void testPhotoResultInitialization() {
        assertNotNull(photoResult);
        assertEquals(1L, photoResult.getId());
        assertEquals("Test Photo Result", photoResult.getName());
        assertEquals("/path/to/photo.jpg", photoResult.getPath());
        assertEquals("Test Description", photoResult.getDescription());
        assertNotNull(photoResult.getDate());
        assertEquals(room, photoResult.getRoom());
        assertEquals(photo, photoResult.getPhoto());
        assertEquals(owner, photoResult.getOwner());
    }
    
    @Test
    public void testPhotoResultWithConstructor() {
        PhotoResult result = new PhotoResult(1L, "Test Photo Result", "/path/to/photo.jpg", "Test Description", LocalDateTime.now(), room, photo, owner);
        assertNotNull(result);
        assertEquals("Test Photo Result", result.getName());
        assertEquals("/path/to/photo.jpg", result.getPath());
        assertEquals("Test Description", result.getDescription());
        assertNotNull(result.getDate());
        assertEquals(room, result.getRoom());
        assertEquals(photo, result.getPhoto());
        assertEquals(owner, result.getOwner());
    }
}
