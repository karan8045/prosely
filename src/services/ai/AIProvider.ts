import {
  ContentCategory,
  ImprovementAction,
  RewriteOptions,
  RewriteResult,
  Variation
} from '../../types';

export interface AIProvider {
  /** Unique provider identifier */
  id: string;
  /** Human-readable name */
  name: string;
  /** Short summary of what this provider does */
  description: string;
  /** True if executed in browser locally without network */
  isLocal: boolean;
  /** True if the provider has all required keys/endpoints configured */
  isConfigured: boolean;

  /** Full post rewrite with variations and hashtags */
  rewriteContent(input: string, options: RewriteOptions): Promise<RewriteResult>;

  /** Generate content from prompts or structured data */
  generateContent(prompt: string, options: RewriteOptions): Promise<RewriteResult>;

  /** Quick targeted polish actions (grammar, tone, shortening) */
  improveContent(currentContent: string, action: ImprovementAction, options: RewriteOptions): Promise<string>;

  /** Extract contextual hashtags */
  generateHashtags(content: string, category: ContentCategory): Promise<string[]>;

  /** Generate distinct stylistic variations */
  generateVariations(content: string, options: RewriteOptions): Promise<Variation[]>;
}
