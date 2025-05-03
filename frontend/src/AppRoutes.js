/**
 * @fileoverview Composant de routage de l'application
 * @module AppRoutes
 */

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

/**
 * Composant de routage qui définit les routes de l'application
 * @function AppRoutes
 * @description Composant qui gère la navigation entre les différentes pages de l'application
 * @returns {JSX.Element} L'élément JSX contenant les routes de l'application
 */
const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
        </Routes>
    );
};

export default AppRoutes;