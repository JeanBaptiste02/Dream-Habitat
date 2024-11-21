package com.dream_habitat.app.controller;

import com.dream_habitat.app.dto.userDTOS.UserDTO;
import com.dream_habitat.app.model.Photo;
import com.dream_habitat.app.model.Room;
import com.dream_habitat.app.model.User;
import com.dream_habitat.app.service.PhotoService;
import com.dream_habitat.app.service.RoomService;
import com.dream_habitat.app.service.UserService;
import com.dream_habitat.app.utils.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.autoconfigure.ssl.SslProperties.Bundles.Watch.File;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class PhotoControllerTest {

    @InjectMocks
    private PhotoController photoController;

    @Mock
    private PhotoService photoService;

    @Mock
    private UserService userService;

    @Mock
    private RoomService roomService;

    @Mock
    private JwtUtil jwtUtil;

    @Mock
    private MultipartFile file;

    private User testUser;
    private UserDTO testUserDTO;
    private Room testRoom;
    private Photo testPhoto;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        testUser = new User();
        testUser.setId(1L);
        testUser.setName("John Doe");
        testUser.setEmail("john.doe@example.com");

        testUserDTO = new UserDTO();
        testUserDTO.setId(1L);
        testUserDTO.setName("John Doe");
        testUserDTO.setEmail("john.doe@example.com");

        testRoom = new Room();
        testRoom.setId(1L);
        testRoom.setTitle("Living Room");

        testPhoto = new Photo();
        testPhoto.setId(1L);
        testPhoto.setName("test.jpg");
        testPhoto.setDescription("Test photo description");
        testPhoto.setDate(LocalDateTime.now());
        testPhoto.setPath("/photosData/John Doe/test.jpg");
        testPhoto.setRoom(testRoom);
        testPhoto.setOwner(testUser);
    }

    @Test
    void testUploadPhoto_Success() throws Exception {
        String token = "Bearer validToken";
        String extractedToken = "validToken";

        // Mock du token JWT
        when(jwtUtil.extractUser(extractedToken)).thenReturn(testUser);

        // Mock des services utilisateur
        when(userService.getUserById(testUser.getId())).thenReturn(testUserDTO);
        when(userService.getUserByEmail(testUser.getEmail())).thenReturn(Optional.of(testUser));

        // Simulation de fichier multipart pour éviter l'exception de segment null
        when(file.getOriginalFilename()).thenReturn("test.jpg");
        when(file.isEmpty()).thenReturn(false);

        // Mock du transfert du fichier (simulation de transfert réussi)
        doNothing().when(file).transferTo(any(Path.class));

        // Appel du contrôleur
        ResponseEntity<String> response = photoController.uploadPhoto(
                file, "test.jpg", "Description", testRoom, token);

        // Assertions
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Photo uploaded successfully", response.getBody());
        verify(photoService, times(1)).savePhoto(any(Photo.class));
    }

    @Test
    void testUploadPhoto_Unauthorized() {
        String token = null;

        ResponseEntity<String> response = photoController.uploadPhoto(
                file, "test.jpg", "Description", testRoom, token);

        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
        assertEquals("Unauthorized", response.getBody());
        verify(photoService, never()).savePhoto(any(Photo.class));
    }

    @Test
    void testGetPhotosByRoomId() {
        List<Photo> photos = new ArrayList<>();
        photos.add(testPhoto);

        when(photoService.getPhotosByRoomId(1L)).thenReturn(photos);

        ResponseEntity<List<Photo>> response = photoController.getPhotosByRoomId(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(1, response.getBody().size());
        assertEquals("test.jpg", response.getBody().get(0).getName());
    }

    @Test
    void testGetPhotoById_Found() {
        when(photoService.findPhotoById(1L)).thenReturn(testPhoto);

        ResponseEntity<Photo> response = photoController.getPhotoById(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("test.jpg", response.getBody().getName());
    }

    @Test
    void testGetPhotoById_NotFound() {
        when(photoService.findPhotoById(1L)).thenReturn(null);

        ResponseEntity<Photo> response = photoController.getPhotoById(1L);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    void testDeletePhoto_Success() {
        when(photoService.deletePhoto(1L)).thenReturn(true);

        ResponseEntity<String> response = photoController.deletePhoto(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Photo deleted successfully", response.getBody());
    }

    @Test
    void testDeletePhoto_NotFound() {
        when(photoService.deletePhoto(1L)).thenReturn(false);

        ResponseEntity<String> response = photoController.deletePhoto(1L);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("Photo not found", response.getBody());
    }

    @Test
    void testUpdatePhoto_Success() throws Exception {
        when(photoService.updatePhoto(anyLong(), anyString(), anyString(), any(MultipartFile.class)))
                .thenReturn(testPhoto);

        ResponseEntity<Photo> response = photoController.updatePhoto(
                1L, "newName", "newDescription", file);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("test.jpg", response.getBody().getName());
    }

    @Test
    void testUpdatePhoto_NotFound() throws Exception {
        when(photoService.updatePhoto(anyLong(), anyString(), anyString(), any(MultipartFile.class)))
                .thenReturn(null);

        ResponseEntity<Photo> response = photoController.updatePhoto(
                1L, "newName", "newDescription", file);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }
}
