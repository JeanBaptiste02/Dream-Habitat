/**
 * @fileoverview Composant de connexion utilisateur
 * @module SignIn
 * @description Ce composant gère l'authentification des utilisateurs via un formulaire de connexion
 * avec support de la connexion par email/mot de passe et via Google. Il inclut également des liens
 * vers la réinitialisation de mot de passe et l'inscription.
 */

import React, { memo, useCallback } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, loginError } from '../../store/slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';

/**
 * Composant d'en-tête de la page de connexion
 * @function SignInHeader
 * @description Affiche le titre de bienvenue et le bouton de mise à niveau Pro
 * @returns {JSX.Element} Le composant d'en-tête
 */
const SignInHeader = memo(() => (
  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
    <h2 className="text-2xl font-bold text-blue-600 mb-2 sm:mb-0">Bon retour !</h2>
    <button className="bg-purple-400 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded-full text-sm flex items-center self-start sm:self-auto">
      Passer à Pro
      <span className="ml-1 text-yellow-300">👑</span>
    </button>
  </div>
));

/**
 * Composant de bouton de connexion Google
 * @function GoogleSignInButton
 * @description Affiche le bouton de connexion Google et le séparateur
 * @returns {JSX.Element} Le composant de bouton Google
 */
const GoogleSignInButton = memo(() => (
  <>
    <button className="w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-lg shadow flex items-center justify-center mb-4">
      <FcGoogle className="mr-2" size={20} />
      Se connecter avec Google
    </button>

    <div className="flex items-center mb-4">
      <div className="flex-grow border-t border-gray-300"></div>
      <span className="flex-shrink mx-4 text-gray-500">ou</span>
      <div className="flex-grow border-t border-gray-300"></div>
    </div>
  </>
));

/**
 * Composant des liens de bas de page
 * @function SignInFooterLinks
 * @description Affiche les liens vers la réinitialisation de mot de passe et l'inscription
 * @returns {JSX.Element} Le composant des liens de bas de page
 */
const SignInFooterLinks = memo(() => (
  <>
    <div className="text-sm text-gray-600">
      <Link to="/mot-de-passe-oublie" className="text-blue-500 hover:text-blue-700">
        Mot de passe oublié ? Cliquez ici pour réinitialiser.
      </Link>
    </div>

    <div className="mt-4 text-sm text-gray-600">
      <span>Vous n'avez pas de compte ? </span>
      <Link to="/register" className="text-blue-500 hover:text-blue-700">
        Inscrivez-vous ici.
      </Link>
    </div>
  </>
));

/**
 * Composant de formulaire de connexion
 * @function SignInForm
 * @param {Object} props - Les propriétés du composant
 * @param {Function} props.onSubmit - Gestionnaire de soumission du formulaire
 * @param {string|null} props.error - Message d'erreur à afficher
 * @returns {JSX.Element} Le composant de formulaire
 */
const SignInForm = memo(({ onSubmit, error }) => (
  <form className="mb-4" onSubmit={onSubmit} role="form">
    {error && <p className="text-red-500 mb-4">{error}</p>}
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
        E-mail
      </label>
      <input 
        className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
        name='email' 
        id="email" 
        type="email" 
        placeholder="Votre email" 
      />
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
        Mot de passe
      </label>
      <input 
        className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
        name='password' 
        id="password" 
        type="password" 
        placeholder="Votre mot de passe" 
      />
    </div>
    <button 
      className="w-full font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 transition duration-300" 
      type="submit"
    >
      Connexion
    </button>
  </form>
));

/**
 * Composant principal de la page de connexion
 * @function SignIn
 * @description Gère l'ensemble du processus de connexion, y compris la soumission du formulaire
 * et la gestion des erreurs d'authentification
 * @returns {JSX.Element} La page de connexion complète
 */
export default function SignIn() {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  const navigate = useNavigate();

  /**
   * Gestionnaire de soumission du formulaire
   * @function handleSubmit
   * @param {Event} e - L'événement de soumission du formulaire
   * @async
   */
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
  
    try {
      const response = await fetch('https://dreamhabitat.djaouti.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok && data.jwtToken) {
        dispatch(loginSuccess(data.jwtToken));
        navigate('/');
      } else {
        dispatch(loginError(data.message || 'Erreur de connexion'));
      }
    } catch (err) {
      dispatch(loginError('Erreur de connexion'));
    }
  }, [dispatch, navigate]);
  
  return (
    <div className="flex flex-col items-center py-6 sm:py-10 bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 sm:p-8">
        <SignInHeader />

        <p className="text-gray-600 mb-6">
          Connectez-vous à votre compte Dream Habitat.
        </p>

        <GoogleSignInButton />
        <SignInForm onSubmit={handleSubmit} error={error} />

        <div className="flex items-center justify-between mb-4">
          <label className="flex items-center text-sm text-gray-500">
            <input type="checkbox" className="mr-2 leading-tight" />
            Se souvenir de moi
          </label>
        </div>

        <SignInFooterLinks />
      </div>
    </div>
  );
}