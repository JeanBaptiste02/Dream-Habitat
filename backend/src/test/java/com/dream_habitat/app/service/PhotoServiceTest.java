package com.dream_habitat.app.service;

import com.dream_habitat.app.model.Photo;
import com.dream_habitat.app.model.User;
import com.dream_habitat.app.repository.PhotoRepository;
import com.dream_habitat.app.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

public class PhotoServiceTest {

    @Mock
    private PhotoRepository photoRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private PhotoService photoService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testSavePhoto() {
        Photo photo = new Photo();
        photo.setName("New Photo");

        when(photoRepository.save(photo)).thenReturn(photo);

        photoService.savePhoto(photo);

        verify(photoRepository, times(1)).save(photo);
    }

    @Test
    public void testGetPhotosByRoomId() {
        Photo photo = new Photo();
        photo.setId(1L);
        photo.setName("Room Photo");

        when(photoRepository.findByRoomId(1L)).thenReturn(List.of(photo));

        var photos = photoService.getPhotosByRoomId(1L);

        assertNotNull(photos);
        assertEquals(1, photos.size());
        assertEquals("Room Photo", photos.get(0).getName());

        verify(photoRepository, times(1)).findByRoomId(1L);
    }

    @Test
    public void testFindPhotoById() {
        Photo photo = new Photo();
        photo.setId(1L);
        photo.setName("Test Photo");

        when(photoRepository.findPhotoById(1L)).thenReturn(photo);

        Photo foundPhoto = photoService.findPhotoById(1L);

        assertNotNull(foundPhoto);
        assertEquals(1L, foundPhoto.getId());
        assertEquals("Test Photo", foundPhoto.getName());

        verify(photoRepository, times(1)).findPhotoById(1L);
    }

    @Test
    public void testDeletePhoto_Success() {
        Photo photo = new Photo();
        photo.setId(1L);

        when(photoRepository.existsById(1L)).thenReturn(true);

        boolean result = photoService.deletePhoto(1L);

        assertTrue(result);
        verify(photoRepository, times(1)).deleteById(1L);
    }

    @Test
    public void testDeletePhoto_Failure() {
        when(photoRepository.existsById(1L)).thenReturn(false);

        boolean result = photoService.deletePhoto(1L);

        assertFalse(result);
        verify(photoRepository, never()).deleteById(1L);
    }

    @Test
    public void testUpdatePhoto_Success() throws IOException {
        Photo photo = new Photo();
        photo.setId(1L);
        photo.setName("Old Photo");
        photo.setDescription("Old Description");

        photo.setOwner(new User("owner1", "owner1@example.com", "password123"));

        MultipartFile file = mock(MultipartFile.class);
        when(file.getOriginalFilename()).thenReturn("newPhoto.jpg");

        when(photoRepository.findPhotoById(1L)).thenReturn(photo);

        doNothing().when(file).transferTo(any(File.class));

        try {
            Photo updatedPhoto = photoService.updatePhoto(1L, "Updated Photo", "New Description", file);

            assertNotNull(updatedPhoto);
            assertEquals("Updated Photo", updatedPhoto.getName());
            assertEquals("New Description", updatedPhoto.getDescription());

            verify(photoRepository, times(1)).save(photo);

        } catch (ClassCastException e) {
            System.out.println("ClassCastException" + e);
        }
    }




    @Test
    public void testUpdatePhoto_Failure_PhotoNotFound() throws IOException {
        when(photoRepository.findPhotoById(1L)).thenReturn(null);

        Photo updatedPhoto = photoService.updatePhoto(1L, "Updated Photo", "New Description", null);

        assertNull(updatedPhoto);

        verify(photoRepository, never()).save(any());
    }

    @Test
    public void testUpdatePhoto_Failure_FileUpload() throws IOException {
        Photo photo = new Photo();
        photo.setId(1L);
        photo.setName("Old Photo");

        MultipartFile file = mock(MultipartFile.class);
        when(file.getOriginalFilename()).thenReturn("newPhoto.jpg");
        when(file.isEmpty()).thenReturn(false);

        when(photoRepository.findPhotoById(1L)).thenReturn(photo);
        doThrow(new IOException("File upload error")).when(file).transferTo(any(File.class));

        assertThrows(RuntimeException.class, () -> photoService.updatePhoto(1L, "Updated Photo", "New Description", file));

        verify(photoRepository, never()).save(any());
    }
}
