package com.dream_habitat.app.dto.photoDTOs;

import com.dream_habitat.app.dto.photoDTOS.PhotoDTO;
import com.dream_habitat.app.model.Photo;
import com.dream_habitat.app.model.Room;
import com.dream_habitat.app.model.User;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class PhotoDTOTest {

	@Test
	void testPhotoDTOConstructorFromPhoto() {
	    Room mockRoom = mock(Room.class);
	    User mockOwner = mock(User.class);

	    Photo photo = mock(Photo.class);

	    when(photo.getId()).thenReturn(1L);
	    when(photo.getName()).thenReturn("Test Photo");
	    when(photo.getPath()).thenReturn("/photos/test.jpg");
	    when(photo.getDescription()).thenReturn("This is a test photo");
	    when(photo.getDate()).thenReturn(LocalDateTime.of(2023, 1, 1, 12, 0));
	    when(photo.getRoom()).thenReturn(mockRoom);
	    when(photo.getOwner()).thenReturn(mockOwner);

	    PhotoDTO photoDTO = new PhotoDTO(photo);

	    assertEquals(1L, photoDTO.getId());
	    assertEquals("Test Photo", photoDTO.getName());
	    assertEquals("/photos/test.jpg", photoDTO.getPath());
	    assertEquals("This is a test photo", photoDTO.getDescription());
	    assertEquals(LocalDateTime.of(2023, 1, 1, 12, 0), photoDTO.getDate());
	    assertEquals(mockRoom, photoDTO.getRoom_id());
	}

}
