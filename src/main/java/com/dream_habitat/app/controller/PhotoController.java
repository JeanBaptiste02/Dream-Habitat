package com.dream_habitat.app.controller;

import com.dream_habitat.app.dto.userDTOS.UserDTO;
import com.dream_habitat.app.model.Photo;
import com.dream_habitat.app.model.Room;
import com.dream_habitat.app.model.User;
import com.dream_habitat.app.service.PhotoService;
import com.dream_habitat.app.service.RoomService;
import com.dream_habitat.app.service.UserService;
import com.dream_habitat.app.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;

/**
 * @class PhotoController
 * @brief Controller for handling photo-related operations, such as uploading, retrieving, updating, and deleting photos.
 */
@RestController
@RequestMapping("api/photo")
public class PhotoController {

    @Autowired
    private PhotoService photoService;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private RoomService roomService;

    /**
     * @brief Uploads a photo and associates it with a room and a user.
     * 
     * @param file The photo file to be uploaded.
     * @param name The name of the photo.
     * @param description The description of the photo.
     * @param roomId The room to which the photo belongs.
     * @param token The authorization token of the user uploading the photo.
     * 
     * @return ResponseEntity with HTTP status 200 if photo is successfully uploaded.
     * @return ResponseEntity with HTTP status 400 if the request is incorrect.
     * @return ResponseEntity with HTTP status 401 if the user is not authorized.
     * @return ResponseEntity with HTTP status 500 if there is a server error.
     */
    @PostMapping("/upload")
    public ResponseEntity<String> uploadPhoto(@RequestParam("file") MultipartFile file,
                                              @RequestParam("name") String name,
                                              @RequestParam("description") String description,
                                              @RequestParam("roomId") Room roomId,
                                              @RequestHeader(value="Authorization") String token) {
        if (token != null) {
            token = token.substring(7);
            UserDTO existingUser = userService.getUserById(jwtUtil.extractUser(token).getId());
            try {
                LocalDateTime date = LocalDateTime.now();
                String currentDirectory = System.getProperty("user.dir");

                // Chemin de base pour les photos
                String photoDirPath = currentDirectory + File.separator + "photosData";
                File photoDir = new File(photoDirPath);
                if (!photoDir.exists()) {
                    photoDir.mkdirs();
                }

                // Crée un dossier pour chaque utilisateur
                String ownerIdDirPath = photoDirPath + File.separator + existingUser.getName();
                File ownerIdDir = new File(ownerIdDirPath);
                if (!ownerIdDir.exists()) {
                    ownerIdDir.mkdirs();
                }

                // Enregistrer le fichier
                String fileName = file.getOriginalFilename();
                Path filePath = Paths.get(ownerIdDirPath, fileName);
                file.transferTo(filePath.toFile());

                // Encodage de l'URL pour les caractères spéciaux
                String encodedFileName = URLEncoder.encode(fileName, StandardCharsets.UTF_8.toString());

                // URL encodée pour être stockée dans la base de données
                String myFilePath = File.separator + "photosData" + File.separator + existingUser.getName() + File.separator + encodedFileName;

                // Création de l'objet Photo et enregistrement
                User user = userService.getUserByEmail(existingUser.getEmail()).get();
                Photo photo = new Photo(fileName, myFilePath, description, date, roomId, user);
                photoService.savePhoto(photo);

                return ResponseEntity.ok().body("Photo uploaded successfully");
            } catch (IOException e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload photo");
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }
    }

    /**
     * @brief Retrieves all photos associated with a specific room.
     * 
     * @param roomId The ID of the room for which to retrieve photos.
     * 
     * @return ResponseEntity containing a list of Photo objects, with HTTP status 200 if successful.
     * @return ResponseEntity with HTTP status 404 if no photos are found for the room.
     */
    @GetMapping("/room/{roomId}")
    public ResponseEntity<List<Photo>> getPhotosByRoomId(@PathVariable Long roomId) {
        List<Photo> photos = photoService.getPhotosByRoomId(roomId);
        return ResponseEntity.ok(photos);
    }

    /**
     * @brief Retrieves a photo by its ID.
     * 
     * @param id The ID of the photo to retrieve.
     * 
     * @return ResponseEntity containing the Photo object, with HTTP status 200 if found.
     * @return ResponseEntity with HTTP status 404 if the photo is not found.
     */
    @GetMapping("/get/{id}")
    public ResponseEntity<Photo> getPhotoById(@PathVariable Long id) {
        Photo photo = photoService.findPhotoById(id);
        return photo != null ? ResponseEntity.ok(photo) : ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    /**
     * @brief Deletes a photo based on its ID.
     * 
     * @param id The ID of the photo to delete.
     * 
     * @return ResponseEntity with HTTP status 200 if the photo is deleted successfully.
     * @return ResponseEntity with HTTP status 404 if the photo is not found.
     */
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deletePhoto(@PathVariable Long id) {
        if (photoService.deletePhoto(id)) {
            return ResponseEntity.ok("Photo deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Photo not found");
        }
    }

    /**
     * @brief Updates a photo's details, such as name, description, or file.
     * 
     * @param id The ID of the photo to update.
     * @param name The new name of the photo (optional).
     * @param description The new description of the photo (optional).
     * @param file The new photo file to upload (optional).
     * 
     * @return ResponseEntity containing the updated Photo object, with HTTP status 200 if successful.
     * @return ResponseEntity with HTTP status 400 if the request is incorrect.
     * @return ResponseEntity with HTTP status 404 if the photo is not found.
     */
    @PutMapping("/update/{id}")
    public ResponseEntity<Photo> updatePhoto(@PathVariable Long id, 
                                             @RequestParam(required = false) String name,
                                             @RequestParam(required = false) String description,
                                             @RequestParam(required = false) MultipartFile file) throws IllegalStateException, IOException {
        Photo updatedPhoto = photoService.updatePhoto(id, name, description, file);
        return updatedPhoto != null ? ResponseEntity.ok(updatedPhoto) : ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}
