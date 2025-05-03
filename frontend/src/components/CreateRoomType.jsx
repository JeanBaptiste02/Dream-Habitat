import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CreateRoomType = () => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    
    if (!token) {
      setError("Veuillez vous connecter pour créer une pièce");
      navigate('/login');
      return;
    }

    if (!title.trim()) {
      setError("Veuillez entrer un nom de design");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://dreamhabitat.djaouti.com/api/room/create', {
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

      navigate('/room-design', { state: { selectedType: title.trim() } });
      
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Créer un nouveau design
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleCreateRoom} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Nom du design
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Entrez le nom du design"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold px-8 py-3 rounded-lg transition-all ${
              isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:from-purple-600 hover:to-blue-600'
            }`}
          >
            {isLoading ? 'Création...' : 'Créer le design'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRoomType;