package com.dream_habitat.app.repository;

import com.dream_habitat.app.model.Photo;
import com.dream_habitat.app.model.Room;
import com.dream_habitat.app.service.PhotoService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

public class PhotoRepositoryTest {

    @Mock
    private PhotoRepository photoRepository;

    @InjectMocks
    private PhotoService photoService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testFindById() {
        // Créer une instance simulée de Photo
        Photo photo = new Photo();
        photo.setId(1L);
        photo.setName("Test Photo");

        // Configurer le comportement du mock pour findById
        when(photoRepository.findById(1L)).thenReturn(Optional.of(photo));

        // Appeler la méthode findById sur le mock directement
        Optional<Photo> foundPhotoOptional = photoRepository.findById(1L);

        // Vérifications
        assertTrue(foundPhotoOptional.isPresent(), "La photo retournée ne doit pas être vide");
        Photo foundPhoto = foundPhotoOptional.get();
        assertEquals(1L, foundPhoto.getId(), "L'ID de la photo ne correspond pas");
        assertEquals("Test Photo", foundPhoto.getName(), "Le nom de la photo ne correspond pas");

        // Vérifier que la méthode du mock a bien été appelée
        verify(photoRepository, times(1)).findById(1L);
    }

    @Test
    public void testSavePhoto() {
        // Créer une photo simulée
        Photo photo = new Photo();
        photo.setName("New Photo");

        // Configurer le comportement du mock pour save()
        when(photoRepository.save(photo)).thenReturn(photo);

        // Appeler la méthode save sur le mock directement
        Photo savedPhoto = photoRepository.save(photo);

        // Vérifications
        assertNotNull(savedPhoto, "La photo sauvegardée ne doit pas être nulle");
        assertEquals("New Photo", savedPhoto.getName(), "Le nom de la photo sauvegardée ne correspond pas");

        // Vérifier que la méthode save a bien été appelée
        verify(photoRepository, times(1)).save(photo);
    }

    @Test
    public void testFindPhotoByPath() {
        // Créer une instance simulée de Photo
        Photo photo = new Photo();
        photo.setPath("photo/path");

        // Configurer le comportement du mock pour findPhotoByPath
        when(photoRepository.findPhotoByPath("photo/path")).thenReturn(photo);

        // Appeler la méthode findPhotoByPath sur le mock
        Photo foundPhoto = photoRepository.findPhotoByPath("photo/path");

        // Vérifications
        assertNotNull(foundPhoto, "La photo retournée ne doit pas être nulle");
        assertEquals("photo/path", foundPhoto.getPath(), "Le chemin de la photo ne correspond pas");

        // Vérifier que la méthode du mock a bien été appelée
        verify(photoRepository, times(1)).findPhotoByPath("photo/path");
    }

    @Test
    public void testFindByRoomId() {
        // Créer une instance simulée de Photo
        Photo photo = new Photo();
        photo.setId(1L);
        photo.setName("Room Photo");

        // Configurer le comportement du mock pour findByRoomId
        when(photoRepository.findByRoomId(1L)).thenReturn(List.of(photo));

        // Appeler la méthode findByRoomId sur le mock
        List<Photo> photos = photoRepository.findByRoomId(1L);

        // Vérifications
        assertNotNull(photos, "La liste des photos ne doit pas être nulle");
        assertEquals(1, photos.size(), "La taille de la liste des photos ne correspond pas");
        assertEquals("Room Photo", photos.get(0).getName(), "Le nom de la photo dans la chambre ne correspond pas");

        // Vérifier que la méthode du mock a bien été appelée
        verify(photoRepository, times(1)).findByRoomId(1L);
    }

    @Test
    public void testFindByOwnerId_Id() {
        // Créer une instance simulée de Photo
        Photo photo = new Photo();
        photo.setId(1L);
        photo.setName("Owner Photo");

        // Configurer le comportement du mock pour findByOwnerId_Id
        when(photoRepository.findByOwnerId_Id(1L)).thenReturn(List.of(photo));

        // Appeler la méthode findByOwnerId_Id sur le mock
        List<Photo> photos = photoRepository.findByOwnerId_Id(1L);

        // Vérifications
        assertNotNull(photos, "La liste des photos ne doit pas être nulle");
        assertEquals(1, photos.size(), "La taille de la liste des photos ne correspond pas");
        assertEquals("Owner Photo", photos.get(0).getName(), "Le nom de la photo de l'utilisateur ne correspond pas");

        // Vérifier que la méthode du mock a bien été appelée
        verify(photoRepository, times(1)).findByOwnerId_Id(1L);
    }

    @Test
    public void testFindPhotoPathsByOwner_Id() {
        // Créer une liste simulée de chemins de photos
        String photoPath = "path/to/photo";

        // Configurer le comportement du mock pour findPhotoPathsByOwner_id
        when(photoRepository.findPhotoPathsByOwner_id(1L)).thenReturn(List.of(photoPath));

        // Appeler la méthode findPhotoPathsByOwner_id sur le mock
        List<String> paths = photoRepository.findPhotoPathsByOwner_id(1L);

        // Vérifications
        assertNotNull(paths, "La liste des chemins ne doit pas être nulle");
        assertEquals(1, paths.size(), "La taille de la liste des chemins ne correspond pas");
        assertEquals("path/to/photo", paths.get(0), "Le chemin de la photo ne correspond pas");

        // Vérifier que la méthode du mock a bien été appelée
        verify(photoRepository, times(1)).findPhotoPathsByOwner_id(1L);
    }

    @Test
    public void testFindByOwnerIdAndRoomId() {
        // Créer une instance simulée de Photo
        Photo photo = new Photo();
        photo.setId(1L);
        photo.setId(1L);
        photo.setName("Owner Room Photo");

        Room room = new Room();
        room.setId(1L);

        // Configurer le comportement du mock pour findByOwnerIdAndRoomId
        when(photoRepository.findByOwnerIdAndRoomId(1L, room)).thenReturn(List.of(photo));

        // Appeler la méthode findByOwnerIdAndRoomId sur le mock
        List<Photo> photos = photoRepository.findByOwnerIdAndRoomId(1L, room);

        // Vérifications
        assertNotNull(photos, "La liste des photos ne doit pas être nulle");
        assertEquals(1, photos.size(), "La taille de la liste des photos ne correspond pas");
        assertEquals("Owner Room Photo", photos.get(0).getName(), "Le nom de la photo dans la chambre de l'utilisateur ne correspond pas");

        // Vérifier que la méthode du mock a bien été appelée
        verify(photoRepository, times(1)).findByOwnerIdAndRoomId(1L, room);
    }

    @Test
    public void testGetPublicPhotosByOwnerId() {
        // Créer une instance simulée de Photo
        Photo photo = new Photo();
        photo.setId(1L);
        photo.setName("Public Photo");

        // Configurer le comportement du mock pour getPublicPhotosByOwnerId
        when(photoRepository.getPublicPhotosByOwnerId(1L)).thenReturn(List.of(photo));

        // Appeler la méthode getPublicPhotosByOwnerId sur le mock
        List<Photo> photos = photoRepository.getPublicPhotosByOwnerId(1L);

        // Vérifications
        assertNotNull(photos, "La liste des photos publiques ne doit pas être nulle");
        assertEquals(1, photos.size(), "La taille de la liste des photos publiques ne correspond pas");
        assertEquals("Public Photo", photos.get(0).getName(), "Le nom de la photo publique ne correspond pas");

        // Vérifier que la méthode du mock a bien été appelée
        verify(photoRepository, times(1)).getPublicPhotosByOwnerId(1L);
    }

    @Test
    public void testFindByroomIdOrderByDateDesc() {
        // Créer une instance simulée de Photo
        Photo photo = new Photo();
        photo.setId(1L);
        photo.setName("Room Date Photo");

        Room room = new Room();
        room.setId(1L);

        // Configurer le comportement du mock pour findByroomIdOrderByDateDesc
        when(photoRepository.findByroomIdOrderByDateDesc(room)).thenReturn(List.of(photo));

        // Appeler la méthode findByroomIdOrderByDateDesc sur le mock
        List<Photo> photos = photoRepository.findByroomIdOrderByDateDesc(room);

        // Vérifications
        assertNotNull(photos, "La liste des photos ne doit pas être nulle");
        assertEquals(1, photos.size(), "La taille de la liste des photos ne correspond pas");
        assertEquals("Room Date Photo", photos.get(0).getName(), "Le nom de la photo dans la chambre ne correspond pas");

        // Vérifier que la méthode du mock a bien été appelée
        verify(photoRepository, times(1)).findByroomIdOrderByDateDesc(room);
    }
}
