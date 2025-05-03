/**
 * @fileoverview Composant de zone de téléchargement d'images avec support du drag and drop
 * @module UploadZone
 * @description Ce composant fournit une interface utilisateur pour télécharger des images
 * avec support du drag and drop et de la sélection par clic. Il gère également la prévisualisation
 * des images sélectionnées.
 */

import React, { useState, useRef, useCallback, memo } from 'react';
import { Upload } from 'lucide-react';

/**
 * Composant de zone de téléchargement d'images
 * @function UploadZone
 * @param {Object} props - Les propriétés du composant
 * @param {Function} props.onImageSelect - Callback appelé lorsqu'une image est sélectionnée
 * @param {string|null} props.selectedImage - L'URL de l'image actuellement sélectionnée
 * @returns {JSX.Element} Le composant de zone de téléchargement
 */
const UploadZone = memo(({ onImageSelect, selectedImage }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  
  /**
   * Gestionnaire d'événement drag over
   * @function handleDragOver
   * @param {DragEvent} e - L'événement de drag over
   */
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);
  
  /**
   * Gestionnaire d'événement drag leave
   * @function handleDragLeave
   * @param {DragEvent} e - L'événement de drag leave
   */
  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);
  
  /**
   * Gestionnaire d'événement drop
   * @function handleDrop
   * @param {DragEvent} e - L'événement de drop
   */
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    handleFiles(files);
  }, []);
  
  /**
   * Gestionnaire de clic sur la zone de téléchargement
   * @function handleClick
   */
  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);
  
  /**
   * Gestionnaire de changement de fichier
   * @function handleFileInput
   * @param {Event} e - L'événement de changement de fichier
   */
  const handleFileInput = useCallback((e) => {
    const files = e.target.files;
    handleFiles(files);
  }, []);
  
  /**
   * Traite les fichiers sélectionnés
   * @function handleFiles
   * @param {FileList} files - Liste des fichiers sélectionnés
   * @async
   */
  const handleFiles = useCallback(async (files) => {
    if (files.length === 0) return;
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      onImageSelect(e.target.result);
    };
    reader.readAsDataURL(file);
  }, [onImageSelect]);
  
  /**
   * Composant d'invite de téléchargement
   * @function UploadPrompt
   * @returns {JSX.Element} Le composant d'invite de téléchargement
   */
  const UploadPrompt = memo(() => (
    <div className="text-center text-teal-400 p-6">
      <Upload size={48} className="mx-auto mb-4" />
      <p className="text-lg font-medium mb-2">Click to upload an image</p>
      <p className="text-sm text-teal-300">or drag and drop</p>
      <p className="text-xs text-teal-300 mt-2">JPG or PNG only</p>
    </div>
  ));
  
  /**
   * Composant de prévisualisation d'image
   * @function ImagePreview
   * @param {Object} props - Les propriétés du composant
   * @param {string} props.src - L'URL de l'image à prévisualiser
   * @returns {JSX.Element} Le composant de prévisualisation d'image
   */
  const ImagePreview = memo(({ src }) => (
    <div className="relative w-full h-full group">
      <img
        src={src}
        alt="Original room"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
        <div className="text-center text-white">
          <Upload size={48} className="mx-auto mb-2" />
          <p className="text-sm">Click to change image</p>
        </div>
      </div>
    </div>
  ));
  
  return (
    <div
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        bg-gray-700
        rounded-xl
        aspect-[4/3]
        flex
        items-center
        justify-center
        cursor-pointer
        overflow-hidden
        transition-all
        ${isDragging ? 'bg-gray-600 border-2 border-teal-400' : 'hover:bg-gray-600'}
      `}
    >
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileInput}
        accept="image/jpeg,image/png"
      />
     
      {selectedImage ? (
        <ImagePreview src={selectedImage} />
      ) : (
        <UploadPrompt />
      )}
    </div>
  );
});

export default UploadZone;