package com.dream_habitat.app.service;


import com.dream_habitat.app.model.Photo;
import com.dream_habitat.app.model.PhotoResult;
import com.dream_habitat.app.repository.PhotoResultRepository;
import com.dream_habitat.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PhotoResultService {


    @Autowired
    PhotoResultRepository photoResultRepository;

    @Autowired
    UserRepository userRepository;


    /**
     * Saves a photo
     * @param photoResult The photo entity to save
     */
    public void savePhotoResult(PhotoResult photoResult) {
        photoResultRepository.save(photoResult);
    }


    /**
     * Retrieves photos by room ID
     * @param roomId The ID of the album
     * @return A list of photos belonging to the specified album
     */
    public List<PhotoResult> getPhotosByRoomId(Long roomId) {
        return photoResultRepository.findByRoomId(roomId);
    }

    /**
     * Retrieves photos by room ID
     * @param photoId The ID of the album
     * @return A list of photos belonging to the specified album
     */
    public PhotoResult getPhotosByPhotoId(Long photoId) {
        return photoResultRepository.findByPhotoId(photoId);
    }

}

