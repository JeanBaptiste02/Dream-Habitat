package com.dream_habitat.app.dto;



import com.dream_habitat.app.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Data Transfer Object (DTO) for representing album information
 * @author Jean-Baptiste, Kamel, Victor, Mahdi
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomDTO {

    private Long id;
    private String title;
    private User owner;

    /**
     * Special constructor for the title attribute
     * @param title
     */
    public RoomDTO(String title) {
        this.title = title;
    }


    /**
     * Constructs an AlbumDTO object
     * @param email The Album entity from which to construct the DTO
     */
    public RoomDTO(String email, Long id) {
        this.id = id;
        this.owner = new User();
        this.owner.setEmail(email);
    }
}

