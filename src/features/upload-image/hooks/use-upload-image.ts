import { create } from "zustand";

type uploadImage = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useUploadImage = create<uploadImage>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
