/**
 * @fileoverview Composant principal pour la génération de designs d'intérieur
 * @module Room
 * @description Ce composant permet aux utilisateurs de télécharger une photo de leur pièce,
 * de sélectionner un type de pièce et un style, puis de générer un nouveau design.
 * Il gère également l'upload des images, la sélection des styles et l'affichage des résultats.
 */

import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import { Upload } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UploadZone from './UploadZone';

/**
 * Vérifie si la réponse est de type JSON
 * @function isJsonResponse
 * @param {Response} response - La réponse HTTP à vérifier
 * @returns {boolean} True si la réponse est de type JSON, false sinon
 */
const isJsonResponse = (response) => {
  const contentType = response.headers.get('content-type');
  return contentType && contentType.includes('application/json');
};

/**
 * Parse la réponse HTTP en JSON
 * @function parseResponse
 * @param {Response} response - La réponse HTTP à parser
 * @returns {Promise<Object>} Les données JSON parsées
 * @throws {Error} Si la réponse n'est pas un JSON valide ou si une erreur survient
 */
const parseResponse = async (response) => {
  try {
    const text = await response.text();
    try {
      return JSON.parse(text);
    } catch (e) {
      console.error('Texte reçu non-JSON:', text);
      throw new Error('Réponse invalide du serveur');
    }
  } catch (e) {
    throw new Error('Erreur lors de la lecture de la réponse');
  }
};

/**
 * Liste des types de pièces disponibles
 * @constant {Array<string>} ALL_ROOM_TYPES
 */
const ALL_ROOM_TYPES = [
  'Living room', 'Bedroom', 'Bath room', 'Attic', 'Kitchen',
  'Dining room', 'Study room', 'Home office', 'Gaming room',
  'House exterior', 'Outdoor pool area', 'Outdoor patio',
  'Outdoor garden', 'Meeting room', 'Workshop', 'Fitness gym',
  'Coffee shop', 'Clothing store', 'Walk in closet', 'Toilet',
  'Restaurant', 'Office', 'Coworking space', 'Hotel lobby',
  'Hotel room', 'Hotel bathroom', 'Exhibition space', 'Mudroom'
];

/**
 * Liste des styles de design disponibles
 * @constant {Array<string>} STYLES
 */
const STYLES = [
  'Eastern', 'Modern', 'Minimalist', 'Contemporary', 'Scandinavian',
  'Zen', 'Midcentury modern', 'Tropical', 'Art deco', 'Farmhouse',
  'Japanese design', 'Rustic', 'Bohemian', 'Coastal', 'Cottagecore',
  'Vintage', 'French country', 'Gaming room', 'Baroque', 'Ski chalet',
  'Christmas', 'Tribal', 'Medieval', 'Chinese New Year', 'Halloween',
  'Neoclassic'
];

/**
 * Composant d'affichage des messages d'erreur
 * @function ErrorMessage
 * @param {Object} props - Les propriétés du composant
 * @param {string} props.error - Le message d'erreur à afficher
 * @param {Function} props.onClose - Fonction appelée lors de la fermeture du message
 * @returns {JSX.Element|null} Le composant d'erreur ou null si aucune erreur
 */
const ErrorMessage = memo(({ error, onClose }) => {
  if (!error) return null;
  
  return (
    <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
      {error}
      <button
        className="absolute top-0 right-0 p-4"
        onClick={onClose}
      >
        ×
      </button>
    </div>
  );
});

/**
 * Composant d'indicateur de chargement
 * @function LoadingSpinner
 * @param {Object} props - Les propriétés du composant
 * @param {string} props.message - Le message à afficher pendant le chargement
 * @returns {JSX.Element} Le composant de chargement
 */
const LoadingSpinner = memo(({ message }) => (
  <div className="text-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
    <p className="mt-4">{message || 'Chargement...'}</p>
  </div>
));

/**
 * Composant de zone d'upload d'images
 * @function UploadSection
 * @param {Object} props - Les propriétés du composant
 * @param {string|null} props.selectedImage - L'URL de l'image sélectionnée
 * @param {boolean} props.isDragging - État du drag and drop
 * @param {Function} props.onDragOver - Gestionnaire d'événement drag over
 * @param {Function} props.onDragLeave - Gestionnaire d'événement drag leave
 * @param {Function} props.onDrop - Gestionnaire d'événement drop
 * @param {Function} props.onUploadClick - Gestionnaire de clic sur le bouton d'upload
 * @param {Object} props.fileInputRef - Référence à l'input de type file
 * @param {Function} props.onFileInput - Gestionnaire de changement de fichier
 * @param {Function} props.onImageRemove - Gestionnaire de suppression d'image
 * @returns {JSX.Element} Le composant de zone d'upload
 */
const UploadSection = memo(({ 
  selectedImage, 
  isDragging, 
  onDragOver, 
  onDragLeave, 
  onDrop, 
  onUploadClick, 
  fileInputRef, 
  onFileInput, 
  onImageRemove 
}) => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Upload a photo of your room</h2>
    <div
      className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
        isDragging
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-300 bg-gray-50 hover:border-blue-400'
      }`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={onUploadClick}
    >
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={onFileInput}
        accept="image/jpeg,image/png"
      />
      {!selectedImage ? (
        <>
          <button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold px-6 py-3 rounded-lg flex items-center justify-center mb-3 hover:from-purple-600 hover:to-blue-600 transition-all">
            <Upload className="mr-2" size={20} />
            Upload an image
          </button>
          <p className="text-gray-500 text-sm">...or drag and drop an image.</p>
        </>
      ) : (
        <div className="relative">
          <img
            src={selectedImage}
            alt="Uploaded room"
            className="w-full h-48 object-cover rounded-lg"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              onImageRemove();
            }}
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
          >
            ×
          </button>
        </div>
      )}
    </div>
  </div>
));

// Composant pour la sélection de type de pièce mémorisé
const RoomTypeSelector = memo(({ selectedRoomType, onRoomTypeChange, navigateToCreate }) => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Select Room Type</h2>
    <div className="flex items-center space-x-4">
      <select
        className="flex-1 p-3 border border-gray-300 rounded-lg bg-white"
        value={selectedRoomType}
        onChange={(e) => onRoomTypeChange(e.target.value)}
      >
        {ALL_ROOM_TYPES.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      <button
        onClick={navigateToCreate}
        className="p-3 text-blue-500 hover:text-blue-600 border border-blue-500 hover:border-blue-600 rounded-lg transition-colors"
        title="Créer un nouveau type"
      >
        +
      </button>
    </div>
  </div>
));

// Composant pour la sélection de style mémorisé
const StyleSelector = memo(({ selectedStyle, onStyleChange }) => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Select Style</h2>
    <select
      className="w-full p-3 border border-gray-300 rounded-lg bg-white"
      value={selectedStyle}
      onChange={(e) => onStyleChange(e.target.value)}
    >
      {STYLES.map((style) => (
        <option key={style} value={style}>
          {style}
        </option>
      ))}
    </select>
  </div>
));

// Composant pour le bouton de génération mémorisé
const GenerateButton = memo(({ onClick, isUploading, isGenerating, disabled }) => (
  <div className="flex items-center justify-between pt-4">
    <button
      className={`flex-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold px-8 py-3 rounded-lg transition-all ${
        (isUploading || isGenerating) ? 'opacity-50 cursor-not-allowed' : 'hover:from-purple-600 hover:to-blue-600'
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {isUploading ? 'Uploading...' :
        isGenerating ? 'Generating...' :
          'Render designs'}
    </button>
  </div>
));

// Composant pour l'image générée mémorisé
const GeneratedImage = memo(({ generatedImage, selectedStyle }) => {
  if (!generatedImage) return null;
  
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">
        Generated Design - {selectedStyle} Style
      </h3>
      <div className="bg-gray-700 rounded-xl aspect-[4/3] flex items-center justify-center overflow-hidden relative group">
        <img
          src={`https://api.interiordecorator.ai${generatedImage}`}
          alt="Generated design"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
          <a
            href={`https://api.interiordecorator.ai${generatedImage}`}
            download
            className="bg-white text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              const link = document.createElement('a');
              link.href = `https://api.interiordecorator.ai${generatedImage}`;
              link.download = `generated-${selectedStyle}.jpg`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
          >
            Download Image
          </a>
        </div>
      </div>
    </div>
  );
});

// Composant principal
const Room = () => {
  // États pour la gestion des images
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedRoomType, setSelectedRoomType] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('Modern');

  // États pour la gestion des données
  const [userRooms, setUserRooms] = useState([]);
  const [uploadedPhotoId, setUploadedPhotoId] = useState(null);
  const [generatedImage, setGeneratedImage] = useState(null);

  // États pour le chargement et les erreurs
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);

  // Références et hooks
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const token = useSelector((state) => state.auth.token);

  // Gestionnaires d'événements avec useCallback
  const handleImageClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    handleFiles(files);
  }, []);

  const handleFileInput = useCallback((e) => {
    const files = e.target.files;
    handleFiles(files);
  }, []);

  const validateImageFile = useCallback((file) => {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject(new Error('Aucun fichier sélectionné'));
        return;
      }

      // Vérifier le type MIME
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        reject(new Error('Format d\'image non supporté. Utilisez JPG ou PNG.'));
        return;
      }

      // Vérifier la taille (max 10MB)
      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        reject(new Error('Image trop grande. Maximum 10MB.'));
        return;
      }

      // Vérifier les dimensions
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);

      img.onload = () => {
        URL.revokeObjectURL(objectUrl);
        const maxDimension = 4096;
        if (img.width > maxDimension || img.height > maxDimension) {
          reject(new Error(`Image trop grande. Maximum ${maxDimension}x${maxDimension} pixels.`));
          return;
        }
        resolve(true);
      };

      img.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        reject(new Error('Image invalide ou corrompue.'));
      };

      img.src = objectUrl;
    });
  }, []);

  const handleFiles = useCallback(async (files) => {
    if (files.length === 0) return;

    const file = files[0];
    try {
      await validateImageFile(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        setGeneratedImage(null);
      };
      reader.onerror = () => {
        setError('Erreur lors de la lecture du fichier');
      };
      reader.readAsDataURL(file);
    } catch (error) {
      setError(error.message);
      setSelectedImage(null);
    }
  }, [validateImageFile]);

  const handleUploadClick = useCallback(() => {
    if (!selectedImage) {
      fileInputRef.current?.click();
    }
  }, [selectedImage]);

  const handleImageRemove = useCallback(() => {
    setSelectedImage(null);
    setGeneratedImage(null);
  }, []);

  const handleRenderDesigns = useCallback(async () => {
    if (!selectedImage) {
      setError('Veuillez d\'abord télécharger une image');
      return;
    }

    setError(null);
    setIsUploading(true);

    try {
      // 1. Trouver la pièce sélectionnée
      const selectedRoom = userRooms.find(room => room.title === selectedRoomType);
      if (!selectedRoom) {
        throw new Error('Type de pièce non trouvé');
      }

      // 2. Upload de la photo
      const base64Response = await fetch(selectedImage);
      const blob = await base64Response.blob();
      const fileName = `room_${Date.now()}.jpg`;

      const file = new File([blob], fileName, {
        type: 'image/jpeg',
        lastModified: Date.now()
      });
  
      const formData = new FormData();
      formData.append('file', file);
      formData.append('roomId', selectedRoom.id);
      formData.append('description', `Room design for ${selectedRoomType}`);
      formData.append('name', fileName);

      const uploadResponse = await fetch('https://dreamhabitat.djaouti.com/api/photo/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!uploadResponse.ok) {
        const responseText = await uploadResponse.text();
        console.error('Upload error response:', responseText);
        throw new Error(`Échec de l'upload: ${uploadResponse.status}`);
      }

      // 3. Récupérer les photos de la pièce pour obtenir l'ID de la dernière photo uploadée
      const photosResponse = await fetch(`https://dreamhabitat.djaouti.com/api/photo/room/${selectedRoom.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!photosResponse.ok) {
        throw new Error('Erreur lors de la récupération des photos');
      }

      const photos = await photosResponse.json();
      if (!Array.isArray(photos) || photos.length === 0) {
        throw new Error('Aucune photo trouvée pour cette pièce');
      }

      // Prendre la dernière photo uploadée (celle avec l'ID le plus élevé)
      const lastPhoto = photos.reduce((prev, current) =>
        (prev.id > current.id) ? prev : current
      );

      setUploadedPhotoId(lastPhoto.id);
      setIsUploading(false);
      setIsGenerating(true);

      // 4. Générer l'image IA avec l'ID de la dernière photo
      const generateUrl = new URL('https://dreamhabitat.djaouti.com/api/interior/res');
      generateUrl.searchParams.append('style', selectedStyle);
      generateUrl.searchParams.append('room_type', selectedRoomType);
      generateUrl.searchParams.append('upscale', 'true');
      generateUrl.searchParams.append('model', 'sd15');
      generateUrl.searchParams.append('photo_id', lastPhoto.id);

      const generateResponse = await fetch(generateUrl.toString(), {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      if (!generateResponse.ok) {
        throw new Error('Generation failed');
      }

      const generatedData = await generateResponse.json();
      if (!generatedData || !generatedData.path) {
        throw new Error('Chemin de l\'image généré manquant dans la réponse');
      }

      setGeneratedImage(generatedData.path);

    } catch (error) {
      console.error('Error details:', error);
      setError(error.message || 'Une erreur est survenue');
    } finally {
      setIsUploading(false);
      setIsGenerating(false);
    }
  }, [selectedImage, selectedRoomType, selectedStyle, token, userRooms]);

  // Effet pour charger les pièces de l'utilisateur
  useEffect(() => {
    const fetchUserRooms = async () => {
      if (!token) return;

      try {
        const response = await fetch('https://dreamhabitat.djaouti.com/api/room/user', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des pièces');
        }

        if (!isJsonResponse(response)) {
          throw new Error('Format de réponse invalide');
        }

        const data = await parseResponse(response);
        setUserRooms(data);

        // Sélectionner le type de pièce initial
        const selectedType = location.state?.selectedType;
        if (selectedType && data.some(room => room.title === selectedType)) {
          setSelectedRoomType(selectedType);
        } else if (data.length > 0) {
          setSelectedRoomType(data[0].title);
        }
      } catch (error) {
        console.error('Erreur:', error);
        setError('Erreur lors du chargement des pièces');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserRooms();
  }, [token, location.state]);

  // Render conditionnel si l'utilisateur n'est pas connecté
  if (!token) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-lg text-gray-600 mb-4">
            Veuillez vous connecter pour accéder à cette page
          </p>
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            Se connecter
          </button>
        </div>
      </div>
    );
  }

  // Render conditionnel pour le chargement
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <LoadingSpinner message="Chargement..." />
      </div>
    );
  }

  // Render conditionnel si aucune pièce n'est trouvée
  if (userRooms.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Aucun type de pièce créé
          </h2>
          <p className="text-gray-600 mb-6">
            Vous devez d'abord créer au moins un type de pièce pour continuer.
          </p>
          <button
            onClick={() => navigate('/create-room-type')}
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold px-8 py-3 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all"
          >
            Créer un type de pièce
          </button>
        </div>
      </div>
    );
  }

  // Render principal
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <ErrorMessage error={error} onClose={() => setError(null)} />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Colonne de gauche - Contrôles */}
        <div className="lg:w-1/3 space-y-8">
          {/* Section Upload */}
          <UploadSection
            selectedImage={selectedImage}
            isDragging={isDragging}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onUploadClick={handleUploadClick}
            fileInputRef={fileInputRef}
            onFileInput={handleFileInput}
            onImageRemove={handleImageRemove}
          />

          {/* Section Type de pièce */}
          <RoomTypeSelector
            selectedRoomType={selectedRoomType}
            onRoomTypeChange={setSelectedRoomType}
            navigateToCreate={() => navigate('/create-room-type')}
          />

          {/* Section Style */}
          <StyleSelector
            selectedStyle={selectedStyle}
            onStyleChange={(value) => setSelectedStyle(value)}
          />

          {/* Section Génération */}
          <GenerateButton
            onClick={handleRenderDesigns}
            isUploading={isUploading}
            isGenerating={isGenerating}
            disabled={isUploading || isGenerating || !selectedImage}
          />
        </div>

        {/* Colonne de droite - Prévisualisation */}
        <div className="lg:w-2/3">
          <div>
            <h1 className="text-3xl font-bold mb-4">
              Redesign your <span className="text-blue-500">{selectedRoomType}</span> in seconds
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              Upload a room, specify the room type, and select your room theme to redesign.
            </p>

            <div className="grid gap-8">
              {/* Image originale */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Original Image</h3>
                <div className="bg-gray-700 rounded-xl aspect-[4/3] flex items-center justify-center overflow-hidden">
                  <UploadZone
                    onImageSelect={(image) => {
                      setSelectedImage(image);
                      setGeneratedImage(null);
                    }}
                    selectedImage={selectedImage}
                  />
                </div>
              </div>

              {/* Image générée - état de chargement */}
              {(isUploading || isGenerating) && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Generated Design</h3>
                  <div className="bg-gray-700 rounded-xl aspect-[4/3] flex items-center justify-center">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                      <p className="text-white">
                        {isUploading ? 'Uploading your image...' : 'Generating your design...'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Image générée - résultat */}
              {generatedImage && !isUploading && !isGenerating && (
                <GeneratedImage 
                  generatedImage={generatedImage} 
                  selectedStyle={selectedStyle}
                  selectedRoomType={selectedRoomType}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;