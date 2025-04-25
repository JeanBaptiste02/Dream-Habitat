import React, { useState, useCallback, memo, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { ChevronUp, ChevronDown } from 'lucide-react';

// Import différé des images pour optimiser le chargement initial
import ImageApres from '../assets/img/image-apres.svg';
import ImageAvant from '../assets/img/image-avant.svg';

// Composant de chargement à afficher pendant le chargement des images
const ImageLoader = () => (
  <div className="w-full h-64 bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
    <p className="text-gray-500">Chargement des images...</p>
  </div>
);

// Composant pour les images avant/après mémorisé
// Au lieu de lazy loading pour les images


// Supprimez Suspense et utilisez un état pour gérer le chargement
const BeforeAfterImages = memo(() => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  return (
    <div className="md:w-1/2 relative">
      {!imagesLoaded && <ImageLoader />}
      <div className="w-full">
        <img 
          src={ImageApres} 
          alt="Après" 
          className="w-full h-auto rounded-lg shadow-lg" 
          onLoad={() => setImagesLoaded(true)}
          style={{ display: imagesLoaded ? 'block' : 'none' }}
        />
      </div>
      <div className="absolute bottom-0 right-0 w-2/3">
        <img 
          src={ImageAvant} 
          alt="Avant" 
          className="w-full h-auto rounded-lg shadow-lg border-4 border-white"
        />
      </div>
      <div className="absolute top-4 left-4 bg-white px-2 py-1 rounded-md text-sm font-bold">
        Après
      </div>
      <div className="absolute bottom-4 right-4 bg-white px-2 py-1 rounded-md text-sm font-bold">
        Avant
      </div>
    </div>
  );
});

// Composant pour le contenu textuel mémorisé
const HomeContent = memo(() => {
  return (
    <div className="md:w-1/2 md:pl-12 mt-8 md:mt-0">
      <h1 className="text-4xl font-bold mb-6">
        Transformez vos espaces intérieurs et extérieurs en un instant grâce à notre technologie IA
      </h1>
      <p className="text-xl mb-8">
        Choisissez un style, téléchargez votre photo, réinventez votre chez-vous maintenant
      </p>
      <Link
        to="/create-room-type"
        className="inline-block px-8 py-4 text-lg font-semibold text-white rounded-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition duration-300 ease-in-out transform hover:-translate-y-1"
      >
        Commencez
      </Link>
    </div>
  );
});

// Composant de chat assistant optimisé et mémorisé
const ChatAssistant = memo(({ isExpanded, toggleChat }) => {
  return (
    <div 
      className={`fixed bottom-4 right-4 z-50 w-96 bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'h-[600px]' : 'h-14'}`}
    >
      <button
        onClick={toggleChat}
        className="w-full bg-gradient-to-r from-purple-500 to-blue-500 p-4 flex items-center justify-between cursor-pointer"
      >
        <span className="text-white font-semibold">Dream Habitat Assistant</span>
        {isExpanded ? (
          <ChevronDown className="w-5 h-5 text-white" />
        ) : (
          <ChevronUp className="w-5 h-5 text-white" />
        )}
      </button>
      <div className={`w-full h-[calc(100%-56px)] transition-all duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
        {/* Chargement conditionnel de l'iframe uniquement lorsqu'elle est visible */}
        {isExpanded && (
          <iframe
            src="https://copilotstudio.microsoft.com/environments/Default-901cb4ca-b862-4029-9306-e5cd0f6d9f86/bots/cr33b_dreamHabitat/webchat?_version_=2"
            frameBorder="0"
            className="w-full h-full"
            title="Dream Habitat Assistant"
            loading="lazy"
          />
        )}
      </div>
    </div>
  );
});

const Home = () => {
  const [isChatExpanded, setIsChatExpanded] = useState(true);
  
  // Utilisation de useCallback pour éviter de recréer cette fonction à chaque rendu
  const toggleChat = useCallback(() => {
    setIsChatExpanded(prevState => !prevState);
  }, []);

  return (
    <div className="relative min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center">
          <BeforeAfterImages />
          <HomeContent />
        </div>
      </div>
      <ChatAssistant isExpanded={isChatExpanded} toggleChat={toggleChat} />
    </div>
  );
};

export default Home;