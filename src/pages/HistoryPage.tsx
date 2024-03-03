import React, { useState, useEffect } from 'react';
import { fetchImages, UnsplashImage } from '../API/UnsplashService';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import ImageGallery from '../components/ImageGallery';
import Modal from '../components/Modal';

const HistoryPage: React.FC = () => {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [modalContent, setModalContent] = useState<UnsplashImage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const history = localStorage.getItem('searchHistory');
    setSearchHistory(history ? JSON.parse(history) : []);
  }, []);

  const handleHistoryItemClick = async (term: string) => {
    const fetchedImages = await fetchImages(term);
    setImages(fetchedImages);
  };

  const deleteHistoryItem = (indexToDelete: number) => {
    const updatedHistory = searchHistory.filter((_, index) => index !== indexToDelete);
    setSearchHistory(updatedHistory);
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
  };

  const handleImageClick = (image: UnsplashImage) => {
    setModalContent(image);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-4">Search History</h2>
      {searchHistory.length > 0 ? (
        <ul className="space-y-4">
          {searchHistory.map((term, index) => (
            <li key={index} className="flex items-center">
              <button onClick={() => handleHistoryItemClick(term)} className="text-lg font-medium text-gray-800 hover:text-blue-600 focus:outline-none focus:text-blue-600 mr-2">
                {term}
              </button>
              <button onClick={() => deleteHistoryItem(index)} className="text-gray-500 hover:text-red-600 focus:outline-none">
                <AiOutlineCloseCircle className="w-5 h-5" />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-lg text-gray-600">No search history found.</p>
      )}
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {isModalOpen && modalContent && (
        <Modal isOpen={isModalOpen} content={modalContent} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default HistoryPage;
