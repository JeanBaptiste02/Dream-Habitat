package com.dream_habitat.app.repository;


import com.dream_habitat.app.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Repository interface for managing album entities
 * @author Jean-Baptiste, Kamel, Victor, Mahdi
 */
public interface RoomRepository extends JpaRepository<Room, Long> {

    /**
     * Retrieves all rooms
     * @return A list of all rooms
     */
    List<Room> findAll();

    /**
     * Retrieves an room by its ID.
     * @param id The ID of the room to retrieve
     * @return The room with the specified ID
     */
    Room findRoomById(Long id);

    /**
     * Retrieves an room by its ID
     * @param roomId The ID of the room to retrieve
     * @return The room with the specified ID
     */
    Room getRoomById(Long roomId);

    /**
     * Deletes an room by its ID
     * @param roomId The ID of the room to delete
     */
    void deleteRoomById(Long roomId);

    /**
     * Retrieves all rooms associated with a specific owner ID
     * @param ownerId The ID of the owner
     * @return A list of rooms associated with the owner
     */
    List<Room> findRoomsByOwnerId(Long ownerId);

    /**
     * Retrieves the minimum room ID associated with a given owner ID
     * @param ownerId The ID of the owner
     * @return The minimum room ID associated with the owner
     */
    @Query(value = "SELECT MIN(id) FROM rooms WHERE owner_id = :ownerId", nativeQuery = true)
    Long getMinRoomIdByOwnerId(@Param("ownerId") Long ownerId);
}

