// UnsplashService.ts
import axios from 'axios';

const ACCESS_KEY = 'RaF70okkuNzCawGrDMA7MqfnqVIG-RS_GiLJlLPhqeg';

export interface UnsplashImage {
  id: string;
  urls: {
    small: string;
    full?: string;
  };
  alt_description?: string;
  description?: string;
  likes: number;
}

export const fetchImages = async (query?: string, page: number = 1, perPage: number = 10): Promise<UnsplashImage[]> => {
  const baseUrl = 'https://api.unsplash.com';
  const url = query
    ? `${baseUrl}/search/photos?page=${page}&per_page=${perPage}&query=${encodeURIComponent(query)}&client_id=${ACCESS_KEY}`
    : `${baseUrl}/photos?page=${page}&per_page=${perPage}&client_id=${ACCESS_KEY}`;

  try {
    const response = await axios.get(url);
    const data = query ? response.data.results : response.data;
    return data.map((item: any) => ({
      id: item.id,
      urls: item.urls,
      alt_description: item.alt_description,
      description: item.description,
      likes: item.likes,
    }));
  } catch (error) {
    console.error("Error fetching images from Unsplash:", error);
    return [];
  }
};
