import { Draft } from '../../types';

const STORAGE_KEY = 'prosely_drafts_v1';

export function getStoredDrafts(): Draft[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch (error) {
    console.error('Failed to load drafts from localStorage:', error);
    return [];
  }
}

export function saveDraft(draft: Omit<Draft, 'id' | 'createdAt' | 'updatedAt'>): Draft {
  const drafts = getStoredDrafts();
  const now = new Date().toISOString();
  const newDraft: Draft = {
    ...draft,
    id: `draft-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    createdAt: now,
    updatedAt: now
  };

  const updatedDrafts = [newDraft, ...drafts];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedDrafts));
  } catch (error) {
    console.error('Failed to persist draft:', error);
  }
  return newDraft;
}

export function updateDraft(id: string, updates: Partial<Omit<Draft, 'id' | 'createdAt'>>): Draft | null {
  const drafts = getStoredDrafts();
  const index = drafts.findIndex((d) => d.id === id);
  if (index === -1) return null;

  const updated: Draft = {
    ...drafts[index],
    ...updates,
    updatedAt: new Date().toISOString()
  };

  drafts[index] = updated;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts));
  } catch (error) {
    console.error('Failed to update draft in localStorage:', error);
  }
  return updated;
}

export function deleteDraft(id: string): boolean {
  const drafts = getStoredDrafts();
  const filtered = drafts.filter((d) => d.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Failed to delete draft:', error);
    return false;
  }
}

export function clearAllDrafts(): boolean {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Failed to clear drafts:', error);
    return false;
  }
}
