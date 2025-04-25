package com.dream_habitat.app.repository;

import com.dream_habitat.app.model.PhotoResult;
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
public class PhotoResultRepositoryTest {

    @Mock
    private PhotoResultRepository photoResultRepository;

    @Test
    public void testFindPhotoResultById() {
        Long id = 1L;
        PhotoResult mockPhotoResult = new PhotoResult();
        when(photoResultRepository.findPhotoResultById(id)).thenReturn(mockPhotoResult);

        PhotoResult result = photoResultRepository.findPhotoResultById(id);

        assertNotNull(result);
    }

    @Test
    public void testFindByRoomId() {
        Long roomId = 1L;
        List<PhotoResult> mockPhotoResults = Arrays.asList(new PhotoResult(), new PhotoResult());
        when(photoResultRepository.findByRoomId(roomId)).thenReturn(mockPhotoResults);

        List<PhotoResult> result = photoResultRepository.findByRoomId(roomId);

        assertNotNull(result);
        assertEquals(2, result.size());
    }

    @Test
    public void testFindByPhotoId() {
        Long photoId = 1L;
        PhotoResult mockPhotoResult = new PhotoResult();
        when(photoResultRepository.findByPhotoId(photoId)).thenReturn(mockPhotoResult);

        PhotoResult result = photoResultRepository.findByPhotoId(photoId);

        assertNotNull(result);
    }
}
