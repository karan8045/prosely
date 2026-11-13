import {
  ContentCategory,
  ImprovementAction,
  RewriteOptions,
  RewriteResult,
  Variation
} from '../../../types';
import { AIProvider } from '../AIProvider';
import { MockAIProvider } from '../MockAIProvider';

export class GeminiProvider implements AIProvider {
  id = 'gemini';
  name = 'Google Gemini (Gemini 1.5 Flash / Pro)';
  description = 'Direct integration placeholder. Connects to Gemini API via serverless proxy or user key.';
  isLocal = false;
  isConfigured = false;

  private apiKey?: string;
  private fallbackProvider = new MockAIProvider();

  constructor(apiKey?: string) {
    this.apiKey = apiKey;
    this.isConfigured = Boolean(apiKey);
  }

  setApiKey(key: string) {
    this.apiKey = key;
    this.isConfigured = Boolean(key);
  }

  async rewriteContent(input: string, options: RewriteOptions): Promise<RewriteResult> {
    if (!this.apiKey) {
      const fallbackResult = await this.fallbackProvider.rewriteContent(input, options);
      return {
        ...fallbackResult,
        transformationNotes: [
          'Notice: Gemini API key not configured. Falling back to Prosely Local Demonstration Engine.',
          ...fallbackResult.transformationNotes
        ]
      };
    }
    return this.fallbackProvider.rewriteContent(input, options);
  }

  async generateContent(prompt: string, options: RewriteOptions): Promise<RewriteResult> {
    return this.rewriteContent(prompt, options);
  }

  async improveContent(currentContent: string, action: ImprovementAction, options: RewriteOptions): Promise<string> {
    return this.fallbackProvider.improveContent(currentContent, action, options);
  }

  async generateHashtags(content: string, category: ContentCategory): Promise<string[]> {
    return this.fallbackProvider.generateHashtags(content, category);
  }

  async generateVariations(content: string, options: RewriteOptions): Promise<Variation[]> {
    return this.fallbackProvider.generateVariations(content, options);
  }
}
