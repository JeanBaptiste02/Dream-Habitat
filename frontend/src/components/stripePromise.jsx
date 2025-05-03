/**
 * @fileoverview Configuration et composants pour le paiement Stripe
 * @module stripePromise
 */

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

/**
 * Instance de Stripe initialisée avec la clé publique
 * @constant {Promise} stripePromise
 */
const stripePromise = loadStripe('votre_cle_publique_stripe');

/**
 * Composant de formulaire de paiement Stripe
 * @function CheckoutForm
 * @param {Object} props - Les propriétés du composant
 * @param {number} props.price - Le prix à payer
 * @param {number} props.credits - Le nombre de crédits achetés
 * @description Gère le processus de paiement avec Stripe et PayPal
 * @returns {JSX.Element} Formulaire de paiement avec options de carte bancaire et PayPal
 */
const CheckoutForm = ({ price, credits }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  /**
   * Gère la soumission du formulaire de paiement
   * @function handleSubmit
   * @param {Event} e - L'événement de soumission du formulaire
   * @async
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    // Ici vous devriez appeler votre backend pour finaliser le paiement
    console.log('Payment Method:', paymentMethod);
    alert('Paiement simulé réussi!');
    navigate('/success');
  };

  /**
   * Redirige vers PayPal pour le paiement
   * @function handlePayPal
   */
  const handlePayPal = () => {
    window.location.href = `https://www.paypal.com/paypalme/dreamhabitat/${price}EUR`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Détails de la carte
        </label>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
          className="p-3 border border-gray-300 rounded-lg"
        />
      </div>

      {error && (
        <div className="text-red-500 text-sm">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <button
          type="submit"
          disabled={!stripe || loading}
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium disabled:opacity-50"
        >
          {loading ? 'Traitement...' : `Payer ${price}€ par carte`}
        </button>

        <button
          type="button"
          onClick={handlePayPal}
          className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition-colors font-medium"
        >
          Payer avec PayPal
        </button>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          {credits} crédits seront ajoutés à votre compte
        </p>
        <div className="mt-4 flex justify-center space-x-4">
          <img src="/visa.svg" alt="Visa" className="h-8" />
          <img src="/mastercard.svg" alt="Mastercard" className="h-8" />
          <img src="/amex.svg" alt="American Express" className="h-8" />
        </div>
      </div>
    </form>
  );
};
