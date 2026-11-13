import { describe, it, expect } from 'vitest';
import {
  analyzeAndSanitizeInput,
  buildCategoryContent,
  extractHashtags,
  generateAlternativeVariations,
  applyTargetedPolish
} from '../services/ai/ruleEngine';

describe('Rule Engine - Hinglish Transformation & Sanitization', () => {
  it('translates common Hinglish phrases into professional English equivalents', () => {
    const raw = 'maine crack kar liya exam with 860 score. bahut mehnat lagi thi aur seniors ka support bohot tha.';
    const context = analyzeAndSanitizeInput(raw);

    expect(context.cleanedText).toContain('successfully completed and cleared');
    expect(context.cleanedText).toContain('rigorous persistence');
    expect(context.cleanedText).toContain('mentors and leads');
    expect(context.metrics.some((m) => m.includes('860'))).toBe(true);
    expect(context.transformations.length).toBeGreaterThan(0);
  });

  it('detects technical keywords from raw input', () => {
    const raw = 'React aur Node.js use karke full stack dashboard banaya with PostgreSQL and Docker';
    const context = analyzeAndSanitizeInput(raw);

    expect(context.detectedTech).toContain('React');
    expect(context.detectedTech).toContain('Node.js');
    expect(context.detectedTech).toContain('PostgreSQL');
    expect(context.detectedTech).toContain('Docker');
  });

  it('preserves user facts and metrics without hallucination', () => {
    const raw = 'Swiggy internship mein latency 35% reduce kiya in 3 months';
    const context = analyzeAndSanitizeInput(raw);

    expect(context.metrics.some((m) => m.includes('35%'))).toBe(true);
    expect(context.metrics.some((m) => m.includes('3 months'))).toBe(true);
  });
});

describe('Rule Engine - Category Specific Formatting', () => {
  it('formats an Achievement post with hook, metrics, and learnings', () => {
    const raw = 'AWS Solutions Architect clear kiya with 850 score';
    const context = analyzeAndSanitizeInput(raw);
    const post = buildCategoryContent(raw, context, 'achievement', 'confident', 'medium');

    expect(post).toContain('Milestone unlocked');
    expect(post).toContain('850');
    expect(post).toContain('Key technologies');
  });

  it('formats a Project description with architecture and call to action', () => {
    const raw = 'Built an open source markdown editor using React and TypeScript';
    const context = analyzeAndSanitizeInput(raw);
    const post = buildCategoryContent(raw, context, 'project', 'technical', 'detailed');

    expect(post).toContain('Engineering update');
    expect(post).toContain('Tech Stack & Architecture');
    expect(post).toContain('React, TypeScript');
    expect(post).toContain('comments below');
  });

  it('formats a Connection Message with personalized, polite tone', () => {
    const raw = 'Saw your recent post on distributed systems and would love to connect';
    const context = analyzeAndSanitizeInput(raw);
    const message = buildCategoryContent(raw, context, 'connection-message', 'natural', 'short');

    expect(message).toContain('Hi there');
    expect(message).toContain('love to connect');
    expect(message).toContain('[Your Name]');
  });
});

describe('Rule Engine - Tone Modulation', () => {
  const raw = 'Completed full stack web app project';
  const context = analyzeAndSanitizeInput(raw);

  it('generates enthusiastic tone with vibrant phrasing', () => {
    const output = buildCategoryContent(raw, context, 'achievement', 'enthusiastic', 'short');
    expect(output).toContain('Thrilled to share some exciting news! 🚀');
  });

  it('generates humble tone emphasizing mentorship', () => {
    const output = buildCategoryContent(raw, context, 'achievement', 'humble', 'short');
    expect(output).toContain('Grateful and humbled');
  });

  it('generates storytelling tone with narrative hook', () => {
    const output = buildCategoryContent(raw, context, 'achievement', 'storytelling', 'short');
    expect(output).toContain('When I first set out');
  });
});

describe('Rule Engine - Length Modulation', () => {
  const raw = 'Completed React portfolio project with clean code and tests';
  const context = analyzeAndSanitizeInput(raw);

  it('respects short vs detailed output lengths', () => {
    const shortPost = buildCategoryContent(raw, context, 'project', 'professional', 'short');
    const detailedPost = buildCategoryContent(raw, context, 'project', 'professional', 'detailed');

    const shortWords = shortPost.split(/\s+/).length;
    const detailedWords = detailedPost.split(/\s+/).length;

    expect(detailedWords).toBeGreaterThan(shortWords);
  });
});

describe('Rule Engine - Multiple Variations Generation', () => {
  it('generates 3 distinct stylistic variations', () => {
    const content = 'Delighted to share our latest project release.\n\nWe built a responsive web app using React.\n\nLink in comments!';
    const variations = generateAlternativeVariations(content, {
      category: 'project',
      tone: 'professional',
      length: 'medium'
    });

    expect(variations.length).toBe(3);
    expect(variations[0].id).toBe('var-1');
    expect(variations[1].id).toBe('var-2');
    expect(variations[2].id).toBe('var-3');
    expect(variations[0].content).not.toEqual(variations[1].content);
  });
});

describe('Rule Engine - Targeted Polish Actions', () => {
  it('improves grammar and capitalization', () => {
    const unpolished = 'i completed the project .it was good';
    const polished = applyTargetedPolish(unpolished, 'grammar', {
      category: 'linkedin-post',
      tone: 'professional',
      length: 'short'
    });
    expect(polished).toContain('I completed');
  });

  it('elevates casual phrasing to professional terminology', () => {
    const casual = 'super excited to share this cool project with a lot of features';
    const professional = applyTargetedPolish(casual, 'professional', {
      category: 'linkedin-post',
      tone: 'professional',
      length: 'short'
    });
    expect(professional).toContain('delighted');
    expect(professional).toContain('impactful');
    expect(professional).toContain('substantial');
  });
});

describe('Rule Engine - Hashtag Generation', () => {
  it('generates relevant hashtags matching category and tech keywords', () => {
    const content = 'Built a modern dashboard using React, TypeScript, and Docker';
    const tags = extractHashtags(content, 'project');

    expect(tags).toContain('#WebDevelopment');
    expect(tags).toContain('#React');
    expect(tags).toContain('#TypeScript');
    expect(tags).toContain('#Docker');
  });
});
