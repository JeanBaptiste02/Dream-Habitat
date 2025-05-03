/**
 * @fileoverview Point d'entrée principal de l'application React
 * @module main
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

/**
 * Point d'entrée de l'application qui initialise le rendu React
 * @function
 * @description Crée la racine React et rend l'application dans le mode strict
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
