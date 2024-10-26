import PictureGrid from '../components/PictureGrid';
import ShareModal from '../components/ShareModal';
import PictureModal from '../components/PictureModal';
import { usePictureStore } from '../store/pictureStore';

export default function Favorites() {
  const favorites = usePictureStore((state) => state.favorites);
  const pictures = usePictureStore((state) => 
    state.pictures.filter(pic => favorites.has(pic.id))
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Your Favorites</h1>
      {pictures.length === 0 ? (
        <div className="bg-white p-4 rounded-lg shadow text-center text-gray-600">
          You haven't added any pictures to your favorites yet.
        </div>
      ) : (
        <PictureGrid pictures={pictures} showFavorites={true} />
      )}
      <ShareModal />
      <PictureModal />
    </div>
  );
}