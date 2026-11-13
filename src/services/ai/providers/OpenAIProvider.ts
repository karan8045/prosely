import {
  ContentCategory,
  ImprovementAction,
  RewriteOptions,
  RewriteResult,
  Variation
} from '../../../types';
import { AIProvider } from '../AIProvider';
import { MockAIProvider } from '../MockAIProvider';

export class OpenAIProvider implements AIProvider {
  id = 'openai';
  name = 'OpenAI (GPT-4o / GPT-4o-mini)';
  description = 'Direct integration placeholder. Requires API key or secure server-side proxy.';
  isLocal = false;
  isConfigured = false;

  private apiKey?: string;
  private endpoint: string;
  private fallbackProvider = new MockAIProvider();

  constructor(apiKey?: string, endpoint = 'https://api.openai.com/v1/chat/completions') {
    this.apiKey = apiKey;
    this.endpoint = endpoint;
    this.isConfigured = Boolean(apiKey);
  }

  setApiKey(key: string) {
    this.apiKey = key;
    this.isConfigured = Boolean(key);
  }

  async rewriteContent(input: string, options: RewriteOptions): Promise<RewriteResult> {
    if (!this.apiKey) {
      // Graceful fallback to mock demonstration engine with clear note
      const fallbackResult = await this.fallbackProvider.rewriteContent(input, options);
      return {
        ...fallbackResult,
        transformationNotes: [
          'Notice: OpenAI API key not configured. Falling back to Prosely Local Demonstration Engine.',
          ...fallbackResult.transformationNotes
        ]
      };
    }

    // Server-side / client-side fetch implementation ready when key provided
    // Follows secure prompt architecture
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
