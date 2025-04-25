import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CreateRoomType = () => {
  const [title, setTitle] = useState('');
  const [userRooms, setUserRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  // Liste complète des types de pièces possibles
  const allRoomTypes = [
    'Living room', 'Bedroom', 'Bath room', 'Attic', 'Kitchen',
    'Dining room', 'Study room', 'Home office', 'Gaming room',
    'House exterior', 'Outdoor pool area', 'Outdoor patio',
    'Outdoor garden', 'Meeting room', 'Workshop', 'Fitness gym',
    'Coffee shop', 'Clothing store', 'Walk in closet', 'Toilet',
    'Restaurant', 'Office', 'Coworking space', 'Hotel lobby',
    'Hotel room', 'Hotel bathroom', 'Exhibition space', 'Mudroom'
  ];

  // Obtenir les suggestions disponibles (non utilisées)
  const getAvailableSuggestions = () => {
    const existingTitles = userRooms.map(room => room.title);
    return allRoomTypes.filter(type => !existingTitles.includes(type));
  };

  const fetchUserRooms = async () => {
    try {
      const response = await fetch(`https://dreamhabitat.victor-zhang.fr/api/room/user`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      setUserRooms(data);
    } catch (err) {
      console.error('Erreur lors du chargement des pièces:', err);
      if (err.message.includes('403')) {
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserRooms();
    }
  }, [token]);

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    
    if (!token) {
      setError("Veuillez vous connecter pour créer une pièce");
      navigate('/login');
      return;
    }

    if (!title.trim()) {
      setError("Veuillez entrer un nom de pièce");
      return;
    }

    // Vérifier si le type existe déjà
    if (userRooms.some(room => room.title.toLowerCase() === title.trim().toLowerCase())) {
      setError("Ce type de pièce existe déjà dans votre collection");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://dreamhabitat.victor-zhang.fr/api/room/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: title.trim(),
          owner: {
            email: user.email
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      await fetchUserRooms();
      setTitle('');
      
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Section création */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Créer un nouveau type de pièce
          </h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleCreateRoom} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Nom de la pièce
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Entrez le nom de la pièce"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Types de pièces disponibles
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {getAvailableSuggestions().map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => setTitle(suggestion)}
                    className="text-sm p-2 text-gray-600 bg-gray-100 rounded-md hover:bg-blue-100 hover:text-blue-600 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold px-8 py-3 rounded-lg transition-all ${
                isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:from-purple-600 hover:to-blue-600'
              }`}
            >
              {isLoading ? 'Création...' : 'Créer la pièce'}
            </button>
          </form>
        </div>

        {/* Section des pièces existantes */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Vos types de pièces existants
          </h2>

          {userRooms.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              Vous n'avez pas encore créé de types de pièces
            </p>
          ) : (
            <div className="grid gap-4">
              {userRooms.map((room) => (
                <div
                  key={room.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="font-medium text-gray-700">{room.title}</span>
                  <button
                    onClick={() => navigate('/room-design', { state: { selectedType: room.title } })}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Sélectionner
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateRoomType;