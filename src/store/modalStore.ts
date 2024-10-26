import { create } from 'zustand';
import { ModalState, Picture } from '../types';

export const useModalStore = create<ModalState>((set) => ({
  isShareOpen: false,
  isPictureOpen: false,
  selectedPicture: null,
  
  openShareModal: () => set({ isShareOpen: true }),
  closeShareModal: () => set({ isShareOpen: false }),
  
  openPictureModal: (picture: Picture) => set({ 
    isPictureOpen: true,
    selectedPicture: picture 
  }),
  closePictureModal: () => set({ 
    isPictureOpen: false,
    selectedPicture: null 
  }),
}));