import React from 'react';
import { UnsplashImage } from '../API/UnsplashService';

interface ImageGalleryProps {
  images: UnsplashImage[];
  onImageClick: (image: UnsplashImage) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onImageClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((image) => (
        <div key={image.id} className="rounded overflow-hidden shadow-md">
          <img
            src={image.urls.small}
            alt={image.alt_description || image.description || 'Unsplash Image'}
            className="w-full h-auto object-cover cursor-pointer"
            onClick={() => onImageClick(image)}
            style={{ maxHeight: '300px' }}
          />
          <div className="px-4 py-2">
            <p className="text-sm mb-2">Likes: {image.likes}</p>
            {image.description && <p className="text-sm mb-2">Description: {image.description}</p>}
            {image.alt_description && <p className="text-sm mb-2">Alt Description: {image.alt_description}</p>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
