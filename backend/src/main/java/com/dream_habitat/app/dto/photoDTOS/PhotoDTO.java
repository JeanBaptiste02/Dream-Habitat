package com.dream_habitat.app.dto.photoDTOS;

import com.dream_habitat.app.model.Photo;
import com.dream_habitat.app.model.Room;
import com.dream_habitat.app.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

/**
 * Data Transfer Object (DTO) for representing photo information
 * @author Jean-Baptiste, Kamel, Victor, Mahdi
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PhotoDTO {

    private Long id;
    private String name;
    private String path;
    private String description;
    private LocalDateTime date;
    private Room room_id;
    private User owner_id;

    /**
     * Constructs a PhotoDTO object from a Photo entity
     * @param photo The photo entity from which to construct the DTO
     */
    public PhotoDTO(final Photo photo){
        this.id = photo.getId();
        this.name = photo.getName();
        this.path = photo.getPath();
        this.description = photo.getDescription();
        this.date = photo.getDate();
        this.room_id = photo.getRoom();
        this.owner_id = getOwner_id();
    }
}