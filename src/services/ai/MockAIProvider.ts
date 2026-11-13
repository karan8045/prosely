import {
  ContentCategory,
  ImprovementAction,
  RewriteOptions,
  RewriteResult,
  Variation
} from '../../types';
import { AIProvider } from './AIProvider';
import {
  analyzeAndSanitizeInput,
  applyTargetedPolish,
  buildCategoryContent,
  extractHashtags,
  generateAlternativeVariations
} from './ruleEngine';

export class MockAIProvider implements AIProvider {
  id = 'mock-local';
  name = 'Prosely Local Engine (Rule-based Demonstration)';
  description = 'Deterministic, local in-browser transformation engine without external API dependency or data transmission.';
  isLocal = true;
  isConfigured = true;

  async rewriteContent(input: string, options: RewriteOptions): Promise<RewriteResult> {
    // Simulate slight natural latency (150-250ms) to ensure smooth UI transition without lag
    await new Promise((resolve) => setTimeout(resolve, 200));

    const context = analyzeAndSanitizeInput(input);
    const content = buildCategoryContent(
      input,
      context,
      options.category,
      options.tone,
      options.length
    );

    const hashtags = options.includeHashtags !== false
      ? extractHashtags(content, options.category)
      : [];

    const variations = options.generateVariations !== false
      ? generateAlternativeVariations(content, options)
      : [];

    const words = content.trim().split(/\s+/).filter(Boolean).length;
    const characters = content.length;
    const readTimeMinutes = Math.max(1, Math.ceil(words / 200));

    return {
      content,
      variations,
      hashtags,
      estimatedReadTime: `${readTimeMinutes} min read`,
      wordCount: words,
      characterCount: characters,
      engineUsed: 'Prosely Rule Engine v1.0 (Local Demonstration)',
      isMock: true,
      transformationNotes: [
        'Deterministic rule-based transformation applied locally.',
        `Cleaned and mapped Hinglish idioms into authentic professional English.`,
        `Preserved all original user facts, technical stack terms, and metrics.`,
        `Structured for LinkedIn readability (${options.tone} tone, ${options.length} depth).`
      ]
    };
  }

  async generateContent(prompt: string, options: RewriteOptions): Promise<RewriteResult> {
    return this.rewriteContent(prompt, options);
  }

  async improveContent(
    currentContent: string,
    action: ImprovementAction,
    options: RewriteOptions
  ): Promise<string> {
    await new Promise((resolve) => setTimeout(resolve, 150));
    return applyTargetedPolish(currentContent, action, options);
  }

  async generateHashtags(content: string, category: ContentCategory): Promise<string[]> {
    return extractHashtags(content, category);
  }

  async generateVariations(content: string, options: RewriteOptions): Promise<Variation[]> {
    return generateAlternativeVariations(content, options);
  }
}
