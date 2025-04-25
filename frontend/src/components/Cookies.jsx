import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Cookies = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const sections = [
    {
      title: "Qu'est-ce qu'un cookie ?",
      content: "Un cookie est un petit fichier texte qui est placé et stocké sur votre ordinateur, smartphone ou tout autre appareil permettant d'accéder à Internet, lorsque vous visitez notre site. Les cookies permettent à un site web de reconnaître votre appareil lors de vos prochaines visites. Les cookies peuvent avoir de nombreuses fonctions différentes, comme vous permettre de naviguer efficacement entre les pages, mémoriser vos préférences et améliorer votre expérience de navigation."
    },
    {
      title: "Comment utilisons-nous les cookies ?",
      content: [
        "Cookies essentiels : Nécessaires au fonctionnement du site. Ils vous permettent de naviguer sur le site et d'utiliser ses fonctionnalités essentielles.",
        "Cookies analytiques : Nous permettent de comprendre comment les visiteurs utilisent notre site, de détecter les problèmes de navigation et d'améliorer le site.",
        "Cookies fonctionnels : Permettent d'améliorer votre expérience en mémorisant vos préférences et choix.",
        "Cookies de performance : Nous aident à comprendre comment les visiteurs interagissent avec le site en collectant des informations de manière anonyme."
      ]
    },
    {
      title: "Liste des cookies utilisés",
      content: [
        "auth_token : Cookie de session pour maintenir votre connexion",
        "preferences : Stocke vos préférences de navigation",
        "analytics_id : Utilisé pour l'analyse anonyme du trafic",
        "cookie_consent : Enregistre vos choix concernant les cookies"
      ]
    },
    {
      title: "Contrôle des cookies",
      content: "Vous pouvez contrôler et/ou supprimer des cookies comme vous le souhaitez. Vous pouvez supprimer tous les cookies déjà présents sur votre ordinateur et paramétrer la plupart des navigateurs pour qu'ils les bloquent. Toutefois, dans ce cas, vous devrez peut-être indiquer vous-mêmes certaines préférences chaque fois que vous vous rendrez sur le site."
    },
    {
      title: "Comment gérer vos préférences ?",
      content: [
        "Sur Chrome : Menu > Paramètres > Afficher les paramètres avancés > Confidentialité > Paramètres de contenu > Cookies",
        "Sur Firefox : Menu > Options > Vie privée et sécurité > Cookies et données de sites",
        "Sur Safari : Préférences > Confidentialité > Cookies et données de sites web",
        "Sur Edge : Paramètres > Cookies et autorisations > Gérer et supprimer les cookies"
      ]
    },
    {
      title: "Mise à jour de notre politique",
      content: "Nous nous réservons le droit de modifier cette politique de cookies à tout moment. Tout changement sera publié sur cette page et prendra effet dès sa publication. Nous vous encourageons à consulter régulièrement cette page pour rester informé des mises à jour."
    }
  ];

  return (
    <div className="min-h-screen  from-purple-500 via-purple-600 to-purple-700">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Politique des Cookies</h1>
          
          <p className="text-gray-600 mb-8">
            Chez DreamHabitat, nous utilisons des cookies et des technologies similaires pour améliorer votre expérience sur notre site. Cette politique explique comment nous utilisons les cookies et les choix qui s'offrent à vous.
          </p>

          <div className="space-y-4">
            {sections.map((section, index) => (
              <div key={index} className="border rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedSection(expandedSection === index ? null : index)}
                  className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center"
                >
                  <span className="font-semibold text-gray-900">{section.title}</span>
                  {expandedSection === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                
                {expandedSection === index && (
                  <div className="px-6 py-4 bg-white">
                    {Array.isArray(section.content) ? (
                      <ul className="space-y-2">
                        {section.content.map((item, i) => (
                          <li key={i} className="text-gray-700 pl-4 border-l-2 border-gray-200">
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-700">{section.content}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t">
            <p className="text-sm text-gray-500 text-center">
              Dernière mise à jour : {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cookies;