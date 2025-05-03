/**
 * @fileoverview Page de confirmation de paiement réussi
 * @module PaymentSuccess
 */

import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CheckCircle } from 'lucide-react';
import { addCredits } from '../store/slices/orderSlice';

/**
 * Composant de confirmation de paiement
 * @function PaymentSuccess
 * @description Affiche les détails du paiement réussi et met à jour les crédits de l'utilisateur
 * @returns {JSX.Element} Page de confirmation de paiement avec les détails de la transaction
 */
const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const paymentDetails = location.state?.paymentMethod;
  const purchasedCredits = location.state?.credits || 0;

  /**
   * Met à jour les crédits de l'utilisateur après un paiement réussi
   * @function useEffect
   * @param {number} purchasedCredits - Nombre de crédits achetés
   */
  useEffect(() => {
    if (purchasedCredits > 0) {
      dispatch(addCredits(purchasedCredits));
    }
  }, [dispatch, purchasedCredits]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Paiement réussi !
            </h1>
            <p className="text-gray-600">
              Votre compte a été crédité de {purchasedCredits} crédits.
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Détails du paiement</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">ID Transaction</span>
                  <span className="font-medium">{paymentDetails?.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Carte</span>
                  <span className="font-medium">
                    {paymentDetails?.card.brand.toUpperCase()} **** **** **** {paymentDetails?.card.last4}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Crédits achetés</span>
                  <span className="font-medium">{purchasedCredits}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date</span>
                  <span className="font-medium">
                    {new Date(paymentDetails?.created * 1000).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={() => navigate('/profile')}
                className="flex-1 bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Voir mon profil
              </button>
              <button
                onClick={() => navigate('/')}
                className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Retour à l'accueil
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;