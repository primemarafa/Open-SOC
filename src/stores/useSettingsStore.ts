import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
  language: 'fr' | 'en';
  darkMode: boolean;
  showTimer: boolean;
  showHints: boolean;
  setLanguage: (lang: 'fr' | 'en') => void;
  toggleDarkMode: () => void;
  toggleTimer: () => void;
  toggleHints: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      language: 'fr',
      darkMode: true,
      showTimer: true,
      showHints: true,
      setLanguage: (language) => set({ language }),
      toggleDarkMode: () => set((s) => ({ darkMode: !s.darkMode })),
      toggleTimer: () => set((s) => ({ showTimer: !s.showTimer })),
      toggleHints: () => set((s) => ({ showHints: !s.showHints })),
    }),
    { name: 'cybersec-training-settings' }
  )
);
