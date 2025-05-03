/**
 * @fileoverview Composant d'inscription utilisateur
 * @module SignUp
 * @description Ce composant gère l'inscription des nouveaux utilisateurs via un formulaire
 * avec support de l'inscription par email/mot de passe et via Google. Il inclut également
 * des validations de formulaire et la gestion des erreurs.
 */

import React, { useState, useCallback, memo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

/**
 * Composant d'en-tête de la page d'inscription
 * @function SignUpHeader
 * @description Affiche le titre de bienvenue et le bouton de mise à niveau Pro
 * @returns {JSX.Element} Le composant d'en-tête
 */
const SignUpHeader = memo(() => (
  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
    <h2 className="text-2xl font-bold text-blue-600 mb-2 sm:mb-0">Commençons</h2>
    <button className="bg-purple-400 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded-full text-sm flex items-center self-start sm:self-auto">
      Passer à Pro
      <span className="ml-1 text-yellow-300">👑</span>
    </button>
  </div>
));

/**
 * Composant de bouton d'inscription Google
 * @function GoogleSignUpButton
 * @description Affiche le bouton d'inscription Google et le séparateur
 * @returns {JSX.Element} Le composant de bouton Google
 */
const GoogleSignUpButton = memo(() => (
  <>
    <button className="w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-lg shadow flex items-center justify-center mb-4">
      <FcGoogle className="mr-2" size={20} />
      Inscrivez-vous avec Google
    </button>

    <div className="flex items-center mb-4">
      <div className="flex-grow border-t border-gray-300"></div>
      <span className="flex-shrink mx-4 text-gray-500">ou</span>
      <div className="flex-grow border-t border-gray-300"></div>
    </div>
  </>
));

/**
 * Composant de formulaire d'inscription
 * @function SignUpForm
 * @param {Object} props - Les propriétés du composant
 * @param {Object} props.formData - Les données du formulaire
 * @param {Function} props.handleInputChange - Gestionnaire de changement de champ
 * @param {Function} props.handleSubmit - Gestionnaire de soumission du formulaire
 * @param {string|null} props.error - Message d'erreur à afficher
 * @returns {JSX.Element} Le composant de formulaire
 */
const SignUpForm = memo(({ formData, handleInputChange, handleSubmit, error }) => (
  <form onSubmit={handleSubmit} role="form">
    {error && <p className="text-red-500 mb-4">{error}</p>}

    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="name"
      >
        Nom
      </label>
      <input
        className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="name"
        type="text"
        name="name"
        placeholder="Votre nom"
        value={formData.name}
        onChange={handleInputChange}
        required
      />
    </div>

    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="email"
      >
        E-mail
      </label>
      <input
        className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="email"
        type="email"
        name="email"
        placeholder="Votre email"
        value={formData.email}
        onChange={handleInputChange}
        required
      />
    </div>

    <div className="mb-6">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="password"
      >
        Mot de passe
      </label>
      <input
        className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        id="password"
        type="password"
        name="password"
        placeholder="Votre mot de passe"
        value={formData.password}
        onChange={handleInputChange}
        required
      />
    </div>

    <button
      className="w-full font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 transition duration-300 mb-4"
      type="submit"
    >
      Continuer
    </button>
  
    <p className="text-xs text-gray-500 mt-2">
      En vous inscrivant, vous acceptez nos{" "}
      <Link to="/conditions" className="text-blue-500 hover:text-blue-700">
        Conditions générales
      </Link>.
    </p>
  </form>
));

// Composant de pied de page mémorisé
const SignUpFooter = memo(() => (
  <p className="text-sm text-center mt-4">
    Déjà membre ?{" "}
    <Link to="/login" className="text-blue-500 hover:text-blue-700">
      Connectez-vous ici
    </Link>
  </p>
));

/**
 * Composant principal de la page d'inscription
 * @function SignUp
 * @description Gère l'ensemble du processus d'inscription, y compris la gestion des états
 * du formulaire, la validation et la soumission des données
 * @returns {JSX.Element} La page d'inscription complète
 */
const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  /**
   * Gestionnaire de changement de champ du formulaire
   * @function handleInputChange
   * @param {Event} e - L'événement de changement
   */
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  /**
   * Gestionnaire de soumission du formulaire
   * @function handleSubmit
   * @param {Event} e - L'événement de soumission
   * @async
   */
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("https://dreamhabitat.djaouti.com/api/users/addUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/login");
      } else {
        setError(data.message || "Erreur lors de l'inscription");
      }
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer.");
    }
  }, [formData, navigate]);

  return (
    <div className="flex flex-col items-center py-6 sm:py-10 bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 sm:p-8">
        <SignUpHeader />

        <p className="text-gray-600 mb-6">
          Un espace conçu par un designer que vous allez adorer, à un prix que
          vous aimerez encore plus !
        </p>

        <GoogleSignUpButton />
        <SignUpForm 
          formData={formData} 
          handleInputChange={handleInputChange} 
          handleSubmit={handleSubmit} 
          error={error} 
        />
        <SignUpFooter />
      </div>
    </div>
  );
};

export default SignUp;