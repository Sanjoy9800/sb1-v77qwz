import { X } from 'lucide-react';
import { useModalStore } from '../store/modalStore';

export default function PictureModal() {
  const { isPictureOpen, selectedPicture, closePictureModal } = useModalStore();

  if (!isPictureOpen || !selectedPicture) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50">
      <button
        onClick={closePictureModal}
        className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-full"
      >
        <X className="w-6 h-6" />
      </button>
      
      <div className="max-w-4xl w-full">
        <div className="text-white mb-4">
          <span className="font-medium">{selectedPicture.username}</span>
          <span className="mx-2">•</span>
          <span>{new Date(selectedPicture.createdAt).toLocaleDateString()}</span>
        </div>
        
        <img
          src={selectedPicture.url}
          alt={selectedPicture.title}
          className="w-full h-auto max-h-[80vh] object-contain"
        />
      </div>
    </div>
  );
}