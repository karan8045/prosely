import { describe, it, expect } from 'vitest';
import { MockAIProvider } from '../services/ai/MockAIProvider';
import { AIService } from '../services/ai/AIService';

describe('AI Provider Architecture & Mock Engine', () => {
  it('MockAIProvider conforms to AIProvider interface and flags isMock', async () => {
    const provider = new MockAIProvider();
    expect(provider.id).toBe('mock-local');
    expect(provider.isLocal).toBe(true);

    const result = await provider.rewriteContent('maine react mein hackathon jeeta', {
      category: 'achievement',
      tone: 'enthusiastic',
      length: 'medium'
    });

    expect(result.isMock).toBe(true);
    expect(result.content).toBeDefined();
    expect(result.content.length).toBeGreaterThan(0);
    expect(result.variations.length).toBe(3);
    expect(result.engineUsed).toContain('Local Demonstration');
    expect(result.transformationNotes.length).toBeGreaterThan(0);
  });

  it('AIService registers providers and allows active provider selection', () => {
    const service = AIService.getInstance();
    const available = service.getAvailableProviders();

    expect(available.some((p) => p.id === 'mock-local')).toBe(true);
    expect(available.some((p) => p.id === 'openai')).toBe(true);
    expect(available.some((p) => p.id === 'gemini')).toBe(true);

    service.setActiveProvider('mock-local');
    expect(service.getActiveProvider().id).toBe('mock-local');
  });

  it('AIService gracefully falls back if invalid provider id is requested', () => {
    const service = AIService.getInstance();
    service.setActiveProvider('non-existent-provider');
    expect(service.getActiveProvider().id).toBe('mock-local');
  });
});
