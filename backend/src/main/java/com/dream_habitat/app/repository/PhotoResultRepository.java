package com.dream_habitat.app.repository;

import com.dream_habitat.app.model.Photo;
import com.dream_habitat.app.model.PhotoResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PhotoResultRepository extends JpaRepository<PhotoResult, Long> {
    /**
     * Retrieves a photo by its ID
     * @param id The ID of the photo to retrieve
     * @return The photo entity if found, otherwise null
     */
    PhotoResult findPhotoResultById(Long id);

    /**
     * Retrieves a list of photos belonging to a specific album
     * @param roomId The ID of the room
     * @return A list of photos belonging to the specified room
     */
    List<PhotoResult> findByRoomId(Long roomId);

    /**
     * Retrieves a list of photos belonging to a specific album
     * @param photoId The ID of the room
     * @return A list of photos belonging to the specified room
     */
    PhotoResult findByPhotoId(Long photoId);
}