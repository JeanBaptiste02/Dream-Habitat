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
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.Optional;

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
     * Uploads a photo to the server
     * @param file The MultipartFile containing the photo data
     * @param name The name of the photo
     * @param description The description of the photo
     * @param roomId The ID of the album to which the photo belongs
     * @return ResponseEntity containing a success message or an error message and HTTP status
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

                String photoDirPath = currentDirectory + File.separator + "photosData";
                File photoDir = new File(photoDirPath);
                if (!photoDir.exists()) {
                    photoDir.mkdirs();
                }

                String ownerIdDirPath = photoDirPath + File.separator + existingUser.getName();
                File ownerIdDir = new File(ownerIdDirPath);
                if (!ownerIdDir.exists()) {
                    ownerIdDir.mkdirs();
                }

                String fileName = file.getOriginalFilename();
                Path filePath = Paths.get(ownerIdDirPath, fileName);
                file.transferTo(filePath.toFile());

                String myFilePath = File.separator + "photosData" + File.separator + existingUser.getName() + File.separator + fileName;

                User user = userService.getUserByEmail(existingUser.getEmail()).get();

                Photo photo = new Photo(fileName, myFilePath, description, date, roomId, user);
                photoService.savePhoto(photo);

                return ResponseEntity.ok().body("Photo uploaded successfully");
            } catch (IOException e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload photo");
            }
        }else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }
    }

    /**
     * Extracts the JWT token from the HTTP servlet request
     * @param request The HTTP servlet request
     * @return The extracted JWT token, or null if not found
     */
    private String extractTokenFromRequest(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7);
        }
        return null;
    }


}
