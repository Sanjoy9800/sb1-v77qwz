export interface User {
  id: string;
  username: string;
}

export interface Picture {
  id: string;
  url: string;
  title: string;
  userId: string;
  username: string;
  createdAt: string;
  isFavorite?: boolean;
}

export interface AuthState {
  user: User | null;
  login: (username: string) => Promise<void>;
  logout: () => void;
}

export interface PictureState {
  pictures: Picture[];
  favorites: Set<string>;
  loading: boolean;
  hasMore: boolean;
  addPicture: (picture: Omit<Picture, 'id' | 'createdAt' | 'username'>) => Promise<void>;
  toggleFavorite: (pictureId: string) => Promise<void>;
  loadMorePictures: () => Promise<void>;
}

export interface ModalState {
  isShareOpen: boolean;
  isPictureOpen: boolean;
  selectedPicture: Picture | null;
  openShareModal: () => void;
  closeShareModal: () => void;
  openPictureModal: (picture: Picture) => void;
  closePictureModal: () => void;
}