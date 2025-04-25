import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Initialisez Stripe avec votre clé publique test


// Composant du formulaire de paiement
const CheckoutForm = ({ price, credits }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePayPal = () => {
    window.location.href = `https://paypal.me/dreamhabitat/${price}EUR`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });

      if (error) {
        setError(error.message);
        return;
      }

      console.log('Payment Method:', paymentMethod);
      alert('Paiement simulé réussi!');
      navigate('/success', { 
        state: { 
          paymentMethod: paymentMethod ,
          credits: credits 
        }
      });
    } catch (err) {
      setError('Une erreur est survenue lors du paiement');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Détails de la commande</h3>
          <div className="flex justify-between text-gray-600">
            <span>{credits} crédits</span>
            <span>{price}€</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Carte bancaire
            </label>
            <div className="border rounded-lg p-4">
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
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm mb-4">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={!stripe || loading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-4 rounded-lg font-medium transition-all hover:from-blue-600 hover:to-purple-600 disabled:opacity-50"
          >
            {loading ? 'Traitement...' : `Payer ${price}€`}
          </button>
        </form>

        <div className="mt-4">
          <button
            onClick={handlePayPal}
            className="w-full bg-[#0070BA] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#003087] transition-colors"
          >
            Payer avec PayPal
          </button>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500">
        <p>Paiement sécurisé</p>
      </div>
    </div>
  );
};

export default CheckoutForm;