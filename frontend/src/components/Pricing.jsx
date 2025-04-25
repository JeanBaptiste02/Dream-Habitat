import React from 'react';
import { Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PricingCard = ({ plan }) => {
  const navigate = useNavigate();

  const handleSelectPlan = () => {
    navigate('/payment', { 
      state: { plan }
    });
  };

  return (
    <div className="relative bg-white rounded-xl shadow-lg p-6 transition-all hover:shadow-xl hover:-translate-y-1">
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium">
            PLUS POPULAIRE
          </span>
        </div>
      )}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">{plan.credits} crédits</h2>
        <div className="text-4xl font-bold mb-4">
          {plan.price}€
          <span className="text-sm text-gray-500 font-normal"> / pack</span>
        </div>
        <p className="text-gray-600">{plan.description}</p>
        <p className="text-gray-500 text-sm mb-6">{plan.subtitle}</p>

        <button
          onClick={handleSelectPlan}
          className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors duration-200 
            ${plan.popular 
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600' 
              : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}
        >
          Choisir ce forfait
        </button>

        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="text-gray-600 text-sm mb-4 font-medium">
            Inclus dans ce forfait :
          </div>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center text-gray-600">
              <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Redesigns illimités
            </li>
            <li className="flex items-center text-gray-600">
              <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Support prioritaire
            </li>
            <li className="flex items-center text-gray-600">
              <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Haute qualité d'image
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const Features = () => (
  <div className="grid md:grid-cols-3 gap-8">
    <div className="text-center p-6 rounded-xl bg-blue-50">
      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold mb-2">Ultra rapide</h3>
      <p className="text-gray-600">Générez vos designs en quelques secondes</p>
    </div>
    <div className="text-center p-6 rounded-xl bg-purple-50">
      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold mb-2">Sécurisé</h3>
      <p className="text-gray-600">Vos données sont protégées</p>
    </div>
    <div className="text-center p-6 rounded-xl bg-green-50">
      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold mb-2">Haute qualité</h3>
      <p className="text-gray-600">Images en haute résolution</p>
    </div>
  </div>
);

const Testimonials = ({ testimonials }) => (
  <div className="grid md:grid-cols-3 gap-8">
    {testimonials.map((testimonial, index) => (
      <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-current text-yellow-400" />
          ))}
        </div>
        <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
          <div>
            <div className="font-medium">{testimonial.author}</div>
            <div className="text-sm text-gray-500">{testimonial.role}</div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const Pricing = () => {
  const pricingPlans = [
    {
      id: 'plan1',
      credits: 5,
      price: 10,
      description: "Idéal pour les petits projets",
      subtitle: "Soit 2€ par redesign"
    },
    {
      id: 'plan2',
      credits: 10,
      price: 20,
      description: "Notre formule la plus populaire",
      subtitle: "Soit 2€ par redesign",
      popular: true
    },
    {
      id: 'plan3',
      credits: 20,
      price: 30,
      description: "Pour les projets importants",
      subtitle: "Soit 1.5€ par redesign"
    }
  ];

  const testimonials = [
    {
      text: "Un outil révolutionnaire qui a transformé ma façon de concevoir les intérieurs.",
      author: "Sophie Martin",
      role: "Décoratrice d'intérieur"
    },
    {
      text: "Exactement ce dont j'avais besoin pour visualiser mes idées de décoration.",
      author: "Pierre Dubois",
      role: "Propriétaire"
    },
    {
      text: "La qualité des rendus est exceptionnelle. Je recommande vivement !",
      author: "Marie Laurent",
      role: "Architecte"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">
            Des prix <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">simples et transparents</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choisissez le forfait qui vous convient et commencez à transformer vos espaces dès aujourd'hui.
          </p>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>

        {/* Features */}
        <Features />

        {/* Testimonials */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              La satisfaction de nos <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">clients</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Découvrez ce que nos utilisateurs pensent de notre service
            </p>
          </div>
          <Testimonials testimonials={testimonials} />
        </div>
      </main>
    </div>
  );
};

export default Pricing;