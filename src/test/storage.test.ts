import { describe, it, expect, beforeEach } from 'vitest';
import {
  saveDraft,
  getStoredDrafts,
  updateDraft,
  deleteDraft,
  clearAllDrafts
} from '../services/storage/historyStorage';
import {
  getStoredSettings,
  saveStoredSettings,
  resetStoredSettings,
  DEFAULT_SETTINGS
} from '../services/storage/settingsStorage';

describe('Local Drafts Storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('saves and retrieves drafts correctly', () => {
    const draft = saveDraft({
      title: 'AWS Certification Post',
      rawInput: 'AWS exam pass kar liya with 850',
      generatedContent: 'Delighted to achieve AWS certification!',
      category: 'achievement',
      tone: 'confident',
      length: 'medium',
      hashtags: ['#AWS', '#Cloud'],
      wordCount: 45
    });

    const drafts = getStoredDrafts();
    expect(drafts.length).toBe(1);
    expect(drafts[0].id).toBe(draft.id);
    expect(drafts[0].title).toBe('AWS Certification Post');
  });

  it('updates an existing draft', () => {
    const draft = saveDraft({
      title: 'Initial Title',
      rawInput: 'Some notes',
      generatedContent: 'Initial content',
      category: 'project',
      tone: 'professional',
      length: 'short',
      hashtags: [],
      wordCount: 20
    });

    const updated = updateDraft(draft.id, {
      title: 'Updated Title',
      generatedContent: 'Updated post content'
    });

    expect(updated?.title).toBe('Updated Title');
    expect(updated?.generatedContent).toBe('Updated post content');

    const drafts = getStoredDrafts();
    expect(drafts[0].title).toBe('Updated Title');
  });

  it('deletes a draft by id', () => {
    const draft1 = saveDraft({
      title: 'Draft 1',
      rawInput: 'Notes 1',
      generatedContent: 'Post 1',
      category: 'linkedin-post',
      tone: 'natural',
      length: 'short',
      hashtags: [],
      wordCount: 10
    });

    const draft2 = saveDraft({
      title: 'Draft 2',
      rawInput: 'Notes 2',
      generatedContent: 'Post 2',
      category: 'internship',
      tone: 'humble',
      length: 'medium',
      hashtags: [],
      wordCount: 15
    });

    expect(getStoredDrafts().length).toBe(2);

    deleteDraft(draft1.id);
    const drafts = getStoredDrafts();
    expect(drafts.length).toBe(1);
    expect(drafts[0].id).toBe(draft2.id);
  });

  it('clears all drafts with clearAllDrafts', () => {
    saveDraft({
      title: 'Draft A',
      rawInput: 'A',
      generatedContent: 'A',
      category: 'achievement',
      tone: 'confident',
      length: 'short',
      hashtags: [],
      wordCount: 5
    });

    clearAllDrafts();
    expect(getStoredDrafts().length).toBe(0);
  });
});

describe('Settings Storage & Persistence', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns default settings when storage is empty', () => {
    const settings = getStoredSettings();
    expect(settings.defaultTone).toBe('professional');
    expect(settings.defaultLength).toBe('medium');
    expect(settings.authorName).toBe('Alex Sharma');
  });

  it('persists and loads updated user settings', () => {
    saveStoredSettings({
      ...DEFAULT_SETTINGS,
      defaultTone: 'enthusiastic',
      authorName: 'Priyesh Mehta',
      autoCopyOnGenerate: true
    });

    const loaded = getStoredSettings();
    expect(loaded.defaultTone).toBe('enthusiastic');
    expect(loaded.authorName).toBe('Priyesh Mehta');
    expect(loaded.autoCopyOnGenerate).toBe(true);
  });

  it('resets settings to factory default', () => {
    saveStoredSettings({
      ...DEFAULT_SETTINGS,
      defaultTone: 'technical',
      authorName: 'Custom Name'
    });

    const reset = resetStoredSettings();
    expect(reset.defaultTone).toBe('professional');
    expect(reset.authorName).toBe('Alex Sharma');
  });
});
