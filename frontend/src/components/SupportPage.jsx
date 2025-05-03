/**
 * @fileoverview Page de support client
 * @module SupportPage
 * @description Ce composant affiche les différentes options de support disponibles
 * pour les utilisateurs, y compris le chat en direct, l'email et le centre d'aide.
 * Il présente également une liste de problèmes fréquents et des informations de contact.
 */

import React from 'react';
import { Mail, MessageCircle, Clock, FileText, Phone, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Composant de page de support
 * @function SupportPage
 * @description Affiche une interface complète pour le support client avec
 * différentes options de contact et une liste de problèmes fréquents
 * @returns {JSX.Element} La page de support avec toutes les options de contact
 */
const SupportPage = () => {
  /**
   * Options de support disponibles
   * @constant {Array} supportOptions
   * @type {Array<Object>}
   * @property {JSX.Element} icon - L'icône représentant l'option
   * @property {string} title - Le titre de l'option
   * @property {string} description - La description de l'option
   * @property {string} buttonText - Le texte du bouton d'action
   * @property {string} [availability] - Les heures de disponibilité (optionnel)
   * @property {string} [link] - Le lien vers la ressource (optionnel)
   */
  const supportOptions = [
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Chat en direct",
      description: "Discutez en temps réel avec notre équipe de support",
      buttonText: "Démarrer un chat",
      availability: "Lun-Ven: 9h00 - 18h00"
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Email",
      description: "Envoyez-nous un email, nous vous répondrons sous 24h",
      buttonText: "Envoyer un email",
      link: "mailto:support@dreamhabitat.com"
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Centre d'aide",
      description: "Consultez notre base de connaissances",
      buttonText: "Voir les articles",
      link: "/faq"
    }
  ];

  /**
   * Liste des problèmes fréquemment rencontrés
   * @constant {Array} commonIssues
   * @type {Array<string>}
   */
  const commonIssues = [
    "Comment démarrer avec DreamHabitat ?",
    "Problèmes de paiement",
    "Gérer mon abonnement",
    "Qualité des rendus",
    "Problèmes techniques",
    "Questions sur les crédits"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 via-purple-600 to-purple-700">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-xl p-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Support DreamHabitat</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Notre équipe est là pour vous aider. Choisissez votre mode de contact préféré ou consultez notre centre d'aide.
            </p>
          </div>

          {/* Support Options Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {supportOptions.map((option, index) => (
              <div 
                key={index}
                className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="text-purple-600 flex justify-center mb-4">
                  {option.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {option.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {option.description}
                </p>
                {option.availability && (
                  <p className="text-sm text-gray-500 mb-4">
                    <Clock className="inline w-4 h-4 mr-1" />
                    {option.availability}
                  </p>
                )}
                <Link
                  to={option.link || '#'}
                  className="inline-block px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  {option.buttonText}
                </Link>
              </div>
            ))}
          </div>

          {/* Common Issues Section */}
          <div className="bg-gray-50 rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Problèmes fréquents
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {commonIssues.map((issue, index) => (
                <Link
                  key={index}
                  to="/faq"
                  className="flex items-center p-4 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <HelpCircle className="w-5 h-5 text-purple-600 mr-3" />
                  <span className="text-gray-700">{issue}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="mt-12 pt-8 border-t text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Autres moyens de nous contacter
            </h3>
            <div className="flex justify-center space-x-8">
              <div>
                <Phone className="w-5 h-5 text-purple-600 inline mr-2" />
                <span className="text-gray-600">+33 1 23 45 67 89</span>
              </div>
              <div>
                <Mail className="w-5 h-5 text-purple-600 inline mr-2" />
                <span className="text-gray-600">support@dreamhabitat.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;