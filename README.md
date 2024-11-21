# Dream Habitat - Backend API

Ce dépôt contient l'API backend pour **Dream Habitat**, un projet visant à proposer des aménagements personnalisés pour des habitats à partir de photos grâce à une Intelligence Artificielle. L'application permet aux utilisateurs de téléverser des photos d'espaces, et l'IA propose des solutions d'aménagement adaptées aux préférences et aux contraintes de l'utilisateur.

## Fonctionnalités du Backend

- **Gestion des utilisateurs** : Créer, mettre à jour, et supprimer des utilisateurs via des API sécurisées.
- **Gestion des espaces (rooms)** : Ajouter des espaces (rooms) dans lesquels les utilisateurs peuvent téléverser des photos.
- **Gestion des photos** : Téléverser, récupérer, et gérer les photos liées aux espaces pour analyse IA.
- **Authentification JWT** : Sécurisation des endpoints via l'authentification par tokens JWT.

## Membres de l'équipe

- **[Talatizi Kamel,Zhang Victor, Jean-Babtiste Damodarane]** : Développeurs backend principal
- **[Talatizi Kamel,Djaouti Youba]** : Développeur en charge de l'architecture API
- **[Touati Dylan,Ibgui Nathan]** : Responsable intégration IA
- **[Djouati Youba]** : DevOps et gestion des infrastructures

## Technologies utilisées

- **Java 17** avec **Spring Boot** pour la structure du projet.
- **JWT (JSON Web Token)** pour l'authentification et la sécurité des endpoints.
- **Maven** pour la gestion des dépendances et la compilation du projet.
- **Base de données relationnelle** ( PostgreSQL) pour stocker les utilisateurs, espaces, et photos et d autres structure de données.

## Comment créer et lancer le projet

Pour développer et exécuter le projet Dream Habitat, suivez les étapes ci-dessous :

### Prérequis

Assurez-vous d'avoir installé les éléments suivants sur votre machine :

- **Java 17** ou supérieur
- **Maven** pour la gestion des dépendances
- Un environnement de base de données ( PostgreSQL)

### Étapes d'installation

1. **Cloner le dépôt** :
   Ouvrez un terminal et exécutez la commande suivante pour cloner le dépôt :
   ```bash
   git clone https://github.com/username/dream-habitat.git


2. Naviguer dans le dossier du projet :
```bash
   cd dream-habitat
```


3. Configurer la base de données :
   Modifiez le fichier `src/main/resources/application.properties` pour configurer votre connexion à la base de données. Assurez-vous de définir les informations de connexion appropriées.


4. Construire le projet :
   Exécutez la commande suivante pour compiler le projet et télécharger toutes les dépendances nécessaires :


5. Lancer l'application : Pour démarrer le serveur, utilisez la commande suivante :
```bash
   mvn spring-boot:run
```

6. Exécution des tests
Pour exécuter les tests unitaires et d'intégration, utilisez la commande suivante :
```bash
  mvn test
```

## Gestion des Utilisateurs

Le contrôleur `UserController` gère les opérations CRUD (Create, Read, Update, Delete) pour les utilisateurs de l'application Dream Habitat.

### Endpoints

- **POST /api/users/addUser**  
  Crée un nouvel utilisateur.
    - **Requête** :
        - Corps : `UserCreateDTO` (nom, email, mot de passe)
    - **Réponse** :
        - `201 Created` avec l'objet `UserDTO` de l'utilisateur créé.

- **GET /api/users/{id}**  
  Récupère un utilisateur par son ID.
    - **Requête** :
        - Paramètre : `id` (ID de l'utilisateur)
    - **Réponse** :
        - `200 OK` avec l'objet `UserDTO` de l'utilisateur correspondant.

- **GET /api/users/**  
  Récupère la liste de tous les utilisateurs.
    - **Réponse** :
        - `200 OK` avec une liste d'objets `UserDTO`.

- **PUT /api/users/update/{id}**  
  Met à jour un utilisateur existant.
    - **Requête** :
        - Paramètre : `id` (ID de l'utilisateur)
        - Corps : `UserCreateDTO` (nom, email, mot de passe)
    - **Réponse** :
        - `200 OK` avec l'objet `UserDTO` mis à jour.

- **DELETE /api/users/delete/{id}**  
  Supprime un utilisateur par son ID.
    - **Requête** :
        - Paramètre : `id` (ID de l'utilisateur)
    - **Réponse** :
        - `204 No Content`
## Authentification des Utilisateurs

Le contrôleur `LoginController` permet aux utilisateurs de se connecter à l'application et génère des jetons JWT pour l'authentification.

### Endpoints

- **POST /api/login**  
  Authentifie un utilisateur et renvoie un jeton JWT.
    - **Requête** :
        - Corps : `LoginRequest` (email, mot de passe)
    - **Réponse** :
        - `200 OK` avec un objet `LoginResponse` contenant le jeton JWT si l'authentification est réussie.
        - `401 Unauthorized` si les informations d'identification sont incorrectes.
        - `404 Not Found` si l'utilisateur n'est pas trouvé.

## Gestion des Photos

Le contrôleur `PhotoController` permet de gérer l'upload et la récupération des photos associées à des rooms (pièces) dans l'application.

### Endpoints

- **POST /api/photo/upload**  
  Permet d'uploader une photo pour un utilisateur authentifié.
    - **Requête** :
        - Paramètres : `MultipartFile file`, `String name`, `String description`, `Room roomId`
        - En-tête : `Authorization` (Bearer token JWT)
    - **Réponse** :
        - `200 OK` si la photo est uploadée avec succès.
        - `401 Unauthorized` si l'utilisateur n'est pas authentifié.
        - `500 Internal Server Error` en cas de problème lors de l'upload.

- **GET /api/photo/room/{roomId}**  
  Récupère les photos associées à une pièce donnée (room).
    - **Requête** :
        - Paramètre d'URL : `Long roomId`
    - **Réponse** :
        - `200 OK` avec la liste des photos associées à la pièce.

## Gestion des Rooms

Le contrôleur `RoomController` permet de gérer les rooms (pièces) de l'application, y compris la création, la récupération de rooms par ID et la récupération de toutes les rooms associées à un utilisateur spécifique.

### Endpoints

- **POST /api/room/create**  
  Crée une nouvelle room.
    - **Requête** :
        - Corps de la requête : `RoomDTO` contenant les détails de la room.
    - **Réponse** :
        - `201 CREATED` avec les détails de la room nouvellement créée.
        - `400 BAD REQUEST` si le titre de la room est manquant.
        - `404 NOT FOUND` si l'utilisateur propriétaire de la room n'est pas trouvé.

- **GET /api/room/all**  
  Récupère toutes les rooms présentes dans l'application.
    - **Réponse** :
        - `200 OK` avec la liste de toutes les rooms.

- **GET /api/room/{albumId}**  
  Récupère une room par son ID.
    - **Paramètre d'URL** : `Long albumId`
    - **Réponse** :
        - `200 OK` avec les détails de la room.
        - `404 NOT FOUND` si la room n'est pas trouvée.

- **GET /api/room/user**  
  Récupère toutes les rooms associées à un utilisateur spécifié par le token JWT.
    - **En-tête** : `Authorization` (Bearer token JWT)
    - **Réponse** :
        - `200 OK` avec la liste des rooms de l'utilisateur.
        - `401 UNAUTHORIZED` si le token est manquant ou invalide.

#  Pour la configuration du back

- ajouter un fichier`.env` à la racine du projet
```
PWD=Mettez votre mot de passe pour la connexion à la base de donnée
```
- ajouter au fichier `/src/main/resources/application.properties`
  à la ligne ou se trouve spring.datasource.password mettez
```
spring.datasource.password= ${PWD}
```