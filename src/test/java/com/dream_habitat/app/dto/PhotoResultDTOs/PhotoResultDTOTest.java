package com.dream_habitat.app.dto.PhotoResultDTOs;


import com.dream_habitat.app.dto.photoResultDTOS.PhotoResultDTO;
import com.dream_habitat.app.model.Photo;
import com.dream_habitat.app.model.PhotoResult;
import com.dream_habitat.app.model.Room;
import com.dream_habitat.app.model.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

public class PhotoResultDTOTest {

    private PhotoResult photoResult;
    private PhotoResultDTO photoResultDTO;
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
        photoResult.setOwner(owner);
        photoResult.setPhoto(photo);

        photoResultDTO = new PhotoResultDTO(photoResult);
    }

    @Test
    public void testConstructor() {
        assertNotNull(photoResultDTO);
        assertEquals(1L, photoResultDTO.getId(), "L'ID de la photo ne correspond pas");
        assertEquals("Test Photo Result", photoResultDTO.getName(), "Le nom de la photo ne correspond pas");
        assertEquals("/path/to/photo.jpg", photoResultDTO.getPath(), "Le chemin de la photo ne correspond pas");
        assertEquals("Test Description", photoResultDTO.getDescription(), "La description de la photo ne correspond pas");
        assertNotNull(photoResultDTO.getDate(), "La date ne doit pas être nulle");
        assertEquals(room, photoResultDTO.getRoom_id(), "La chambre ne correspond pas");
        assertEquals(owner, photoResultDTO.getOwner_id(), "Le propriétaire ne correspond pas");
        assertEquals(photo, photoResultDTO.getPhoto(), "La photo ne correspond pas");
    }

    @Test
    public void testDtoConversion() {
        PhotoResultDTO dto = new PhotoResultDTO(photoResult);

        assertEquals(photoResult.getId(), dto.getId());
        assertEquals(photoResult.getName(), dto.getName());
        assertEquals(photoResult.getPath(), dto.getPath());
        assertEquals(photoResult.getDescription(), dto.getDescription());
        assertEquals(photoResult.getDate(), dto.getDate());
        assertEquals(photoResult.getRoom(), dto.getRoom_id());
        assertEquals(photoResult.getOwner(), dto.getOwner_id());
        assertEquals(photoResult.getPhoto(), dto.getPhoto());
    }
}
