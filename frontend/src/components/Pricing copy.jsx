import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { PayPalButtons } from "@paypal/react-paypal-js";
import { Navigate } from 'react-router-dom';

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const pricingPlans = [
    {
      credits: 5,
      price: 10,
      description: "5 redesigns de pièce",
      subtitle: "Pour chaque redesign généré"
    },
    {
      credits: 10,
      price: 20,
      description: "10 redesigns de pièce",
      subtitle: "Pour chaque redesign généré",
      popular: true
    },
    {
      credits: 20,
      price: 30,
      description: "20 redesigns de pièce",
      subtitle: "Pour chaque redesign généré"
    }
  ];

  const features = [
    "Support premium par email",
    "Utilisation commerciale des crédits",
    "Bientôt: Sauvegarde de vos pièces dans un tableau de bord",
    "Possibilité de demander des fonctionnalités",
    "Accès anticipé aux nouvelles fonctionnalités",
    "Bientôt: Types de pièces et styles premium"
  ];

  const testimonials = [
    {
      text: "C'est incroyable, plus besoin de designer coûteux !",
      author: "Sophie Martin",
      role: "Décoratrice d'intérieur"
    },
    {
      text: "Enfin ! Quelque chose pour m'aider à décorer ma maison sans stress !",
      author: "Pierre Dubois",
      role: "Propriétaire"
    },
    {
      text: "Cette application a transformé mon espace ! C'est génial.",
      author: "Marie Laurent",
      role: "Architecte"
    },
    {
      text: "On peut voir sa pièce dans différents styles avant d'investir !",
      author: "Julie",
      role: "Designer d'intérieur"
    },
    {
      text: "Tellement satisfait de cette application ! Une vraie révolution !",
      author: "Emmanuel Petit",
      role: "Designer produit"
    },
    {
      text: "La meilleure IA que j'ai utilisée jusqu'à présent.",
      author: "Paul Dubois",
      role: "Designer"
    }
  ];

  const handlePaymentSuccess = async (details, plan) => {
    try {
      // Ici, vous pourriez appeler votre API pour créditer le compte
      console.log("Payment successful", details);
      alert(`Paiement réussi ! ${plan.credits} crédits seront ajoutés à votre compte.`);
      setSelectedPlan(null);
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("Une erreur est survenue lors du traitement du paiement.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Achetez des crédits <span className="text-blue-500">Dream Habitat</span>
          </h1>
          <p className="text-gray-600">
            Il vous reste 1 crédit - Rejoignez des milliers de clients satisfaits
          </p>
        </div>

        {/* Cartes de prix */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {pricingPlans.map((plan, index) => (
            <div key={index} className="relative bg-white rounded-xl shadow-lg p-6">
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    PLUS POPULAIRE
                  </span>
                </div>
              )}
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">{plan.credits} crédits</h2>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <p className="text-gray-500 text-sm mb-4">{plan.subtitle}</p>
                <div className="text-3xl font-bold mb-6">{plan.price}€</div>

                <button
                onClick={() => Navigate('/payment')}
                  // onClick={() => setSelectedPlan(plan)}
                  className={`w-full py-2 rounded-lg font-medium mb-4 ${
                    plan.popular
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                  }`}
                >
                  {selectedPlan === plan ? 'Plan sélectionné' : 'Choisir ce plan'}
                </button>

                {selectedPlan === plan && (
                  <div className="mt-4">
                    <PayPalButtons
                      style={{ 
                        layout: "horizontal",
                        color: "blue",
                        shape: "rect",
                        label: "pay"
                      }}
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                value: plan.price.toString(),
                                currency_code: "EUR"
                              },
                              description: `${plan.credits} crédits Dream Habitat`
                            }
                          ]
                        });
                      }}
                      onApprove={async (data, actions) => {
                        const details = await actions.order.capture();
                        await handlePaymentSuccess(details, plan);
                      }}
                      onError={(err) => {
                        console.error("PayPal error:", err);
                        alert("Une erreur est survenue avec PayPal. Veuillez réessayer.");
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Fonctionnalités incluses */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Ce qui est inclus</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-600">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Témoignages */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Aimé par beaucoup <span className="text-blue-500">dans le monde.</span>
            </h2>
            <p className="text-gray-600">
              Découvrez ce que nos utilisateurs disent de notre produit.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div>
                    <div className="font-medium">{testimonial.author}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>


    </div>
  );
};

export default Pricing;