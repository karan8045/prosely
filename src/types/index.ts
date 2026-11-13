export type ContentCategory =
  | 'linkedin-post'
  | 'achievement'
  | 'experience-about'
  | 'internship'
  | 'project'
  | 'announcement'
  | 'launch-update'
  | 'comment-reply'
  | 'connection-message';

export type WritingTone =
  | 'professional'
  | 'natural'
  | 'confident'
  | 'humble'
  | 'enthusiastic'
  | 'storytelling'
  | 'technical'
  | 'concise';

export type WritingLength = 'short' | 'medium' | 'detailed';

export type ImprovementAction =
  | 'rewrite'
  | 'grammar'
  | 'professional'
  | 'natural'
  | 'shorten'
  | 'expand';

export interface Variation {
  id: string;
  label: string;
  style: string;
  content: string;
  summary: string;
}

export interface RewriteResult {
  content: string;
  variations: Variation[];
  hashtags: string[];
  estimatedReadTime: string;
  wordCount: number;
  characterCount: number;
  engineUsed: string;
  isMock: boolean;
  transformationNotes: string[];
}

export interface RewriteOptions {
  category: ContentCategory;
  tone: WritingTone;
  length: WritingLength;
  includeHashtags?: boolean;
  structuredFields?: Record<string, string>;
  generateVariations?: boolean;
}

export interface Draft {
  id: string;
  title: string;
  rawInput: string;
  generatedContent: string;
  category: ContentCategory;
  tone: WritingTone;
  length: WritingLength;
  hashtags: string[];
  createdAt: string;
  updatedAt: string;
  wordCount: number;
  isFavorite?: boolean;
}

export type ThemeMode = 'light' | 'dark' | 'system';

export interface UserSettings {
  theme: ThemeMode;
  defaultTone: WritingTone;
  defaultLength: WritingLength;
  authorName: string;
  authorHeadline: string;
  authorAvatarUrl: string;
  autoCopyOnGenerate: boolean;
  autoIncludeHashtags: boolean;
  activeProviderId: string;
  providerConfigs: {
    [providerId: string]: {
      apiKey?: string;
      endpoint?: string;
      model?: string;
    };
  };
}

export interface Template {
  id: string;
  title: string;
  category: ContentCategory;
  description: string;
  badge?: string;
  defaultTone: WritingTone;
  defaultLength: WritingLength;
  promptTemplate: string;
  hinglishExample: string;
  fields?: {
    id: string;
    label: string;
    placeholder: string;
    helperText?: string;
  }[];
}
