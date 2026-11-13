import {
  ContentCategory,
  ImprovementAction,
  RewriteOptions,
  RewriteResult,
  Variation,
  WritingLength,
  WritingTone
} from '../../types';
import { COMMON_HINGLISH_WORDS, HINGLISH_PATTERNS, TECH_KEYWORDS } from './hinglishDictionary';

interface ExtractedContext {
  cleanedText: string;
  detectedTech: string[];
  metrics: string[];
  transformations: string[];
  hasGratitude: boolean;
  hasAchievement: boolean;
  hasLearning: boolean;
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Extracts entities, sanitizes Hinglish, and detects intent
 */
export function analyzeAndSanitizeInput(rawInput: string): ExtractedContext {
  let text = rawInput.trim();
  const transformations: string[] = [];

  // 1. Apply Hinglish phrase patterns
  HINGLISH_PATTERNS.forEach((pattern) => {
    if (pattern.regex.test(text)) {
      transformations.push(`Translated phrase pattern to professional idiom`);
      text = text.replace(pattern.regex, pattern.replacement);
    }
  });

  // 2. Replace common individual Hinglish words
  const words = text.split(/\s+/);
  const replacedWords = words.map((w) => {
    const cleanWord = w.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (COMMON_HINGLISH_WORDS[cleanWord]) {
      transformations.push(`Standardized word "${w}" -> "${COMMON_HINGLISH_WORDS[cleanWord]}"`);
      return COMMON_HINGLISH_WORDS[cleanWord];
    }
    return w;
  });
  text = replacedWords.join(' ');

  // 3. Detect tech keywords
  const detectedTech = TECH_KEYWORDS.filter((tech) => {
    const regex = new RegExp(`\\b${escapeRegex(tech)}\\b`, 'i');
    return regex.test(rawInput);
  });

  // 4. Extract metrics / numbers (e.g., 90%, 850 score, 3 months, 1000+ users)
  const metricMatches = rawInput.match(
    /(?:\b\d+(?:\.\d+)?%|\b\d+\+?\s*(?:users|stars|downloads|months|weeks|days|score|points|rank)\b|\b\d{2,}\b)/gi
  );
  const metrics = metricMatches ? Array.from(new Set(metricMatches.map((m) => m.trim()))) : [];

  const hasGratitude = /grateful|gratitude|thank|mentor|senior|lead|support|guidance/i.test(text);
  const hasAchievement = /cleared|completed|secured|won|passed|shipped|built|launched|certified/i.test(text);
  const hasLearning = /learned|insights|understanding|explored|developed|mastered/i.test(text);

  return {
    cleanedText: text,
    detectedTech,
    metrics,
    transformations: Array.from(new Set(transformations)),
    hasGratitude,
    hasAchievement,
    hasLearning
  };
}

/**
 * Construct category-specific primary content
 */
export function buildCategoryContent(
  rawInput: string,
  context: ExtractedContext,
  category: ContentCategory,
  tone: WritingTone,
  length: WritingLength
): string {
  const { cleanedText, detectedTech, metrics } = context;

  // Format tech string if present
  const techStr = detectedTech.length > 0 ? detectedTech.join(', ') : '';
  const metricStr = metrics.length > 0 ? metrics.join(' and ') : '';

  switch (category) {
    case 'connection-message': {
      return buildConnectionMessage(cleanedText, detectedTech, tone, length);
    }

    case 'comment-reply': {
      return buildCommentReply(cleanedText, tone, length);
    }

    case 'achievement': {
      return buildAchievementPost(cleanedText, techStr, metricStr, tone, length);
    }

    case 'project':
    case 'launch-update': {
      return buildProjectPost(cleanedText, techStr, metricStr, tone, length);
    }

    case 'internship': {
      return buildInternshipPost(cleanedText, techStr, tone, length);
    }

    case 'experience-about': {
      return buildExperienceAbout(cleanedText, techStr, tone, length);
    }

    case 'announcement': {
      return buildAnnouncementPost(cleanedText, tone, length);
    }

    case 'linkedin-post':
    default: {
      return buildGeneralLinkedInPost(cleanedText, techStr, tone, length);
    }
  }
}

// -------------------------------------------------------------
// Category Builders
// -------------------------------------------------------------

function buildConnectionMessage(input: string, tech: string[], tone: WritingTone, length: WritingLength): string {
  const techMention = tech.length > 0 ? ` your work with ${tech.slice(0, 2).join(' & ')} and` : '';

  if (length === 'short') {
    if (tone === 'natural') {
      return `Hi there,\n\nI came across your profile and noticed${techMention} your professional focus. Given our shared interests in tech, I'd love to connect and keep in touch.\n\nBest,\n[Your Name]`;
    }
    return `Hello,\n\nI have been following your journey and${techMention} your insightful contributions in the space. I would appreciate the opportunity to connect and learn from your experience.\n\nWarm regards,\n[Your Name]`;
  }

  return `Hello,\n\nI recently came across your profile and was really inspired by your recent work and background${techMention}. ${input}\n\nI am actively working on expanding my network with thoughtful professionals in this domain. I would truly appreciate the chance to connect with you here on LinkedIn and stay connected.\n\nWarm regards,\n[Your Name]`;
}

function buildCommentReply(input: string, tone: WritingTone, length: WritingLength): string {
  if (length === 'short') {
    if (tone === 'enthusiastic') {
      return `Spot on! 👏 This resonates deeply—especially the focus on consistency. ${input}\n\nThanks for sharing this perspective!`;
    }
    return `Completely agree with your point here. ${input}\n\nThanks for sparking such a thoughtful discussion!`;
  }

  return `This is a truly valuable perspective, thank you for sharing.\n\n${input}\n\nIn my own experience, maintaining this balance makes all the difference when executing under real-world constraints. Looking forward to reading more of your insights on this topic!`;
}

function buildAchievementPost(
  input: string,
  techStr: string,
  metricStr: string,
  tone: WritingTone,
  length: WritingLength
): string {
  let hook = 'Delighted to share an important milestone in my professional journey!';
  if (tone === 'enthusiastic') hook = 'Thrilled to share some exciting news! 🚀';
  if (tone === 'humble') hook = 'Grateful and humbled to share a recent milestone that has been months in the making.';
  if (tone === 'storytelling') hook = 'When I first set out to tackle this goal, I knew the journey would test my discipline and focus.';
  if (tone === 'confident') hook = 'Milestone unlocked: Persistence and intentional focus always deliver.';

  const coreParagraph = `${input}${metricStr ? ` Achieving ${metricStr} reflects the dedicated effort invested throughout the process.` : ''}`;
  const techSection = techStr ? `\n\nKey technologies & competencies sharpened:\n• ${techStr.split(', ').join('\n• ')}` : '';

  const learnings = `\n\nThree key takeaways from this experience:\n1. Depth beats superficial familiarity every time.\n2. Consistency in small daily practices yields compounding results.\n3. Asking the right questions accelerates problem-solving tenfold.`;

  const mentorSection = `\n\nA heartfelt thank you to my mentors, peers, and everyone who provided guidance, feedback, and encouragement along the way. Your support played a pivotal role in this accomplishment.`;

  const cta = `\n\nExcited for what lies ahead as I apply these learnings to building meaningful solutions.\n\nWhat is one milestone or skill you are currently working toward? Let's connect in the comments!`;

  if (length === 'short') {
    return `${hook}\n\n${coreParagraph}${techSection}\n\nGrateful for the support of mentors and peers along the way. Looking forward to putting these learnings into practice!`;
  }

  if (length === 'medium') {
    return `${hook}\n\n${coreParagraph}${techSection}\n\nThis journey reinforced the value of consistent effort, deep problem-solving, and continuous curiosity.\n\n${mentorSection}\n\nOn to the next chapter of building and learning!`;
  }

  return `${hook}\n\n${coreParagraph}${techSection}${learnings}${mentorSection}${cta}`;
}

function buildProjectPost(
  input: string,
  techStr: string,
  metricStr: string,
  tone: WritingTone,
  length: WritingLength
): string {
  let hook = 'Excited to announce the release of my latest project!';
  if (tone === 'technical') hook = 'Engineering update: Deployed a new architecture designed for performance and reliability.';
  if (tone === 'storytelling') hook = 'Every good engineering project starts with a real-world frustration waiting for a clean solution.';
  if (tone === 'enthusiastic') hook = 'Super excited to ship this into the world today! 🚀';
  if (tone === 'confident') hook = 'From concept to production: Pleased to present our latest release.';

  const projectCore = `${input}${metricStr ? ` During testing, we observed ${metricStr}.` : ''}`;
  const techStack = techStr ? `\n\nTech Stack & Architecture:\n• Core: ${techStr}\n• Focus: Scalability, clean state management, responsive UX` : '';

  const takeaways = `\n\nKey engineering decisions made along the way:\n• Prioritizing clean separation of concerns for maintainability.\n• Ensuring accessibility and intuitive keyboard navigation out of the box.\n• Optimizing bundle size and execution efficiency.`;

  const cta = `\n\nThe codebase is open and live demonstration is available. I would love to hear your feedback, thoughts on architecture, and potential improvements!\n\nLink in comments below. 👇`;

  if (length === 'short') {
    return `${hook}\n\n${projectCore}${techStack}\n\nCheck out the demo and code in the comments below. Would love to get your thoughts!`;
  }

  if (length === 'medium') {
    return `${hook}\n\n${projectCore}${techStack}\n\nBuilding this was an incredible exercise in tackling edge cases and delivering a polished user experience.\n\n${cta}`;
  }

  return `${hook}\n\n${projectCore}${techStack}${takeaways}\n\n${cta}`;
}

function buildInternshipPost(
  input: string,
  techStr: string,
  tone: WritingTone,
  length: WritingLength
): string {
  let hook = 'As my internship comes to a close, I wanted to reflect on an unforgettable period of growth.';
  if (tone === 'humble') hook = 'Looking back on my internship with immense gratitude for the mentorship and trust placed in me.';
  if (tone === 'confident') hook = 'Wrapping up an impactful and productive internship experience.';

  const core = `${input}`;
  const tech = techStr ? `\n\nSkills and technologies leveraged on the job:\n• ${techStr.split(', ').join('\n• ')}` : '';
  const gratitude = `\n\nA huge thank you to my manager, teammates, and mentors for welcoming me, challenging me with real responsibilities, and guiding my development every single day.`;
  const forward = `\n\nI am moving forward with sharper problem-solving instincts, greater technical confidence, and a passion for building high-impact systems.\n\nOpen to exciting new opportunities! Let's connect.`;

  if (length === 'short') {
    return `${hook}\n\n${core}${tech}\n\n${gratitude}`;
  }

  return `${hook}\n\n${core}${tech}\n\nKey takeaways from working in a production environment:\n1. Writing code for production requires relentless empathy for the end user.\n2. Thoughtful code reviews and documentation save countless engineering hours.\n3. Collaborative communication is just as vital as technical execution.\n\n${gratitude}\n\n${forward}`;
}

function buildExperienceAbout(
  input: string,
  techStr: string,
  tone: WritingTone,
  length: WritingLength
): string {
  const headline = 'Building software that solves real problems with clarity and craftsmanship.';
  const core = `${input}`;
  const tech = techStr ? `\n\nCore Technical Competencies:\n• ${techStr}` : '';
  const philosophy = `\n\nMy approach blends engineering rigor with product sense. Whether architecting frontends or designing resilient backend services, I prioritize maintainability, developer ergonomics, and measurable business impact.`;
  const contact = `\n\nAlways excited to collaborate on challenging engineering initiatives, open-source projects, and high-impact teams. Feel free to connect or reach out!`;

  if (length === 'short') {
    return `${headline}\n\n${core}${tech}\n\n${contact}`;
  }

  return `${headline}\n\n${core}${tech}${philosophy}\n\n${contact}`;
}

function buildAnnouncementPost(
  input: string,
  tone: WritingTone,
  length: WritingLength
): string {
  let hook = 'Exciting professional update to share with my network!';
  if (tone === 'confident') hook = 'Proud to announce the next step in my professional journey.';
  if (tone === 'humble') hook = 'Grateful to begin an exciting new chapter.';

  if (length === 'short') {
    return `${hook}\n\n${input}\n\nThank you to everyone who has supported me along the way. Looking forward to what lies ahead!`;
  }

  return `${hook}\n\n${input}\n\nLooking back, every challenge and learning curve has prepared me for this opportunity. I am deeply appreciative of the mentors, colleagues, and friends whose guidance and encouragement have made all the difference.\n\nEager to embrace new challenges, collaborate with inspiring teams, and continue driving impactful work.\n\nStay tuned for more updates, and let's stay connected!`;
}

function buildGeneralLinkedInPost(
  input: string,
  techStr: string,
  tone: WritingTone,
  length: WritingLength
): string {
  let hook = 'Here is a perspective that has been reshaping the way I approach my daily work:';
  if (tone === 'storytelling') hook = 'A small realization from this past week made me rethink how we approach problem solving:';
  if (tone === 'technical') hook = 'An engineering observation worth discussing:';
  if (tone === 'concise') hook = 'Quick thought for the week:';

  const body = `${input}`;
  const tech = techStr ? `\n\nContext & stack:\n• ${techStr}` : '';
  const question = `\n\nHow do you handle this in your own workflow? Would love to read your perspective below! 👇`;

  if (length === 'short') {
    return `${hook}\n\n${body}\n\nWhat are your thoughts on this? Let's discuss in the comments.`;
  }

  if (length === 'medium') {
    return `${hook}\n\n${body}${tech}\n\nFocusing on fundamentals and sustainable habits often yields far greater leverage than searching for shortcuts.\n\n${question}`;
  }

  return `${hook}\n\n${body}${tech}\n\nKey observations:\n• Clarity of thinking precedes clarity of execution.\n• Iterative feedback loops dramatically reduce compound mistakes.\n• Genuine professional growth happens when you lean into discomfort rather than avoiding it.\n\n${question}`;
}

// -------------------------------------------------------------
// Variations Builder (Distinct Angles)
// -------------------------------------------------------------

export function generateAlternativeVariations(
  content: string,
  options: RewriteOptions
): Variation[] {
  const lines = content.split('\n\n').filter(Boolean);
  const coreBody = lines.slice(1, -1).join('\n\n') || content;

  // Variation 1: The Direct Impact Hook
  const var1Content = [
    `Clear results speak for themselves:`,
    coreBody,
    `Key metric or lesson: Sustainable execution always beats momentary intensity.`,
    `What has your experience been with this?`
  ].join('\n\n');

  // Variation 2: The Story & Reflection
  const var2Content = [
    `Behind every polished milestone lies a series of quiet, persistent iterations:`,
    coreBody,
    `Grateful for the guidance of mentors and teammates who supported this work every step of the way.`,
    `Onward to the next challenge! 🚀`
  ].join('\n\n');

  // Variation 3: The Actionable Insights
  const var3Content = [
    `If I had to summarize the biggest takeaway from this experience, here is what mattered most:`,
    coreBody,
    `1. Focus relentlessly on the core problem first.\n2. Embrace feedback early and often.\n3. Build with long-term craftsmanship in mind.`,
    `Drop your thoughts or questions below—always happy to exchange insights.`
  ].join('\n\n');

  return [
    {
      id: 'var-1',
      label: 'Direct & Impact-Focused',
      style: 'Confident, outcome-oriented framing',
      content: var1Content,
      summary: 'Best for showcasing quantifiable outcomes and technical rigor.'
    },
    {
      id: 'var-2',
      label: 'Storytelling & Journey',
      style: 'Narrative arc with personal voice',
      content: var2Content,
      summary: 'Best for building authentic connection and community engagement.'
    },
    {
      id: 'var-3',
      label: 'Actionable Insights',
      style: 'Structured bullet points and takeaways',
      content: var3Content,
      summary: 'Best for educating peers and positioning yourself as a thoughtful practitioner.'
    }
  ];
}

// -------------------------------------------------------------
// Hashtags Builder
// -------------------------------------------------------------

export function extractHashtags(content: string, category: ContentCategory): string[] {
  const tags = new Set<string>();

  // Category tags
  switch (category) {
    case 'achievement':
      tags.add('#CareerMilestone');
      tags.add('#ContinuousLearning');
      tags.add('#ProfessionalGrowth');
      break;
    case 'project':
    case 'launch-update':
      tags.add('#WebDevelopment');
      tags.add('#SoftwareEngineering');
      tags.add('#BuildInPublic');
      tags.add('#TechInnovation');
      break;
    case 'internship':
      tags.add('#InternshipExperience');
      tags.add('#EarlyCareer');
      tags.add('#TechCareers');
      break;
    case 'experience-about':
      tags.add('#CareerJourney');
      tags.add('#OpenToWork');
      tags.add('#TechCommunity');
      break;
    case 'connection-message':
      return []; // Connection messages usually do not use hashtags
    case 'comment-reply':
      return []; // Comments usually do not use hashtags
    default:
      tags.add('#LinkedInGrowth');
      tags.add('#Leadership');
      tags.add('#TechIndustry');
      break;
  }

  // Detect tech hashtags
  TECH_KEYWORDS.forEach((tech) => {
    const cleanTech = tech.replace(/[^a-zA-Z0-9]/g, '');
    if (new RegExp(`\\b${escapeRegex(tech)}\\b`, 'i').test(content)) {
      tags.add(`#${cleanTech}`);
    }
  });

  return Array.from(tags).slice(0, 8);
}

// -------------------------------------------------------------
// Targeted Polish Actions
// -------------------------------------------------------------

export function applyTargetedPolish(
  content: string,
  action: ImprovementAction,
  options: RewriteOptions
): string {
  switch (action) {
    case 'grammar': {
      // Clean up common punctuation and casing
      let improved = content
        .replace(/\s+([.,!?;:])/g, '$1')
        .replace(/([.!?])\s*([a-z])/g, (_, p, l) => `${p} ${l.toUpperCase()}`)
        .replace(/\bi\b/g, 'I');
      return improved;
    }

    case 'professional': {
      let improved = content
        .replace(/super excited/gi, 'delighted')
        .replace(/awesome/gi, 'exemplary')
        .replace(/cool/gi, 'impactful')
        .replace(/a lot of/gi, 'substantial')
        .replace(/got a chance/gi, 'had the privilege');
      return improved;
    }

    case 'natural': {
      let improved = content
        .replace(/I am delighted to announce/gi, 'Excited to share')
        .replace(/substantially benefited from/gi, 'learned a ton from')
        .replace(/exemplary/gi, 'great');
      return improved;
    }

    case 'shorten': {
      const paragraphs = content.split('\n\n').filter(Boolean);
      if (paragraphs.length > 2) {
        return paragraphs.slice(0, 2).join('\n\n');
      }
      return content.split('. ').slice(0, 3).join('. ') + '.';
    }

    case 'expand': {
      return (
        content +
        `\n\nReflecting further on this experience, what stands out most is the power of persistence and clear communication. When you commit to understanding first principles, navigating unexpected challenges becomes second nature.`
      );
    }

    case 'rewrite':
    default:
      return content;
  }
}
