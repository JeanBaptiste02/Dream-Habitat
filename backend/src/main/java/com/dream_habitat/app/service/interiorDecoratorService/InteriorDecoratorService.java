package com.dream_habitat.app.service.interiorDecoratorService;

import com.dream_habitat.app.dto.InteriorController.ApiResponseDto;
import com.dream_habitat.app.dto.InteriorController.GenerateDto;
import com.dream_habitat.app.dto.photoResultDTOS.PhotoResultDTO;
import com.dream_habitat.app.model.Photo;
import com.dream_habitat.app.model.PhotoResult;
import com.dream_habitat.app.model.Room;
import com.dream_habitat.app.model.User;
import com.dream_habitat.app.repository.PhotoResultRepository;
import org.apache.tomcat.util.http.fileupload.FileItemFactory;
import org.apache.tomcat.util.http.fileupload.disk.DiskFileItem;
import org.apache.tomcat.util.http.fileupload.disk.DiskFileItemFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Service
public class InteriorDecoratorService {

    @Value("${interior.decorator.api.url}")
    private String apiUrl;

    @Value("${interior.decorator.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate;
    private final PhotoResultRepository photoResultRepository;

    public InteriorDecoratorService(RestTemplateBuilder restTemplateBuilder, PhotoResultRepository photoResultRepository) {
        this.restTemplate = restTemplateBuilder.build();
        this.photoResultRepository = photoResultRepository;
    }

    public PhotoResultDTO generate(Photo photo, String roomType, String style, boolean upscale, String model) {
        try {
            // Étape 1 : Appeler l'API pour générer le design d'intérieur
            GenerateDto response = generateInteriorDesign(
                     getFileByPath(getProjectRootPath()+ URLDecoder.decode(photo.getPath(), StandardCharsets.UTF_8)),
                    roomType,
                    style,
                    upscale,
                    model
            );

            // Vérifier si le UUID est valide
            if (response.getUuid() == null || response.getUuid().isEmpty()) {
                throw new RuntimeException("Failed to generate interior design: Invalid UUID returned.");
            }
            Thread.sleep(100000);

            // Étape 2 : Récupérer les résultats associés au UUID
            ApiResponseDto apiResponseDto = fetchResults(response.getUuid());

            // Créer un objet PhotoResult uniquement si le traitement est terminé
            if (apiResponseDto.isFinished() && !apiResponseDto.getFiles().isEmpty()) {
                PhotoResult photoResult = new PhotoResult();
                photoResult.setPhoto(photo);
                photoResult.setName("IA_" + photo.getName());
                photoResult.setPath(apiResponseDto.getFiles().get(0).getUrl());
                photoResult.setRoom(photo.getRoom());
                photoResult.setDate(LocalDateTime.now());
                photoResult.setOwner(photo.getOwner());

                // Sauvegarder le résultat dans la base de données
                photoResultRepository.save(photoResult);

                // Retourner le DTO correspondant
                return new PhotoResultDTO(photoResult);
            } else {
                throw new RuntimeException("Failed to process interior design: Processing not finished or no files available.");
            }
        } catch (IOException e) {
            throw new RuntimeException("An error occurred while processing the photo: " + e.getMessage(), e);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }



    public GenerateDto generateInteriorDesign(MultipartFile file, String roomType, String style, boolean upscale, String model) {
        String url = apiUrl + "/interior-image/";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        headers.set("Authorization", apiKey);

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        try {
            body.add("file", new FileSystemResource(convert(file)));
        } catch (IOException e) {
            throw new RuntimeException("Error converting MultipartFile to File", e);
        }
        body.add("room_type", roomType);
        body.add("style", style);
        body.add("upscale", upscale);
        body.add("model", model);

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        ResponseEntity<Map> responseEntity = restTemplate.exchange(
                url,
                HttpMethod.POST,
                requestEntity,
                Map.class
        );

        if (responseEntity.getStatusCode() == HttpStatus.OK) {
            Map<String, Object> responseBody = responseEntity.getBody();
            assert responseBody != null;
            return GenerateDto.builder()
                    .uuid((String) responseBody.get("uuid"))
                    .build();
        } else {
            throw new RuntimeException("Failed to generate interior design: " + responseEntity.getStatusCode());
        }
    }

    public ApiResponseDto fetchResults(String uuid) {
        String url = apiUrl + "/results/";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        headers.set("Authorization", apiKey);

        // Construire le body avec les données form-data
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("uuid", uuid);

        // Préparer la requête HTTP
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        // Initialiser la réponse
        ResponseEntity<ApiResponseDto> response;

        // Boucle de réessai jusqu'à ce que 'isFinished' soit true ou que l'on atteigne un nombre de tentatives maximum
        int attempts = 0;
        int maxAttempts = 5;  // Par exemple, essayer 5 fois
        boolean isFinished = false;

        while (!isFinished && attempts < maxAttempts) {
            // Appel de l'API et désérialisation de la réponse en ApiResponseDto
            response = restTemplate.exchange(
                    url,
                    HttpMethod.POST,
                    requestEntity,
                    ApiResponseDto.class
            );

            if (response.getStatusCode() == HttpStatus.OK) {
                ApiResponseDto responseBody = response.getBody();
                isFinished = responseBody != null && responseBody.isFinished();

                if (isFinished) {
                    // Si la réponse est terminée, on sort de la boucle
                    return responseBody;
                } else {
                    // Si la réponse n'est pas terminée, on attend avant de retenter
                    attempts++;
                    try {
                        Thread.sleep(9000); // Attendre 2 secondes avant de refaire la requête
                    } catch (InterruptedException e) {
                        // Gérer l'interruption si nécessaire
                        Thread.currentThread().interrupt();
                        throw new RuntimeException("Thread interrupted during sleep", e);
                    }
                }
            } else {
                throw new RuntimeException("Failed to fetch results from API: " + response.getStatusCode());
            }
        }

        // Si on dépasse le nombre maximum de tentatives sans succès, on lève une exception
        if (attempts >= maxAttempts) {
            throw new RuntimeException("Exceeded maximum attempts to fetch results from API.");
        }

        return null; // Retourner null si la boucle se termine sans succès
    }




    // Convert MultipartFile to a temporary file
    private File convert(MultipartFile file) throws IOException {
        File convFile = new File(Objects.requireNonNull(file.getOriginalFilename()));
        FileOutputStream fos = new FileOutputStream(convFile);
        fos.write(file.getBytes());
        fos.close();
        return convFile;
    }

    public MultipartFile getFileByPath(String path) throws IOException {
        File file = new File(path);

        if (!file.exists()) {
            throw new IOException("Le fichier n'existe pas à l'emplacement spécifié : " + path);
        }

        // Convertir le fichier en un tableau de bytes
        byte[] fileContent = Files.readAllBytes(file.toPath());

        // Retourner un MultipartFile
        return new MultipartFile() {
            @Override
            public String getName() {
                return file.getName();
            }

            @Override
            public String getOriginalFilename() {
                return file.getName();
            }

            @Override
            public String getContentType() {
                try {
                    return Files.probeContentType(file.toPath());
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }

            @Override
            public boolean isEmpty() {
                return fileContent.length == 0;
            }

            @Override
            public long getSize() {
                return fileContent.length;
            }

            @Override
            public byte[] getBytes() throws IOException {
                return fileContent;
            }

            @Override
            public InputStream getInputStream() throws IOException {
                return new ByteArrayInputStream(fileContent);
            }

            @Override
            public void transferTo(File dest) throws IOException, IllegalStateException {
                FileCopyUtils.copy(file, dest);
            }
        };
    }
    public static String getProjectRootPath() {
        try {
            // Récupérer le chemin absolu du répertoire de travail actuel
            Path projectRootPath = Paths.get("").toAbsolutePath();

            // Retourner le chemin sous forme de chaîne
            return projectRootPath.toString();
        } catch (Exception e) {
            e.printStackTrace();
            return null; // En cas d'erreur
        }
    }

    }



