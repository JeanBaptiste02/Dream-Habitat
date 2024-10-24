package com.dream_habitat.app.service;

import com.dream_habitat.app.model.Photo;
import com.dream_habitat.app.model.Room;
import com.dream_habitat.app.repository.PhotoRepository;
import com.dream_habitat.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PhotoService {


    @Autowired
    PhotoRepository photoRepository;

    @Autowired
    UserRepository userRepository;


    /**
     * Saves a photo
     * @param photo The photo entity to save
     */
    public void savePhoto(Photo photo) {
        photoRepository.save(photo);
    }


    /**
     * Retrieves photos by room ID
     * @param roomId The ID of the album
     * @return A list of photos belonging to the specified album
     */
  public List<Photo> getPhotosByRoomId(Long roomId) {
        return photoRepository.findByRoomId(roomId);
    }

}
