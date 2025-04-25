import React from 'react';
import { Briefcase, MapPin, Users, Rocket, Heart, Code } from 'lucide-react';

const CareersPage = () => {
  const positions = [
    {
      title: "Développeur Full Stack",
      department: "Engineering",
      location: "Paris, France",
      type: "CDI",
      description: "Rejoignez notre équipe technique pour développer des fonctionnalités innovantes sur notre plateforme d'IA."
    },
    {
      title: "UI/UX Designer",
      department: "Design",
      location: "Paris, France / Remote",
      type: "CDI",
      description: "Créez des expériences utilisateur exceptionnelles pour notre application de design d'intérieur."
    },
    {
      title: "Chef de Produit",
      department: "Produit",
      location: "Paris, France",
      type: "CDI",
      description: "Définissez la vision produit et dirigez son développement en collaboration avec nos équipes."
    }
  ];

  const values = [
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Innovation",
      description: "Nous repoussons les limites de la technologie pour créer l'avenir du design d'intérieur."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Passion",
      description: "Nous sommes passionnés par la création d'expériences exceptionnelles pour nos utilisateurs."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Collaboration",
      description: "Nous croyons en la force du travail d'équipe et de la diversité des perspectives."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 via-purple-600 to-purple-700">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-xl p-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Rejoignez l'aventure DreamHabitat
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nous construisons le futur du design d'intérieur avec l'intelligence artificielle. 
              Rejoignez une équipe passionnée et innovante.
            </p>
          </div>

          {/* Values Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {values.map((value, index) => (
              <div 
                key={index}
                className="bg-gray-50 rounded-xl p-6 text-center"
              >
                <div className="text-purple-600 flex justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>

          {/* Open Positions Section */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">
              Postes ouverts
            </h2>
            <div className="space-y-6">
              {positions.map((position, index) => (
                <div 
                  key={index}
                  className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {position.title}
                      </h3>
                      <p className="text-gray-600">
                        {position.department} · {position.type}
                      </p>
                    </div>
                    <span className="px-4 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">
                      {position.location}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-4">
                    {position.description}
                  </p>
                  <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    Postuler
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mt-16 pt-8 border-t">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">
              Avantages
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <Code className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Technologie de pointe</h3>
                  <p className="text-gray-600">Travaillez avec les dernières technologies d'IA et de développement</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <MapPin className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Flexibilité du travail</h3>
                  <p className="text-gray-600">Travail hybride et horaires flexibles</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CareersPage;