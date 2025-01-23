package com.dream_habitat.app.dto.userDTOS;

/**
 * @class LoginResponse
 * @brief DTO représentant la réponse de connexion contenant le token JWT pour l'authentification.
 * 
 * Cette classe sert à transmettre le token JWT généré après une connexion réussie de l'utilisateur.
 */
public class LoginResponse {

    /**
     * Le token JWT généré après une connexion réussie.
     * @brief Token JWT d'authentification.
     * @note Doit être utilisé pour authentifier l'utilisateur lors des futures requêtes.
     */
    private String jwtToken;

    /**
     * @brief Constructeur d'une nouvelle réponse de connexion avec le token JWT.
     * 
     * @param jwtToken Le token JWT généré après une connexion réussie.
     */
    public LoginResponse(String jwtToken) {
        this.jwtToken = jwtToken;
    }

    /**
     * @brief Récupère le token JWT.
     * 
     * @return Le token JWT généré.
     */
    public String getJwtToken() {
        return jwtToken;
    }

    /**
     * @brief Définit le token JWT.
     * 
     * @param jwtToken Le token JWT à définir.
     */
    public void setJwtToken(String jwtToken) {
        this.jwtToken = jwtToken;
    }
}
