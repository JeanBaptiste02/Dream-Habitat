import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CheckoutForm from"./CheckoutForm"
const stripePromise = loadStripe('pk_test_51QXSkWRnUB1GteDPhVKN4dRzRhTs4H2zA2gaB6AnW6OeZxf0C3I4pl4uCxg9gJxYznhj0BOipOCjQIVAccKZPr6q00Rd9pxhu7');
const Payment = () => {
  const location = useLocation();
  const plan = location.state?.plan;

  if (!plan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800">Plan non trouvé</h2>
          <p className="mt-2 text-gray-600">Veuillez sélectionner un plan depuis la page des tarifs.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Paiement sécurisé</h1>
          <p className="text-gray-600">{plan.description}</p>
        </div>

        <Elements stripe={stripePromise}>
          <CheckoutForm price={plan.price} credits={plan.credits} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;