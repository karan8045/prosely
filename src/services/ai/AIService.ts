import {
  ContentCategory,
  ImprovementAction,
  RewriteOptions,
  RewriteResult,
  Variation
} from '../../types';
import { AIProvider } from './AIProvider';
import { MockAIProvider } from './MockAIProvider';
import { OpenAIProvider } from './providers/OpenAIProvider';
import { GeminiProvider } from './providers/GeminiProvider';

export class AIService {
  private static instance: AIService;
  private providers: Map<string, AIProvider> = new Map();
  private activeProviderId = 'mock-local';

  private constructor() {
    // Register available providers
    const mock = new MockAIProvider();
    const openai = new OpenAIProvider(import.meta.env.VITE_OPENAI_API_KEY);
    const gemini = new GeminiProvider(import.meta.env.VITE_GEMINI_API_KEY);

    this.registerProvider(mock);
    this.registerProvider(openai);
    this.registerProvider(gemini);
  }

  public static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  public registerProvider(provider: AIProvider): void {
    this.providers.set(provider.id, provider);
  }

  public getAvailableProviders(): AIProvider[] {
    return Array.from(this.providers.values());
  }

  public getActiveProvider(): AIProvider {
    return this.providers.get(this.activeProviderId) || this.providers.get('mock-local')!;
  }

  public setActiveProvider(providerId: string): void {
    if (this.providers.has(providerId)) {
      this.activeProviderId = providerId;
    } else {
      console.warn(`Provider ${providerId} not found. Reverting to mock-local.`);
      this.activeProviderId = 'mock-local';
    }
  }

  // Facade Methods
  public async rewrite(input: string, options: RewriteOptions): Promise<RewriteResult> {
    return this.getActiveProvider().rewriteContent(input, options);
  }

  public async generate(prompt: string, options: RewriteOptions): Promise<RewriteResult> {
    return this.getActiveProvider().generateContent(prompt, options);
  }

  public async improve(
    content: string,
    action: ImprovementAction,
    options: RewriteOptions
  ): Promise<string> {
    return this.getActiveProvider().improveContent(content, action, options);
  }

  public async getHashtags(content: string, category: ContentCategory): Promise<string[]> {
    return this.getActiveProvider().generateHashtags(content, category);
  }

  public async getVariations(content: string, options: RewriteOptions): Promise<Variation[]> {
    return this.getActiveProvider().generateVariations(content, options);
  }
}

export const aiService = AIService.getInstance();
