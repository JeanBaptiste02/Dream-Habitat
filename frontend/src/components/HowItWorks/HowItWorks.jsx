import React from 'react';
import { motion } from 'framer-motion';

const HowItWorks = () => {
  const steps = [
    {
      title: "1. Création de votre compte",
      description: "Commencez par créer votre compte gratuitement. Cela vous permettra de sauvegarder vos transformations et de suivre l'historique de vos projets.",
      icon: "👤",
      tips: [
        "Cliquez sur 'S'inscrire' dans le menu principal",
        "Remplissez vos informations personnelles",
        "Validez votre email pour activer votre compte"
      ]
    },
    {
      title: "2. Préparation de votre image",
      description: "Sélectionnez une photo de la pièce que vous souhaitez transformer. Pour de meilleurs résultats :",
      icon: "📸",
      tips: [
        "Utilisez une photo bien éclairée de la pièce",
        "Assurez-vous que la pièce est bien visible et non encombrée",
        "Évitez les photos floues ou de mauvaise qualité"
      ]
    },
    {
      title: "3. Choix du style de décoration",
      description: "Explorez notre catalogue de styles de décoration et sélectionnez celui qui vous inspire :",
      icon: "🎨",
      tips: [
        "Parcourez les différentes catégories (moderne, classique, scandinave, etc.)",
        "Visualisez des exemples de transformations",
        "Sélectionnez le style qui correspond à vos goûts"
      ]
    },
    {
      title: "4. Transformation par l'IA",
      description: "Notre intelligence artificielle va analyser votre image et appliquer le style choisi :",
      icon: "🤖",
      tips: [
        "L'IA analyse la structure de votre pièce",
        "Elle applique le style de décoration sélectionné",
        "Le processus prend généralement quelques secondes"
      ]
    },
    {
      title: "5. Résultat et personnalisation",
      description: "Découvrez le résultat de la transformation et personnalisez-le selon vos préférences :",
      icon: "✨",
      tips: [
        "Visualisez la transformation en haute résolution",
        "Ajustez certains éléments si nécessaire",
        "Sauvegardez ou partagez votre projet"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Comment ça marche ?
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Transformez vos pièces en quelques clics grâce à notre IA
          </p>
          <div className="bg-blue-100 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-blue-900 mb-4">
              🎯 Notre Mission
            </h2>
            <p className="text-blue-800">
              Notre application utilise l'intelligence artificielle pour transformer vos photos de pièces en les redécorant selon le style de votre choix. 
              Visualisez instantanément comment votre espace pourrait être transformé avec différents styles de décoration.
            </p>
          </div>
        </motion.div>

        <div className="space-y-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-2xl">
                  {step.icon}
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-gray-600">
                    {step.description}
                  </p>
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Conseils pratiques :</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      {step.tips.map((tip, tipIndex) => (
                        <li key={tipIndex}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-center"
        >
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              💡 Astuces pour de meilleurs résultats
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Pour la photo :</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Prenez la photo en pleine journée</li>
                  <li>Évitez les contre-jours</li>
                  <li>Cadrez bien l'ensemble de la pièce</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Pour le style :</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Explorez plusieurs styles</li>
                  <li>Comparez les résultats</li>
                  <li>Notez vos préférences</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-blue-600 text-white rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">
              Prêt à transformer votre intérieur ?
            </h2>
            <p className="mb-6">
              Commencez dès maintenant et découvrez comment votre pièce pourrait être transformée
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300">
              Essayer maintenant
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HowItWorks; 