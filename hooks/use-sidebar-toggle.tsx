import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

/**
 * The useSidebarToggle hook is used to toggle the sidebar open and closed.
 *
 * It uses the zustand library to create a store that persists the state of
 * the sidebar across page reloads.
 *
 * The hook returns an object with two properties:
 * - isOpen: a boolean indicating whether the sidebar is currently open
 * - setIsOpen: a function that can be used to toggle the state of the sidebar
 */
interface useSidebarToggleStore {
  isOpen: boolean;
  setIsOpen: () => void;
}

/**
 * The useSidebarToggle hook provides a way to toggle the sidebar open and
 * closed.
 *
 * @return {Object} An object with two properties:
 *  - isOpen: a boolean indicating whether the sidebar is currently open.
 *  - setIsOpen: a function that can be used to toggle the state of the sidebar.
 */
export const useSidebarToggle = create(
  persist<useSidebarToggleStore>(
    (set, get) => ({
      isOpen: true,
      setIsOpen: () => {
        set({ isOpen: !get().isOpen });
      }
    }),
    {
      name: 'sidebarOpen',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
