import React, { useState, useRef, useCallback, memo } from 'react';
import { Upload } from 'lucide-react';

const UploadZone = memo(({ onImageSelect, selectedImage }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  
  // Utilisation de useCallback pour mémoriser les fonctions de gestion d'événements
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);
  
  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);
  
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    handleFiles(files);
  }, []);
  
  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);
  
  const handleFileInput = useCallback((e) => {
    const files = e.target.files;
    handleFiles(files);
  }, []);
  
  // Cette fonction est incluse dans les dépendances des useCallback ci-dessus
  const handleFiles = useCallback(async (files) => {
    if (files.length === 0) return;
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      onImageSelect(e.target.result);
    };
    reader.readAsDataURL(file);
  }, [onImageSelect]);
  
  // Composants d'UI mémorisés pour les états d'upload
  const UploadPrompt = memo(() => (
    <div className="text-center text-teal-400 p-6">
      <Upload size={48} className="mx-auto mb-4" />
      <p className="text-lg font-medium mb-2">Click to upload an image</p>
      <p className="text-sm text-teal-300">or drag and drop</p>
      <p className="text-xs text-teal-300 mt-2">JPG or PNG only</p>
    </div>
  ));
  
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