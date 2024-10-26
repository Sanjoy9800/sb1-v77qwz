import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import PictureGrid from '../components/PictureGrid';
import ShareModal from '../components/ShareModal';
import PictureModal from '../components/PictureModal';

export default function Home() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-6">
      {!user && (
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <Link to="/login" className="text-blue-500 hover:underline">
            login
          </Link>
          <span className="text-gray-600">
            {" "}to start sharing your favourite pictures with others!
          </span>
        </div>
      )}
      
      <PictureGrid />
      <ShareModal />
      <PictureModal />
    </div>
  );
}