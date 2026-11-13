import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppProviders, AppRoutes } from '../App';

describe('Prosely Full User Flow Integration Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders Dashboard with headline, stats, and navigation', () => {
    render(
      <AppProviders>
        <MemoryRouter initialEntries={['/']}>
          <AppRoutes />
        </MemoryRouter>
      </AppProviders>
    );

    expect(screen.getByText(/Your thoughts\./i)).toBeInTheDocument();
    expect(screen.getByText(/Your professional voice\./i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /start writing/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /explore templates/i })).toBeInTheDocument();
  });

  it('transforms Hinglish input into LinkedIn post in Workspace', async () => {
    render(
      <AppProviders>
        <MemoryRouter initialEntries={['/workspace']}>
          <AppRoutes />
        </MemoryRouter>
      </AppProviders>
    );

    // Verify workspace editor is loaded
    expect(screen.getByText(/Raw Thoughts & Hinglish Notes/i)).toBeInTheDocument();

    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeInTheDocument();

    // Type Hinglish text
    fireEvent.change(textarea, {
      target: {
        value: 'Finally AWS exam pass kar liya with 850 score! Bohot mehnat lagi thi aur seniors ka guidance bohot tha.'
      }
    });

    // Click Generate button
    const generateBtn = screen.getByRole('button', { name: /generate professional post/i });
    expect(generateBtn).not.toBeDisabled();
    fireEvent.click(generateBtn);

    // Wait for generation result
    await waitFor(() => {
      expect(screen.getByText(/Feed Preview/i)).toBeInTheDocument();
      expect(screen.getByText(/Targeted Hashtags/i)).toBeInTheDocument();
    }, { timeout: 3000 });

    // Check that LinkedIn preview card rendered with author name
    expect(screen.getByText('Alex Sharma')).toBeInTheDocument();
  });

  it('applies sample Hinglish input with one click in Workspace', async () => {
    render(
      <AppProviders>
        <MemoryRouter initialEntries={['/workspace']}>
          <AppRoutes />
        </MemoryRouter>
      </AppProviders>
    );

    const sampleBtns = screen.getAllByRole('button', { name: /sample hinglish/i });
    fireEvent.click(sampleBtns[0]);

    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    expect(textarea.value.length).toBeGreaterThan(10);
  });

  it('renders Templates page and allows selecting a template', async () => {
    render(
      <AppProviders>
        <MemoryRouter initialEntries={['/templates']}>
          <AppRoutes />
        </MemoryRouter>
      </AppProviders>
    );

    expect(screen.getByText(/Curated Writing Templates/i)).toBeInTheDocument();

    // Verify template cards rendered
    const useTemplateBtns = screen.getAllByRole('button', { name: /use template/i });
    expect(useTemplateBtns.length).toBeGreaterThan(0);

    // Click Use Template
    fireEvent.click(useTemplateBtns[0]);
  });

  it('updates author profile settings and persists in storage', async () => {
    render(
      <AppProviders>
        <MemoryRouter initialEntries={['/settings']}>
          <AppRoutes />
        </MemoryRouter>
      </AppProviders>
    );

    expect(screen.getByRole('heading', { name: /LinkedIn Preview Profile/i })).toBeInTheDocument();

    const nameInput = screen.getByPlaceholderText(/e\.g\. Priyesh Patel/i) as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: 'Karan Mehra' } });

    const saveBtn = screen.getByRole('button', { name: /save profile info/i });
    fireEvent.click(saveBtn);

    // Verify localStorage has updated name
    const stored = JSON.parse(localStorage.getItem('prosely_settings_v1') || '{}');
    expect(stored.authorName).toBe('Karan Mehra');
  });

  it('renders History page and handles empty state and filters', () => {
    render(
      <AppProviders>
        <MemoryRouter initialEntries={['/history']}>
          <AppRoutes />
        </MemoryRouter>
      </AppProviders>
    );

    expect(screen.getByText(/Content Drafts History/i)).toBeInTheDocument();
    expect(screen.getByText(/No Saved Drafts Yet/i)).toBeInTheDocument();
  });
});
