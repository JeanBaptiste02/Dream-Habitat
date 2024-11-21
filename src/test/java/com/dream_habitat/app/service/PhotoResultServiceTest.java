package com.dream_habitat.app.service;

import com.dream_habitat.app.model.PhotoResult;
import com.dream_habitat.app.repository.PhotoResultRepository;
import com.dream_habitat.app.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
public class PhotoResultServiceTest {

    @Mock
    private PhotoResultRepository photoResultRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private PhotoResultService photoResultService;

    @Test
    public void testSavePhotoResult() {
        PhotoResult photoResult = new PhotoResult();

        photoResultService.savePhotoResult(photoResult);

        verify(photoResultRepository, times(1)).save(photoResult);
    }

    @Test
    public void testGetPhotosByRoomId() {
        Long roomId = 1L;
        List<PhotoResult> mockPhotoResults = Arrays.asList(new PhotoResult(), new PhotoResult());
        when(photoResultRepository.findByRoomId(roomId)).thenReturn(mockPhotoResults);

        List<PhotoResult> result = photoResultService.getPhotosByRoomId(roomId);

        assertNotNull(result);
        assertEquals(2, result.size());
    }

    @Test
    public void testGetPhotosByPhotoId() {
        Long photoId = 1L;
        PhotoResult mockPhotoResult = new PhotoResult();
        when(photoResultRepository.findByPhotoId(photoId)).thenReturn(mockPhotoResult);

        PhotoResult result = photoResultService.getPhotosByPhotoId(photoId);

        assertNotNull(result);
    }
}
