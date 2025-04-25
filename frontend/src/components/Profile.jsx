
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/slices/authSlice';
import { clearOrders } from '../store/slices/orderSlice';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { orders, credits } = useSelector((state) => state.orders);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearOrders());
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* En-tête du profil */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                {user.email?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">{user.email}</h1>
                <p className="text-sm text-gray-500">ID: {user.id}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors"
            >
              Se déconnecter
            </button>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Crédits */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-2">Crédits disponibles</h2>
            <div className="text-3xl font-bold text-blue-500 mb-2">
              {credits} crédits
            </div>
            <p className="text-sm text-gray-500">
              Dernière mise à jour : {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Historique des commandes */}
          <div className="md:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Historique des commandes</h2>
            {orders.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Aucune commande effectuée</p>
                <button
                  onClick={() => navigate('/tarifs')}
                  className="mt-4 text-blue-500 hover:text-blue-600"
                >
                  Acheter des crédits
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="border-b pb-4">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Commande #{order.id}</span>
                      <span className="text-green-500 font-medium">
                        {order.status === 'completed' ? 'Complété' : 'En cours'}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                        <p>Crédits: {order.credits}</p>
                      </div>
                      <div>
                        <p>Montant: {order.amount}€</p>
                        <p>Paiement: {order.paymentId.substring(0, 12)}...</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;