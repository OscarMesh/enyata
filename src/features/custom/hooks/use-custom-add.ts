import { create } from "zustand";

type addData = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useCustomAdd = create<addData>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
