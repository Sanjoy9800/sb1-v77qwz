import { useState } from 'react';
import { X } from 'lucide-react';
import { useModalStore } from '../store/modalStore';
import { usePictureStore } from '../store/pictureStore';
import { useAuthStore } from '../store/authStore';

export default function ShareModal() {
  const { isShareOpen, closeShareModal } = useModalStore();
  const { addPicture } = usePictureStore();
  const { user } = useAuthStore();
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  if (!isShareOpen || !user) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!url.trim() || !title.trim()) {
      setError('Please fill in all fields');
      return;
    }

    try {
      await addPicture({
        url,
        title,
        userId: user.id,
      });
      setUrl('');
      setTitle('');
      closeShareModal();
    } catch (err) {
      setError('Failed to share picture. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Share A New Picture</h2>
          <button
            onClick={closeShareModal}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}
          
          <div>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="New picture URL"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={closeShareModal}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Share
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}