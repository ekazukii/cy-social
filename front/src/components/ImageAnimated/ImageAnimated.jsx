import React, { useState } from 'react';

/**
 *
 * @param {String} imageFixed
 * @param {String} imageAnimated
 * @returns
 */
function ImageAnimated({ imageFixed, imageAnimated, onClick }) {
  const [isClicked, setIsClicked] = useState(false);

  const trigger = () => {
    if (onClick) onClick();
    if (!isClicked) {
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 2280); // Désactiver l'affichage de la GIF après 1 seconde
    }
  };

  return (
    <>
      {isClicked ? (
        <img src={imageAnimated} alt="Gif" />
      ) : (
        <img src={imageFixed} alt="Image Fixe" onClick={() => trigger()} />
      )}
    </>
  );
}

export default ImageAnimated;
