import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FaqPage = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const faqs = [
    {
      category: "Général",
      questions: [
        {
          q: "Qu'est-ce que DreamHabitat ?",
          a: "DreamHabitat est une plateforme innovante qui utilise l'intelligence artificielle pour transformer vos photos d'intérieur en rendus design personnalisés. Notre service vous permet de visualiser différents styles de décoration pour votre espace."
        },
        {
          q: "Comment fonctionne DreamHabitat ?",
          a: "C'est simple ! Téléchargez une photo de votre pièce, choisissez un style ou mode de design (créatif ou home staging), et notre IA générera plusieurs propositions de design pour votre espace. Vous pouvez ensuite affiner les résultats selon vos préférences."
        }
      ]
    },
    {
      category: "Tarification et Crédits",
      questions: [
        {
          q: "Comment fonctionnent les crédits ?",
          a: "Les crédits sont notre monnaie virtuelle. Chaque génération de design consomme un certain nombre de crédits. Vous pouvez acheter des crédits selon vos besoins et ils restent valables sans limite de temps."
        },
        {
          q: "Quels sont les différents forfaits disponibles ?",
          a: "Nous proposons plusieurs forfaits adaptés à différents besoins : packs de crédits ponctuels ou abonnements mensuels. Consultez notre page de tarification pour plus de détails."
        }
      ]
    },
    {
      category: "Technique",
      questions: [
        {
          q: "Quels formats de photos sont acceptés ?",
          a: "Nous acceptons les formats JPEG, PNG et HEIF. La taille maximale est de 10MB par image. Pour de meilleurs résultats, nous recommandons des photos bien éclairées avec une résolution minimum de 1024x1024 pixels."
        },
        {
          q: "Puis-je modifier mes designs générés ?",
          a: "Oui, vous pouvez régénérer un design avec des instructions différentes ou affiner les résultats en ajustant les paramètres. Chaque modification consommera des crédits supplémentaires."
        }
      ]
    },
    {
      category: "Compte et Sécurité",
      questions: [
        {
          q: "Comment créer un compte ?",
          a: "La création de compte se fait simplement via Apple Sign In, garantissant une connexion sécurisée et rapide. Sélectionnez simplement 'Se connecter avec Apple' sur notre page de connexion."
        },
        {
          q: "Mes données sont-elles sécurisées ?",
          a: "Oui, nous prenons la sécurité très au sérieux. Toutes les données sont chiffrées, et nous ne partageons jamais vos informations avec des tiers. Consultez notre politique de confidentialité pour plus de détails."
        }
      ]
    },
    {
      category: "Support",
      questions: [
        {
          q: "Comment puis-je contacter le support ?",
          a: "Notre équipe support est disponible par email à support@dreamhabitat.com. Nous nous efforçons de répondre dans les 24 heures ouvrées."
        },
        {
          q: "Que faire si je rencontre un problème technique ?",
          a: "Commencez par rafraîchir la page. Si le problème persiste, vérifiez notre guide de dépannage dans la section Support ou contactez notre équipe technique."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 via-purple-600 to-purple-700">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Questions Fréquentes</h1>
          
          <p className="text-gray-600 mb-8">
            Trouvez rapidement des réponses à vos questions sur DreamHabitat. Si vous ne trouvez pas ce que vous cherchez, n'hésitez pas à contacter notre support.
          </p>

          <div className="space-y-8">
            {faqs.map((category, categoryIndex) => (
              <div key={categoryIndex} className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">{category.category}</h2>
                
                {category.questions.map((faq, faqIndex) => (
                  <div key={faqIndex} className="border rounded-lg overflow-hidden">
                    <button
                      onClick={() => setExpandedSection(
                        expandedSection === `${categoryIndex}-${faqIndex}` 
                          ? null 
                          : `${categoryIndex}-${faqIndex}`
                      )}
                      className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center"
                    >
                      <span className="font-medium text-gray-900">{faq.q}</span>
                      {expandedSection === `${categoryIndex}-${faqIndex}` ? (
                        <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      )}
                    </button>
                    
                    {expandedSection === `${categoryIndex}-${faqIndex}` && (
                      <div className="px-6 py-4 bg-white">
                        <p className="text-gray-700">{faq.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Vous n'avez pas trouvé votre réponse ?</h3>
              <p className="text-gray-600 mb-4">Notre équipe support est là pour vous aider</p>
              <a 
                href="mailto:support@dreamhabitat.com"
                className="inline-flex items-center justify-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Contacter le support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;