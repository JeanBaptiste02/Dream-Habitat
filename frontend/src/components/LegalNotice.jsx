/**
 * @fileoverview Page des mentions légales
 * @module LegalNotice
 * @description Ce composant affiche les mentions légales de l'application DreamHabitat,
 * organisées en sections dépliables pour une meilleure lisibilité. Il couvre les aspects
 * juridiques tels que l'éditeur, l'hébergement, la propriété intellectuelle, la protection
 * des données, les cookies, la responsabilité et le droit applicable.
 */

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

/**
 * Composant des mentions légales
 * @function LegalNotice
 * @description Affiche les mentions légales de l'application avec des sections dépliables
 * @returns {JSX.Element} La page des mentions légales avec toutes les sections
 */
const LegalNotice = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  /**
   * Sections des mentions légales
   * @constant {Array} sections
   * @type {Array<Object>}
   * @property {string} title - Le titre de la section
   * @property {string|Array<string>} content - Le contenu de la section
   */
  const sections = [
    {
      title: "1. Éditeur du site",
      content: [
        "DreamHabitat est édité par :",
        "Monsieur Nathan IBGUI et son équipe",
        "Entrepreneur individuel",
        "Email : contact@dreamhabitat.com",
        "Téléphone : [Numéro de téléphone]"
      ]
    },
    {
      title: "2. Hébergement",
      content: [
        "Les serveurs de l'application DreamHabitat sont hébergés par :",
        "Google Cloud Platform",
        "Le site web DreamHabitat.com est hébergé par :",
        "[Nom de l'hébergeur]",
        "[Adresse de l'hébergeur]"
      ]
    },
    {
      title: "3. Propriété intellectuelle",
      content: [
        "Le site DreamHabitat et l'ensemble de son contenu sont protégés par le droit d'auteur et le droit des marques.",
        "Toute reproduction, représentation, modification, publication, transmission, dénaturation, totale ou partielle du site ou de son contenu, par quelque procédé que ce soit, et sur quelque support que ce soit est interdite.",
        "La marque DreamHabitat, les logos, graphismes et autres signes distinctifs sont la propriété exclusive de Monsieur Nathan IBGUI et son équipe."
      ]
    },
    {
      title: "4. Protection des données personnelles",
      content: [
        "Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants concernant vos données personnelles :",
        "- Droit d'accès",
        "- Droit de rectification",
        "- Droit à l'effacement",
        "- Droit à la limitation du traitement",
        "- Droit à la portabilité",
        "Pour exercer ces droits, contactez-nous à : privacy@dreamhabitat.com"
      ]
    },
    {
      title: "5. Cookies",
      content: "Pour en savoir plus sur l'utilisation des cookies, veuillez consulter notre Politique de Cookies accessible sur notre site."
    },
    {
      title: "6. Responsabilité",
      content: [
        "DreamHabitat met tout en œuvre pour assurer l'exactitude et la mise à jour des informations diffusées sur le site.",
        "DreamHabitat se réserve le droit de modifier le contenu du site à tout moment et sans préavis.",
        "DreamHabitat ne peut être tenu responsable des éventuelles erreurs, d'une absence de disponibilité des informations, ou de la présence de virus sur le site."
      ]
    },
    {
      title: "7. Droit applicable",
      content: [
        "Les présentes mentions légales sont soumises au droit français.",
        "En cas de litige, les tribunaux français seront seuls compétents.",
        "Tribunal compétent : Bordeaux"
      ]
    },
    {
      title: "8. Contact",
      content: [
        "Pour toute question concernant les présentes mentions légales, vous pouvez nous contacter :",
        "- Par email : contact@dreamhabitat.com",
        "- Par courrier : [Adresse postale]",
        "- Via notre formulaire de contact"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 via-purple-600 to-purple-700">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Mentions Légales</h1>
          
          <p className="text-gray-600 mb-8">
            Conformément aux dispositions des articles 6-III et 19 de la Loi n° 2004-575 du 21 juin 2004 pour la Confiance dans l'économie numérique, dite L.C.E.N., nous portons à la connaissance des utilisateurs et visiteurs du site DreamHabitat les informations suivantes.
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
                          <li key={i} className="text-gray-700">
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

export default LegalNotice;