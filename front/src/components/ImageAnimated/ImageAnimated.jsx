import React, { useState, useEffect } from 'react';

/**
 * 
 * @param {String} imageFixed
 * @param {String} imageAnimated 
 * @returns 
 */
function ImageAnimated({imageFixed , imageAnimated}) {
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    if (isClicked) {
      setTimeout(() => setIsClicked(false), 2280); // Désactiver l'affichage de la GIF après 1 seconde
    }
  }, [isClicked]);

  return (
    <>
      {isClicked ? (
        <img src={imageAnimated} alt="Gif" />
      ) : (
        <img src={imageFixed} alt="Image Fixe" onClick={() => setIsClicked(true)} />
      )}
    </>
  );
}

export default ImageAnimated;