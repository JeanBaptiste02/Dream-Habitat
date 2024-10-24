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


    @GetMapping("/room/{roomId}")
    public ResponseEntity<List<Photo>> getPhotosByRoomId(@PathVariable Long roomId) {
        List<Photo> photos = photoService.getPhotosByRoomId(roomId);
        return ResponseEntity.ok(photos);
    }



}
