package com.dream_habitat.app.service;

import com.dream_habitat.app.model.Photo;
import com.dream_habitat.app.model.Room;
import com.dream_habitat.app.repository.PhotoRepository;
import com.dream_habitat.app.repository.UserRepository;
import com.jayway.jsonpath.internal.Path;

import io.jsonwebtoken.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Paths;
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
  
    /**
     * Retrieves photos by room ID
     * @param photoID The ID of the album
     * @return A list of photos belonging to the specified album
     */
    public Photo getPhotoId(Long photoID) {
        return photoRepository.findPhotoById(photoID);
    }

  
  public Photo findPhotoById(Long id) {
      return photoRepository.findPhotoById(id);
  }

  public boolean deletePhoto(Long id) {
      if (photoRepository.existsById(id)) {
          photoRepository.deleteById(id);
          return true;
      }
      return false;
  }
  
  public Photo updatePhoto(Long id, String name, String description, MultipartFile file) throws IllegalStateException, java.io.IOException {
	    Photo photo = photoRepository.findPhotoById(id);
	    
	    if (photo != null) {
	        // Update the name if provided
	        if (name != null && !name.isEmpty()) {
	            photo.setName(name);
	        }
	        
	        // Update the description if provided
	        if (description != null && !description.isEmpty()) {
	            photo.setDescription(description);
	        }
	        
	        // Handle the file upload
	        if (file != null && !file.isEmpty()) {
	            try {
	                // Define the base directory for photo storage
	                String currentDirectory = System.getProperty("user.dir");
	                String photoDirPath = currentDirectory + File.separator + "photosData";
	                
	                // Create the directory if it doesn't exist
	                File photoDir = new File(photoDirPath);
	                if (!photoDir.exists()) {
	                    photoDir.mkdirs();
	                }

	                // Create a directory for the user (owner of the photo)
	                String ownerIdDirPath = photoDirPath + File.separator + photo.getOwner().getName();
	                File ownerIdDir = new File(ownerIdDirPath);
	                if (!ownerIdDir.exists()) {
	                    ownerIdDir.mkdirs();
	                }

	                // Save the new file
	                String newFileName = file.getOriginalFilename();
	                Path newFilePath = (Path) Paths.get(ownerIdDirPath, newFileName);
	                file.transferTo(((java.nio.file.Path) newFilePath).toFile());

	                // Update the photo's path
	                String encodedFileName = URLEncoder.encode(newFileName, StandardCharsets.UTF_8.toString());
	                String myFilePath = File.separator + "photosData" + File.separator + photo.getOwner().getName() + File.separator + encodedFileName;
	                photo.setPath(myFilePath);
	            } catch (IOException e) {
	                e.printStackTrace();
	                // Handle the error, e.g., throw a custom exception
	                throw new RuntimeException("Failed to upload new photo file: " + e.getMessage());
	            }
	        }
	        
	        // Save the updated photo entity
	        photoRepository.save(photo);
	        return photo;
	    }
	    
	    return null; // Photo not found
	}

}