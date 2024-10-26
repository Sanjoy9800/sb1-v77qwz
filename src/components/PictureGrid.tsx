import { useEffect, useRef, useCallback } from 'react';
import { Heart } from 'lucide-react';
import { usePictureStore } from '../store/pictureStore';
import { useModalStore } from '../store/modalStore';
import { useAuthStore } from '../store/authStore';
import { Picture } from '../types';

interface PictureGridProps {
  pictures?: Picture[];
  showFavorites?: boolean;
}

export default function PictureGrid({ pictures: propPictures, showFavorites }: PictureGridProps) {
  const { pictures: storePictures, favorites, loading, hasMore, loadMorePictures, toggleFavorite } = usePictureStore();
  const { user } = useAuthStore();
  const { openPictureModal } = useModalStore();
  const observer = useRef<IntersectionObserver>();
  
  const pictures = propPictures || storePictures;

  const lastPictureRef = useCallback((node: HTMLDivElement | null) => {
    if (loading || showFavorites) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMorePictures();
      }
    });

    if (node) observer.current.observe(node);
  }, [loading, hasMore, loadMorePictures, showFavorites]);

  useEffect(() => {
    if (!showFavorites) {
      loadMorePictures();
    }
  }, [showFavorites, loadMorePictures]);

  const handleFavorite = (e: React.MouseEvent, picture: Picture) => {
    e.stopPropagation();
    if (user) {
      toggleFavorite(picture.id);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {pictures.map((picture, index) => (
        <div
          key={picture.id}
          ref={!showFavorites && index === pictures.length - 1 ? lastPictureRef : null}
          className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition hover:scale-105"
          onClick={() => openPictureModal(picture)}
        >
          <div className="relative aspect-square">
            <img
              src={picture.url}
              alt={picture.title}
              className="w-full h-full object-cover"
            />
            {user && (
              <button
                onClick={(e) => handleFavorite(e, picture)}
                className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white"
              >
                <Heart
                  className={`w-5 h-5 ${
                    favorites.has(picture.id)
                      ? 'fill-red-500 stroke-red-500'
                      : 'stroke-gray-600'
                  }`}
                />
              </button>
            )}
          </div>
          <div className="p-4">
            <h3 className="font-medium text-gray-900">{picture.title}</h3>
            <div className="mt-1 text-sm text-gray-500">
              <span>{picture.username}</span>
              <span className="mx-1">•</span>
              <span>{new Date(picture.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      ))}
      {!showFavorites && loading && (
        <div className="col-span-full flex justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      )}
    </div>
  );
}