package com.dream_habitat.app.controller.interiorController;

import com.dream_habitat.app.dto.InteriorController.ApiResponseDto;
import com.dream_habitat.app.dto.InteriorController.GenerateDto;
import com.dream_habitat.app.dto.photoResultDTOS.PhotoResultDTO;
import com.dream_habitat.app.model.Photo;
import com.dream_habitat.app.model.PhotoResult;
import com.dream_habitat.app.service.PhotoService;
import com.dream_habitat.app.service.interiorDecoratorService.InteriorDecoratorService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/interior")
public class InteriorController {

    private final InteriorDecoratorService decoratorService;
    private final PhotoService photoService;

    public InteriorController(InteriorDecoratorService decoratorService, PhotoService photoService) {
        this.decoratorService = decoratorService;
        this.photoService = photoService;
    }


    @PostMapping("/generate")
    public ResponseEntity<GenerateDto> generateInteriorDesign(
            @RequestParam("file") MultipartFile file,
            @RequestParam("room_type") String roomType,
            @RequestParam("style") String style,
            @RequestParam(value = "upscale", defaultValue = "false") boolean upscale,
            @RequestParam(value = "model", defaultValue = "sd15") String model
    ) {
        try {
            // Appeler le service et obtenir le DTO
            GenerateDto response = decoratorService.generateInteriorDesign(file, roomType, style, upscale, model);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            // Gérer les erreurs et retourner une réponse appropriée
            return ResponseEntity.status(500).body(null);
        }
    }


   @PostMapping("/result")
    public ResponseEntity<ApiResponseDto> getInteriorDesign(@RequestParam("uuid") String uuid) {
        try {
            ApiResponseDto response = decoratorService.fetchResults(uuid);
            return ResponseEntity.ok(response);
        }catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
   }
    @PostMapping("/res")
    public ResponseEntity<?> resInteriorDesign(
            @RequestParam("photo_id") long photoId,
            @RequestParam("room_type") String roomType,
            @RequestParam("style") String style,
            @RequestParam(value = "upscale", defaultValue = "false") boolean upscale,
            @RequestParam(value = "model", defaultValue = "sd15") String model) {
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
    @Getter
    @AllArgsConstructor
    private static class ErrorResponse {
        private String message;
        private String details;
    }

}
