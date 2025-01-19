import { create } from 'zustand'
import { ToastMessage } from '@/types/shared'

interface AppState {
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const useAppStore = create<AppState>()((set) => ({
  toasts: [],
  addToast: (toast: Omit<ToastMessage, 'id'>) => 
    set((state: AppState) => ({
      toasts: [...state.toasts, { ...toast, id: Date.now().toString() }]
    })),
  removeToast: (id: string) =>
    set((state: AppState) => ({
      toasts: state.toasts.filter((toast: ToastMessage) => toast.id !== id)
    })),
  isDarkMode: false,
  toggleDarkMode: () =>
    set((state: AppState) => ({
      isDarkMode: !state.isDarkMode
    }))
})) 