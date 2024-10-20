package com.dream_habitat.app.model;


import java.io.Serializable;
import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Entity class representing a photo
 * @author Jean-Baptiste, Kamel, Victor
 */
@Setter
@Getter
@Entity
@Table(name = "photo")
@NoArgsConstructor
@AllArgsConstructor
public class Photo implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "path")
    private String path;

    @Column(name = "description")
    private String description;

    @Column(name = "date")
    private LocalDateTime date;

    @ManyToOne
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;

    /**
     * -- SETTER --
     *  Sets the owner of the photo
     *
     *
     * -- GETTER --
     *  Retrieves the owner of the photo
     *
     @param owner The owner to set for the photo
      * @return The owner of the photo
     */
    @Getter
    @Setter
    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;


    /**
     * Parameterized constructor
     * @param name The name of the photo
     * @param path The path to the photo file
     * @param description The description of the photo
     * @param date The date when the photo was uploaded
     * @param roomId The album to which the photo belongs
     * @param owner The owner of the photo
     */
    public Photo(String name, String path, String description, LocalDateTime date, Room roomId, User owner){
        this.name = name;
        this.path = path;
        this.description = description;
        this.date = date;
        this.room = roomId;
        this.owner = owner;

    }

    // getters and setters







}
