package com.dream_habitat.app.dto.roomDTOS;


import com.dream_habitat.app.dto.userDTOS.UserDTO;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomResponse {
    private Long id;
    private String title;
    private UserDTO userOwner;

}
