import { useState, useRef, useEffect } from 'react';
import { Upload } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UploadZone from './UploadZone';

// Fonctions utilitaires
const isJsonResponse = (response) => {
  const contentType = response.headers.get('content-type');
  return contentType && contentType.includes('application/json');
};

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
  const user = useSelector((state) => state.auth.user);
  // Liste des types de pièces
  const allRoomTypes = [
    'Living room', 'Bedroom', 'Bath room', 'Attic', 'Kitchen',
    'Dining room', 'Study room', 'Home office', 'Gaming room',
    'House exterior', 'Outdoor pool area', 'Outdoor patio',
    'Outdoor garden', 'Meeting room', 'Workshop', 'Fitness gym',
    'Coffee shop', 'Clothing store', 'Walk in closet', 'Toilet',
    'Restaurant', 'Office', 'Coworking space', 'Hotel lobby',
    'Hotel room', 'Hotel bathroom', 'Exhibition space', 'Mudroom'
  ];
  // Liste des styles disponibles
  const styles = [
    'Eastern', 'Modern', 'Minimalist', 'Contemporary', 'Scandinavian',
    'Zen', 'Midcentury modern', 'Tropical', 'Art deco', 'Farmhouse',
    'Japanese design', 'Rustic', 'Bohemian', 'Coastal', 'Cottagecore',
    'Vintage', 'French country', 'Gaming room', 'Baroque', 'Ski chalet',
    'Christmas', 'Tribal', 'Medieval', 'Chinese New Year', 'Halloween',
    'Neoclassic'
  ];
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };
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

  // Gestion du drag & drop
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleFileInput = (e) => {
    const files = e.target.files;
    handleFiles(files);
  };

  // Validation et gestion des fichiers
  const validateImageFile = (file) => {
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
  };

  const handleFiles = async (files) => {
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
  };

  const handleUploadClick = () => {
    if (!selectedImage) {
      fileInputRef.current?.click();
    }
  };
  // Gestion de la génération d'image
  //   const handleRenderDesigns = async () => {
  //     if (!selectedImage) {
  //       setError('Veuillez d\'abord télécharger une image');
  //       return;
  //     }

  //     setError(null);
  //     setIsUploading(true);

  //     try {
  //       // 1. Trouver la pièce sélectionnée
  //       const selectedRoom = userRooms.find(room => room.title === selectedRoomType);
  //       if (!selectedRoom) {
  //         throw new Error('Type de pièce non trouvé');
  //       }

  //       // 2. Préparer le fichier
  //       const base64Response = await fetch(selectedImage);
  //       const blob = await base64Response.blob();
  //       const fileName = `room_${Date.now()}.jpg`;

  //       // Créer un nouveau fichier avec le type MIME explicite
  //       const file = new File([blob], fileName, { 
  //         type: 'image/jpeg',
  //         lastModified: Date.now()
  //       });

  //       // 3. Préparer et envoyer FormData
  //       const formData = new FormData();
  //       formData.append('file', file);
  //       formData.append('roomId', selectedRoom.id);
  //       formData.append('description', `Room design for ${selectedRoomType}`);
  //       formData.append('name', fileName);

  //       // 4. Upload de la photo
  //       const uploadResponse = await fetch('https://dreamhabitat.djaouti.com/api/photo/upload', {
  //         method: 'POST',
  //         headers: {
  //           'Authorization': `Bearer ${token}`
  //         },
  //         body: formData
  //       });

  //       if (!uploadResponse.ok) {
  //         const responseText = await uploadResponse.text();
  //         console.error('Upload error response:', responseText);
  //         throw new Error(`Échec de l'upload: ${uploadResponse.status}`);
  //       }
  //       const uploadData = await parseResponse(uploadResponse);
  //       console.log("282 uploadData : ",uploadData)
  //       if (!uploadData || !uploadData.id) {
  //         throw new Error('ID de photo manquant dans la réponse');
  //       }

  //       setUploadedPhotoId(uploadData.id);
  //       setIsUploading(false);
  //       setIsGenerating(true);

  //       // 5. Générer l'image IA
  //       const generateUrl = new URL('https://dreamhabitat.djaouti.com/api/interior/res');
  //       generateUrl.searchParams.append('style', selectedStyle);
  //       generateUrl.searchParams.append('room_type', selectedRoomType);
  //       generateUrl.searchParams.append('upscale', 'true');
  //       generateUrl.searchParams.append('model', 'sd15');
  //       generateUrl.searchParams.append('photo_id', uploadData.id);

  //       const generateResponse = await fetch(generateUrl.toString(), {
  //         headers: {
  //           'Authorization': `Bearer ${token}`,
  //           'Accept': 'application/json'
  //         }
  //       });

  //       if (!generateResponse.ok) {
  //         const errorText = await generateResponse.text();
  //         throw new Error(`Échec de la génération: ${generateResponse.status}`);
  //       }

  //       const generatedData = await parseResponse(generateResponse);

  //       if (!generatedData || !generatedData.path) {
  //         throw new Error('Chemin de l\'image généré manquant dans la réponse');
  //       }
  //       console.log("282 setGeneratedImage : ",setGeneratedImage(generatedData.path))
  //       setGeneratedImage(generatedData.path);


  //     } catch (error) {
  //       console.error('Error details:', error);
  //       setError(error.message || 'Une erreur est survenue');
  //     } finally {
  //       setIsUploading(false);
  //       setIsGenerating(false);
  //     }
  //   };
  const handleRenderDesigns = async () => {
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

      console.log('Generating with photo ID:', lastPhoto.id);

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
  };
  console.log("294 generatedImage : ", generatedImage)
  // Render conditionnel basé sur l'état
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

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4">Chargement...</p>
      </div>
    );
  }

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
      {error && (
        <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
          <button
            className="absolute top-0 right-0 p-4"
            onClick={() => setError(null)}
          >
            ×
          </button>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Colonne de gauche - Contrôles */}
        <div className="lg:w-1/3 space-y-8">
          {/* Section Upload */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Upload a photo of your room</h2>
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${isDragging
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 bg-gray-50 hover:border-blue-400'
                }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleUploadClick}
            >
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileInput}
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
                      setSelectedImage(null);
                      setGeneratedImage(null);
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Section Type de pièce */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Select Room Type</h2>
            <div className="flex items-center space-x-4">
              <select
                className="flex-1 p-3 border border-gray-300 rounded-lg bg-white"
                value={selectedRoomType}
                onChange={(e) => setSelectedRoomType(e.target.value)}
              >
                {allRoomTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <button
                onClick={() => navigate('/create-room-type')}
                className="p-3 text-blue-500 hover:text-blue-600 border border-blue-500 hover:border-blue-600 rounded-lg transition-colors"
                title="Créer un nouveau type"
              >
                +
              </button>
            </div>
          </div>

          {/* Section Style */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Select Style</h2>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg bg-white"
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value)}
            >
              {styles.map((style) => (
                <option key={style} value={style}>
                  {style}
                </option>
              ))}
            </select>
          </div>

          {/* Section Génération */}
          <div className="flex items-center justify-between pt-4">
            <button
              className={`flex-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold px-8 py-3 rounded-lg transition-all ${(isUploading || isGenerating) ? 'opacity-50 cursor-not-allowed' : 'hover:from-purple-600 hover:to-blue-600'
                }`}
              onClick={handleRenderDesigns}
              disabled={isUploading || isGenerating || !selectedImage}
            >
              {isUploading ? 'Uploading...' :
                isGenerating ? 'Generating...' :
                  'Render designs'}
            </button>
          </div>
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

              {/* Image générée */}
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

              {generatedImage && !isUploading && !isGenerating && (
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
                          link.download = `generated-${selectedRoomType}-${selectedStyle}.jpg`;
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;