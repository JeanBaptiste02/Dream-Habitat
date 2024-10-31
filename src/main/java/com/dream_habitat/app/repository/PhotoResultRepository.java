package com.dream_habitat.app.repository;

import com.dream_habitat.app.model.Photo;
import com.dream_habitat.app.model.PhotoResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhotoResultRepository extends JpaRepository<Photo, Long> {
    /**
     * Retrieves a photo by its ID
     * @param id The ID of the photo to retrieve
     * @return The photo entity if found, otherwise null
     */
    PhotoResult finnPhotoResultById(Long id);
}