package com.dream_habitat.app.service;

import com.dream_habitat.app.model.Photo;
import com.dream_habitat.app.model.Room;
import com.dream_habitat.app.repository.PhotoRepository;
import com.dream_habitat.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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
  
  public Photo updatePhoto(Long id, String name, String description, MultipartFile file) {
      Photo photo = photoRepository.findPhotoById(id);
      if (photo != null) {
          if (name != null) {
              photo.setName(name);
          }
          if (description != null) {
              photo.setDescription(description);
          }
          if (file != null) {
              
          }
          photoRepository.save(photo);
          return photo;
      }
      return null;
  }
}
