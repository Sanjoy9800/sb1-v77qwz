import { create } from 'zustand';
import { PictureState, Picture } from '../types';

const MOCK_PICTURES: Picture[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44',
    title: 'Majestic Elephant',
    userId: '1',
    username: 'NaturePhotographer',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba',
    title: 'Mountain Peak',
    userId: '2',
    username: 'AdventureSeeker',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1682687221038-404670f01d03',
    title: 'Ocean Sunset',
    userId: '3',
    username: 'CoastalDreams',
    createdAt: new Date().toISOString(),
  },
];

export const usePictureStore = create<PictureState>((set, get) => ({
  pictures: [],
  favorites: new Set(),
  loading: false,
  hasMore: true,
  
  addPicture: async (picture) => {
    const { user } = JSON.parse(localStorage.getItem('user') || '{}');
    const newPicture: Picture = {
      ...picture,
      id: Math.random().toString(36).substring(7),
      createdAt: new Date().toISOString(),
      username: user?.username || 'Anonymous',
    };
    set((state) => ({
      pictures: [newPicture, ...state.pictures],
    }));
  },

  toggleFavorite: async (pictureId: string) => {
    set((state) => {
      const newFavorites = new Set(state.favorites);
      if (newFavorites.has(pictureId)) {
        newFavorites.delete(pictureId);
      } else {
        newFavorites.add(pictureId);
      }
      return { favorites: newFavorites };
    });
  },

  loadMorePictures: async () => {
    const { loading, hasMore, pictures } = get();
    if (loading || !hasMore) return;
    
    set({ loading: true });
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const newPictures = MOCK_PICTURES.map(pic => ({
      ...pic,
      id: Math.random().toString(36).substring(7),
    }));
    
    set((state) => ({
      pictures: [...state.pictures, ...newPictures],
      loading: false,
      hasMore: state.pictures.length < 100,
    }));
  },
}));