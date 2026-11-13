import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { EmptyState } from '../components/common/EmptyState';
import { ThemeToggle } from '../components/settings/ThemeToggle';
import { ThemeProvider } from '../context/ThemeContext';
import { SettingsProvider } from '../context/SettingsContext';
import { ToastProvider } from '../context/ToastContext';
import { WritingProvider } from '../context/WritingContext';
import { WritingEditor } from '../components/editor/WritingEditor';
import { BrowserRouter } from 'react-router-dom';

describe('UI Primitives', () => {
  it('Button renders text and responds to click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);

    const btn = screen.getByRole('button', { name: /click me/i });
    expect(btn).toBeInTheDocument();

    fireEvent.click(btn);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('Button disables interaction when isLoading is true', () => {
    const handleClick = vi.fn();
    render(<Button isLoading onClick={handleClick}>Loading</Button>);

    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
    fireEvent.click(btn);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('Badge renders variant styling', () => {
    render(<Badge variant="accent">New Feature</Badge>);
    expect(screen.getByText('New Feature')).toBeInTheDocument();
  });

  it('EmptyState renders title, description, and triggers action', () => {
    const onAction = vi.fn();
    render(
      <EmptyState
        title="No content yet"
        description="Write something to get started"
        actionLabel="Start Writing"
        onAction={onAction}
      />
    );

    expect(screen.getByText('No content yet')).toBeInTheDocument();
    expect(screen.getByText('Write something to get started')).toBeInTheDocument();

    const actionBtn = screen.getByRole('button', { name: /start writing/i });
    fireEvent.click(actionBtn);
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it('ThemeToggle switches theme options', () => {
    render(
      <ThemeProvider>
        <ThemeToggle showLabel />
      </ThemeProvider>
    );

    const darkBtn = screen.getByTitle('Set theme to Dark');
    expect(darkBtn).toBeInTheDocument();
    fireEvent.click(darkBtn);
    expect(localStorage.getItem('prosely_theme')).toBe('dark');
  });

  it('WritingEditor renders character and word count accurately', () => {
    render(
      <SettingsProvider>
        <ToastProvider>
          <WritingProvider>
            <WritingEditor />
          </WritingProvider>
        </ToastProvider>
      </SettingsProvider>
    );

    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeInTheDocument();

    fireEvent.change(textarea, { target: { value: 'Hello world from Prosely' } });
    expect(screen.getByText('4 words')).toBeInTheDocument();
    expect(screen.getByText(/24 characters/)).toBeInTheDocument();
  });
});
