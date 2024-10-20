package com.dream_habitat.app.repository;

import com.dream_habitat.app.model.Photo;
import com.dream_habitat.app.model.Room;
import org.springframework.stereotype.Repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository interface for managing photo entities
 * @author Jean-Baptiste, Kamel, Victor
 */
@Repository
public interface PhotoRepository extends JpaRepository<Photo, Long> {

    /**
     * Retrieves a photo by its ID
     * @param id The ID of the photo to retrieve
     * @return The photo entity if found, otherwise null
     */
    Photo findPhotoById(Long id);

    Photo findPhotoByPath(String path);

    /**
     * Retrieves a list of photos belonging to a specific album
     * @param roomId The ID of the room
     * @return A list of photos belonging to the specified room
     */
    List<Photo> findByRoomId(Room roomId);

    /**
     * Retrieves a list of photos owned by a specific user
     * @param userId The ID of the user
     * @return A list of photos owned by the specified user
     */
    List<Photo> findByOwnerId_Id(Long userId);

    /**
     * Retrieves the paths of photos owned by a specific user
     * @param userId The ID of the user
     * @return A list of paths to photos owned by the specified user
     */
    List<String> findPhotoPathsByOwner_id(long userId);

    /**
     * Retrieves a list of photos owned by a specific user and belonging to a specific room
     * @param ownerId The ID of the owner user
     * @param roomId The ID of the room
     * @return A list of photos owned by the specified user and belonging to the specified room
     */
    List<Photo> findByOwnerIdAndRoomId(Long ownerId, Room roomId);





    /**
     * Retieves an image by ownerId
     * @param userId L'ID de l'utilisateur
     * @return La liste des photos publiques de l'utilisateur
     */
    List<Photo> getPublicPhotosByOwnerId(Long userId);

    /**
     * Retieves the last image of a specific room
     * @param room
     * @return
     */
    List<Photo> findByroomIdOrderByDateDesc(Room room);


}