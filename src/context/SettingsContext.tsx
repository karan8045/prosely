import React, { createContext, useContext, useState } from 'react';
import { UserSettings } from '../types';
import {
  DEFAULT_SETTINGS,
  getStoredSettings,
  resetStoredSettings,
  saveStoredSettings
} from '../services/storage/settingsStorage';
import { clearAllDrafts } from '../services/storage/historyStorage';
import { aiService } from '../services/ai/AIService';

interface SettingsContextType {
  settings: UserSettings;
  updateSettings: (partial: Partial<UserSettings>) => void;
  resetSettings: () => void;
  clearHistory: () => boolean;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<UserSettings>(() => {
    const s = getStoredSettings();
    aiService.setActiveProvider(s.activeProviderId || 'mock-local');
    return s;
  });

  const updateSettings = (partial: Partial<UserSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...partial };
      saveStoredSettings(next);
      if (partial.activeProviderId) {
        aiService.setActiveProvider(partial.activeProviderId);
      }
      return next;
    });
  };

  const resetSettings = () => {
    const reset = resetStoredSettings();
    setSettings(reset);
    aiService.setActiveProvider(reset.activeProviderId);
  };

  const clearHistory = () => {
    return clearAllDrafts();
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, resetSettings, clearHistory }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within SettingsProvider');
  return context;
};
