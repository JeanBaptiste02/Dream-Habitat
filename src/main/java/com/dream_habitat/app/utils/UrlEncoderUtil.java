package com.dream_habitat.app.utils;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

public class UrlEncoderUtil {

    public static String encodeFilePath(String filePath) {
        try {
            // Utilisez l'encodage UTF-8 pour encoder les caractères spéciaux
            return URLEncoder.encode(filePath, StandardCharsets.UTF_8.toString());
        } catch (UnsupportedEncodingException e) {
            // Gérer l'erreur ici
            throw new RuntimeException("Erreur lors de l'encodage de l'URL", e);
        }
    }
}
