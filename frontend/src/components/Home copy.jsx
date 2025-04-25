import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronUp, ChevronDown } from 'lucide-react';
import ImageApres from '../assets/img/image-apres.svg';
import ImageAvant from '../assets/img/image-avant.svg';

const Home = () => {
  const [isChatExpanded, setIsChatExpanded] = useState(true);

  return (
    <div className="relative min-h-screen">

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center">
       
          <div className="md:w-1/2 relative">
            <div className="w-full">
              <img src={ImageApres} alt="Après" className="w-full h-auto rounded-lg shadow-lg" />
            </div>
            <div className="absolute bottom-0 right-0 w-2/3">
              <img src={ImageAvant} alt="Avant" className="w-full h-auto rounded-lg shadow-lg border-4 border-white" />
            </div>
            <div className="absolute top-4 left-4 bg-white px-2 py-1 rounded-md text-sm font-bold">
              Après
            </div>
            <div className="absolute bottom-4 right-4 bg-white px-2 py-1 rounded-md text-sm font-bold">
              Avant
            </div>
          </div>
          
         
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
        </div>
      </div>


      <div className={`fixed bottom-4 right-4 z-50 w-96 bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 ease-in-out ${isChatExpanded ? 'h-[600px]' : 'h-14'}`}>
   
        <button
          onClick={() => setIsChatExpanded(!isChatExpanded)}
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 p-4 flex items-center justify-between cursor-pointer"
        >
          <span className="text-white font-semibold">Dream Habitat Assistant</span>
          {isChatExpanded ? (
            <ChevronDown className="w-5 h-5 text-white" />
          ) : (
            <ChevronUp className="w-5 h-5 text-white" />
          )}
        </button>

        <div className={`w-full h-[calc(100%-56px)] transition-all duration-300 ${isChatExpanded ? 'opacity-100' : 'opacity-0'}`}>
          <iframe
            src="https://copilotstudio.microsoft.com/environments/Default-901cb4ca-b862-4029-9306-e5cd0f6d9f86/bots/cr33b_dreamHabitat/webchat?_version_=2"
            frameBorder="0"
            className="w-full h-full"
            title="Dream Habitat Assistant"
            style={{ display: isChatExpanded ? 'block' : 'none' }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;