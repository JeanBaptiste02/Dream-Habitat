package com.dream_habitat.app.dto.roomDtOS;


import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomResponse {
    private Long id;
    private String title;
    private String name;
    private String email;

}
