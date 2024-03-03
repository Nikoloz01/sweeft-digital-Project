import React from 'react';

interface ModalProps {
  isOpen: boolean;
  content: {
    urls: {
      small: string;
      full?: string;
    };
    alt_description?: string;
    description?: string;
    photographer?: string;
    location?: string;
    likes?: number;
    category?: string;
  } | null;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, content, onClose, onPrevious, onNext }) => {
  if (!isOpen || !content) return null;

  const imageUrl = content.urls.full || content.urls.small;

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-10 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg overflow-auto h-full max-h-[800px] w-full max-w-[1400px] p-6 space-y-4">
        <div className="flex justify-between items-center">
          {onPrevious && <button onClick={onPrevious} className="text-2xl font-bold">&#8592;</button>}
          <button onClick={onClose} className="text-xl font-bold">&times;</button>
          {onNext && <button onClick={onNext} className="text-2xl font-bold">&#8594;</button>}
        </div>
        <img src={imageUrl} alt={content.alt_description || 'Unsplash Image'} className="w-full max-w-[560px] mx-auto max-h-[600px] rounded" />
        <div className="mt-4">
          <p className="font-bold">Description: {content.description || 'N/A'}</p>
          <p className="font-bold">Photographer: {content.photographer || 'N/A'}</p>
          <p className="font-bold">Location: {content.location || 'N/A'}</p>
          <p className="font-bold">Likes: {content.likes !== undefined ? content.likes : 'N/A'}</p>
          <p className="font-bold">Category: {content.category || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
