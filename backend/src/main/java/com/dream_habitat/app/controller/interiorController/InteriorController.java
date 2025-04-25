package com.dream_habitat.app.controller.interiorController;

import com.dream_habitat.app.dto.InteriorController.ApiResponseDto;
import com.dream_habitat.app.dto.InteriorController.GenerateDto;
import com.dream_habitat.app.dto.photoResultDTOS.PhotoResultDTO;
import com.dream_habitat.app.model.Photo;
import com.dream_habitat.app.service.PhotoService;
import com.dream_habitat.app.service.interiorDecoratorService.InteriorDecoratorService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

/**
 * Contrôleur pour gérer les demandes liées à la génération de designs d'intérieur.
 * Ce contrôleur contient plusieurs points de terminaison pour générer des designs d'intérieur à partir de photos et de paramètres.
 */
@RestController
@RequestMapping("/api/interior")
public class InteriorController {

    private final InteriorDecoratorService decoratorService;
    private final PhotoService photoService;

    /**
     * Constructeur du contrôleur InteriorController.
     *
     * @param decoratorService Service pour la génération des designs d'intérieur.
     * @param photoService Service pour la gestion des photos.
     */
    public InteriorController(InteriorDecoratorService decoratorService, PhotoService photoService) {
        this.decoratorService = decoratorService;
        this.photoService = photoService;
    }

    /**
     * Génère un design d'intérieur à partir d'une photo et de paramètres spécifiques.
     *
     * @param file La photo à traiter pour la génération du design d'intérieur.
     * @param roomType Type de la pièce (ex: salon, chambre).
     * @param style Style de design (ex: moderne, classique).
     * @param upscale Indicateur pour améliorer la qualité de l'image (optionnel, défaut: false).
     * @param model Modèle utilisé pour générer le design (optionnel, défaut: sd15).
     * @return Un objet GenerateDto contenant les détails du design généré.
     * @throws Exception Si une erreur se produit lors de la génération du design.
     */
    @PostMapping("/generate")
    public ResponseEntity<GenerateDto> generateInteriorDesign(
            @RequestParam("file") MultipartFile file,
            @RequestParam("room_type") String roomType,
            @RequestParam("style") String style,
            @RequestParam(value = "upscale", defaultValue = "false") boolean upscale,
            @RequestParam(value = "model", defaultValue = "sd15") String model
    ) {
        try {
            GenerateDto response = decoratorService.generateInteriorDesign(file, roomType, style, upscale, model);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    /**
     * Récupère les résultats d'un design d'intérieur généré à partir de son UUID.
     *
     * @param uuid L'UUID unique associé au design d'intérieur généré.
     * @return Un objet ApiResponseDto contenant les résultats du design d'intérieur.
     * @throws Exception Si une erreur se produit lors de la récupération des résultats.
     */
    @PostMapping("/result")
    public ResponseEntity<ApiResponseDto> getInteriorDesign(@RequestParam("uuid") String uuid) {
        try {
            ApiResponseDto response = decoratorService.fetchResults(uuid);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    /**
     * Génère un design d'intérieur à partir d'une photo existante avec des paramètres de pièce et de style.
     *
     * @param photoId Identifiant de la photo à utiliser pour la génération du design.
     * @param roomType Type de la pièce (ex: salon, chambre).
     * @param style Style de design (ex: moderne, classique).
     * @param upscale Indicateur pour améliorer la qualité de l'image (optionnel, défaut: false).
     * @param model Modèle utilisé pour générer le design (optionnel, défaut: sd15).
     * @return Un objet PhotoResultDTO contenant le résultat du design généré à partir de la photo.
     * @throws Exception Si une erreur se produit lors de la génération du design.
     */
    @PostMapping("/res")
    public ResponseEntity<?> resInteriorDesign(
            @RequestParam("photo_id") long photoId,
            @RequestParam("room_type") String roomType,
            @RequestParam("style") String style,
            @RequestParam(value = "upscale", defaultValue = "false") boolean upscale,
            @RequestParam(value = "model", defaultValue = "sd15") String model
    ) {
        try {
            Photo photo = photoService.getPhotoId(photoId);
            if (photo == null || photo.getPath() == null || photo.getPath().isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(new ErrorResponse("Invalid photo input", "Photo path is required."));
            }
            PhotoResultDTO response = decoratorService.generate(photo, roomType, style, upscale, model);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Failed to process interior design request", e.getMessage()));
        }
    }

    /**
     * Classe interne pour représenter une réponse d'erreur.
     */
    @Getter
    @AllArgsConstructor
    private static class ErrorResponse {
        private String message;
        private String details;
    }
}
