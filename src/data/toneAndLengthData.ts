import { WritingLength, WritingTone } from '../types';

export interface ToneOption {
  id: WritingTone;
  label: string;
  tagline: string;
  iconName: string;
}

export const TONE_OPTIONS: ToneOption[] = [
  { id: 'professional', label: 'Professional', tagline: 'Structured & articulate', iconName: 'Briefcase' },
  { id: 'natural', label: 'Natural & Human', tagline: 'Warm, approachable, authentic', iconName: 'Smile' },
  { id: 'confident', label: 'Confident', tagline: 'Bold, direct, impact-focused', iconName: 'ShieldCheck' },
  { id: 'humble', label: 'Humble', tagline: 'Grateful & growth-oriented', iconName: 'HeartHandshake' },
  { id: 'enthusiastic', label: 'Enthusiastic', tagline: 'High energy & celebratory', iconName: 'Sparkles' },
  { id: 'storytelling', label: 'Storytelling', tagline: 'Engaging narrative arc', iconName: 'BookOpen' },
  { id: 'technical', label: 'Technical', tagline: 'Architecture & engineering depth', iconName: 'Cpu' },
  { id: 'concise', label: 'Concise', tagline: 'Snappy bullets, zero fluff', iconName: 'Zap' },
];

export interface LengthOption {
  id: WritingLength;
  label: string;
  wordCountTarget: string;
  description: string;
}

export const LENGTH_OPTIONS: LengthOption[] = [
  { id: 'short', label: 'Short', wordCountTarget: '~50-90 words', description: 'Punchy hook, fast to consume on mobile feeds' },
  { id: 'medium', label: 'Medium', wordCountTarget: '~150-220 words', description: 'Standard balanced LinkedIn post with context & learnings' },
  { id: 'detailed', label: 'Detailed', wordCountTarget: '~300-450 words', description: 'Comprehensive breakdown, storytelling, or case study' },
];
