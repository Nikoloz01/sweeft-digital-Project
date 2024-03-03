import React, { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchImages, UnsplashImage } from '../API/UnsplashService';
import ImageGallery from '../components/ImageGallery';
import SearchInput from '../components/SearchInput';
import Modal from '../components/Modal';

const MainPage: React.FC = () => {
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    const history = localStorage.getItem('searchHistory');
    return history ? JSON.parse(history) : [];
  });
  const [modalContent, setModalContent] = useState<UnsplashImage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const location = useLocation();

  const fetchMoreImages = useCallback(async () => {
    const fetchedImages = await fetchImages('', page + 1);
    // Filter out duplicates by comparing ids
    const uniqueImages = fetchedImages.filter(newImage => !images.some(existingImage => existingImage.id === newImage.id));
    setImages(prevImages => [...prevImages, ...uniqueImages]);
    setPage(prevPage => prevPage + 1);
  }, [page, images]);

  const handleSearch = useCallback(async (query: string) => {
    const fetchedImages = await fetchImages(query);
    setImages(fetchedImages);
    if (!searchHistory.includes(query)) {
      const updatedSearchHistory = [...searchHistory, query];
      setSearchHistory(updatedSearchHistory);
      localStorage.setItem('searchHistory', JSON.stringify(updatedSearchHistory));
    }
  }, [searchHistory]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      handleSearch(searchQuery);
    } else {
      const loadInitialImages = async () => {
        const initialImages = await fetchImages();
        setImages(initialImages);
      };
      loadInitialImages();
    }
  }, [handleSearch, location]);

  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight
      ) {
        fetchMoreImages();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [fetchMoreImages]);

  const handleImageClick = (image: UnsplashImage) => {
    setModalContent(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const sortedImages = [...images].sort((a, b) => (b.likes || 0) - (a.likes || 0));

  return (
    <div>
      <SearchInput onSearch={handleSearch} />
      <ImageGallery onImageClick={handleImageClick} images={sortedImages} />
      <Modal isOpen={isModalOpen} content={modalContent} onClose={closeModal} />
    </div>
  );
};

export default MainPage;
