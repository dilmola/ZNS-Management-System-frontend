import React from 'react';

const ImageSection = ({ imageUrl }) => {
  return (
      <img className="w-full h-full object-cover p-3 inline rounded-large " src={imageUrl} alt="Your Image" />
  );
};

export default ImageSection;