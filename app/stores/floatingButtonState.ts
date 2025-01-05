import { create } from 'zustand';

interface FloatingButtonState {
  isOpen: boolean;
  setIsOpen: () => void;
}

const useFloatingButtonStore = create<FloatingButtonState>((set) => ({
  isOpen: false,
  setIsOpen: () => set((state) => ({ isOpen: !state.isOpen }))
}))

export default useFloatingButtonStore