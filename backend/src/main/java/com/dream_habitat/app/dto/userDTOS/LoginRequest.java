package com.dream_habitat.app.dto.userDTOS;

/**
 * @class LoginRequest
 * @brief DTO représentant une demande de connexion contenant les informations d'identification de l'utilisateur.
 * 
 * Cette classe sert à transférer les informations de connexion de l'utilisateur du client au serveur.
 */
public class LoginRequest {

    /**
     * L'email de l'utilisateur.
     * @brief Adresse email de l'utilisateur.
     * @note Doit être fourni lors de la demande de connexion.
     */
    private String email;

    /**
     * Le mot de passe de l'utilisateur.
     * @brief Mot de passe de l'utilisateur.
     * @note Doit être fourni lors de la demande de connexion.
     */
    private String password;

    /**
     * @brief Récupère l'email de l'utilisateur.
     * 
     * @return L'email de l'utilisateur.
     */
    public String getEmail() {
        return email;
    }

    /**
     * @brief Définit l'email de l'utilisateur.
     * 
     * @param email L'email à définir pour l'utilisateur.
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * @brief Récupère le mot de passe de l'utilisateur.
     * 
     * @return Le mot de passe de l'utilisateur.
     */
    public String getPassword() {
        return password;
    }

    /**
     * @brief Définit le mot de passe de l'utilisateur.
     * 
     * @param password Le mot de passe à définir pour l'utilisateur.
     */
    public void setPassword(String password) {
        this.password = password;
    }
}
