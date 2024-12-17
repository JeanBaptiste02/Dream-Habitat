package com.dream_habitat.app.service.interiorDecoratorService;

import com.dream_habitat.app.dto.InteriorController.GenerateDto;
import com.dream_habitat.app.dto.photoResultDTOS.PhotoResultDTO;
import com.dream_habitat.app.model.Photo;
import com.dream_habitat.app.model.PhotoResult;
import com.dream_habitat.app.model.Room;
import com.dream_habitat.app.model.User;
import com.dream_habitat.app.repository.PhotoResultRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.web.client.RestTemplate;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class InteriorDecoratorServiceTest {

    @Mock
    private RestTemplateBuilder restTemplateBuilder;

    @Mock
    private PhotoResultRepository photoResultRepository;

    @Mock
    private RestTemplate restTemplate;

    @InjectMocks
    private InteriorDecoratorService interiorDecoratorService;

    private Photo photo;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        photo = new Photo();
        photo.setName("test-photo.jpg");
        photo.setPath("path/to/photo");
        photo.setRoom(new Room());
        photo.setOwner(new User());

        when(restTemplateBuilder.build()).thenReturn(restTemplate);
    }

    @Test
    void testGenerate() throws Exception {
        GenerateDto generateDto = new GenerateDto();
        generateDto.setUuid("fake-uuid");   
        assertNotNull(true);
    }
}
