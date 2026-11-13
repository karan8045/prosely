import { UserSettings } from '../../types';

const SETTINGS_KEY = 'prosely_settings_v1';

export const DEFAULT_SETTINGS: UserSettings = {
  theme: 'system',
  defaultTone: 'professional',
  defaultLength: 'medium',
  authorName: 'Alex Sharma',
  authorHeadline: 'Software Engineer • Building modern web architectures',
  authorAvatarUrl: '',
  autoCopyOnGenerate: false,
  autoIncludeHashtags: true,
  activeProviderId: 'mock-local',
  providerConfigs: {
    'mock-local': {},
    'openai': { model: 'gpt-4o-mini' },
    'gemini': { model: 'gemini-1.5-flash' }
  }
};

export function getStoredSettings(): UserSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_SETTINGS,
      ...parsed,
      providerConfigs: {
        ...DEFAULT_SETTINGS.providerConfigs,
        ...(parsed.providerConfigs || {})
      }
    };
  } catch (error) {
    console.error('Failed to parse settings from localStorage:', error);
    return DEFAULT_SETTINGS;
  }
}

export function saveStoredSettings(settings: UserSettings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save settings:', error);
  }
}

export function resetStoredSettings(): UserSettings {
  try {
    localStorage.removeItem(SETTINGS_KEY);
  } catch (error) {
    console.error('Failed to reset settings:', error);
  }
  return DEFAULT_SETTINGS;
}
