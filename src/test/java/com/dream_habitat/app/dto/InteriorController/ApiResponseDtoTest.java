package com.dream_habitat.app.dto.InteriorController;

import org.junit.jupiter.api.Test;

import com.dream_habitat.app.dto.InteriorController.ApiResponseDto;

import java.util.Arrays;
import static org.junit.jupiter.api.Assertions.*;

class ApiResponseDtoTest {

    @Test
    void testApiResponseDtoConstruction() {
        ApiResponseDto.FileDetailDto fileDetail = ApiResponseDto.FileDetailDto.builder()
                .url("http://example.com/file.jpg")
                .filename("file.jpg")
                .terms("some terms")
                .negativeTerms("some negative terms")
                .fixFaces(true)
                .dimension("1024x768")
                .original("http://example.com/original.jpg")
                .build();

        ApiResponseDto apiResponseDto = ApiResponseDto.builder()
                .files(Arrays.asList(fileDetail))
                .failed(Arrays.asList(new Object()))
                .queued(Arrays.asList(new Object()))
                .processing(Arrays.asList(new Object()))
                .finished(true)
                .queueCount(10)
                .conversion(5)
                .errors(Arrays.asList(new Object()))
                .status("success")
                .build();

        assertNotNull(apiResponseDto);
        assertNotNull(apiResponseDto.getFiles());
        assertEquals(1, apiResponseDto.getFiles().size());
        assertEquals("http://example.com/file.jpg", apiResponseDto.getFiles().get(0).getUrl());
        assertEquals("file.jpg", apiResponseDto.getFiles().get(0).getFilename());
        assertTrue(apiResponseDto.getFiles().get(0).isFixFaces());
        assertEquals("1024x768", apiResponseDto.getFiles().get(0).getDimension());

        assertEquals("success", apiResponseDto.getStatus());
        assertTrue(apiResponseDto.isFinished());
        assertEquals(10, apiResponseDto.getQueueCount());
        assertEquals(5, apiResponseDto.getConversion());
        assertNotNull(apiResponseDto.getFailed());
        assertNotNull(apiResponseDto.getQueued());
        assertNotNull(apiResponseDto.getProcessing());
        assertNotNull(apiResponseDto.getErrors());
    }

    @Test
    void testApiResponseDtoEmptyConstructor() {
        ApiResponseDto apiResponseDto = new ApiResponseDto(null, null, null, null, false, 0, 0, null, null);

        assertNull(apiResponseDto.getFiles());
        assertNull(apiResponseDto.getFailed());
        assertNull(apiResponseDto.getQueued());
        assertNull(apiResponseDto.getProcessing());
        assertFalse(apiResponseDto.isFinished());
        assertEquals(0, apiResponseDto.getQueueCount());
        assertEquals(0, apiResponseDto.getConversion());
        assertNull(apiResponseDto.getErrors());
        assertNull(apiResponseDto.getStatus());
    }
}
