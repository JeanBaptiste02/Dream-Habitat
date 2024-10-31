package com.dream_habitat.app.dto.photoResultDTOS;

import com.dream_habitat.app.dto.photoDTOS.PhotoDTO;
import com.dream_habitat.app.model.Photo;
import com.dream_habitat.app.model.PhotoResult;
import com.dream_habitat.app.model.Room;
import com.dream_habitat.app.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

/**
 * Data Transfer Object (DTO) for representing photo information
 * @author Jean-Baptiste, Kamel, Victor
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PhotoResultDTO {

    private Long id;
    private String name;
    private String path;
    private String description;
    private LocalDateTime date;
    private Room room_id;
    private User owner_id;
    private PhotoDTO photo;

    /**
     * Constructs a PhotoDTO object from a Photo entity
     * @param photoResult The photo entity from which to construct the DTO
     */
    public PhotoResultDTO(final PhotoResult photoResult){
        this.id = photoResult.getId();
        this.name = photoResult.getName();
        this.path = photoResult.getPath();
        this.description = photoResult.getDescription();
        this.date = photoResult.getDate();
        this.room_id = photoResult.getRoom();
        this.owner_id = getOwner_id();
        this.photo = getPhoto();

    }
}
