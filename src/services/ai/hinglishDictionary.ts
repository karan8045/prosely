export interface HinglishPattern {
  regex: RegExp;
  replacement: string;
  categoryHint?: string;
  context?: 'achievement' | 'learning' | 'gratitude' | 'challenge' | 'general';
}

export const HINGLISH_PATTERNS: HinglishPattern[] = [
  // Accomplishment & Success
  { regex: /\b(maine|humne)\s+(crack|clear|pass)\s+(kar\s+liya|kiya|kara)\b/gi, replacement: 'I successfully completed and cleared', context: 'achievement' },
  { regex: /\b(first|1st)\s+(prize|rank|position)\s+(mila|jeeta|aaya)\b/gi, replacement: 'secured 1st place / top honors', context: 'achievement' },
  { regex: /\b(project|app|website)\s+(banaya|develop\s+kiya|build\s+kiya)\b/gi, replacement: 'designed, architected, and shipped', context: 'achievement' },
  { regex: /\b(offer\s+letter|job\s+offer)\s+(mil\s+gaya|mila|aagaya)\b/gi, replacement: 'accepted an exciting new career opportunity', context: 'achievement' },
  { regex: /\b(internship|training)\s+(khatam|complete|finish)\s+(ho\s+gaya|kar\s+liya)\b/gi, replacement: 'successfully concluded my internship tenure', context: 'achievement' },
  { regex: /\b(finally\s+complete\s+ho\s+gaya|ho\s+gaya\s+finally)\b/gi, replacement: 'I am delighted to mark the milestone of completing', context: 'achievement' },

  // Effort & Challenge
  { regex: /\b(bahut|bohot|kaafi)\s+(mehnat|hardwork|effort)\s+(lagi|tha|laga)\b/gi, replacement: 'required rigorous persistence and problem-solving', context: 'challenge' },
  { regex: /\b(starting\s+mein|shuru\s+mein)\s+(dikkat|problem|tough|mushkil)\s+(hui|tha|aayi)\b/gi, replacement: 'The initial learning curve was steep, yet immensely rewarding', context: 'challenge' },
  { regex: /\b(kaafi\s+bugs|bahut\s+errors)\s+(aaye|the)\b/gi, replacement: 'navigated complex edge cases and architectural bugs', context: 'challenge' },
  { regex: /\b(raat\s+bhar|din\s+raat)\s+kaam\s+kiya\b/gi, replacement: 'invested dedicated hours deep in code and testing', context: 'challenge' },

  // Learning & Growth
  { regex: /\b(bahut\s+kuch|bohot\s+kuch)\s+(seekha|seekhne\s+ko\s+mila)\b/gi, replacement: 'gained deep, actionable insights and hands-on domain expertise', context: 'learning' },
  { regex: /\b(nayi\s+cheezein|new\s+skills)\s+(seekhi|learn\s+kiya)\b/gi, replacement: 'expanded my technical competencies and conceptual toolkit', context: 'learning' },
  { regex: /\b(samajh\s+aaya|realize\s+hua)\b/gi, replacement: 'reinforced the fundamental engineering principle that', context: 'learning' },
  { regex: /\b(pehli\s+baar|first\s+time)\s+(kiya|use\s+kiya|try\s+kiya)\b/gi, replacement: 'ventured into uncharted territory by implementing', context: 'learning' },

  // Gratitude & Mentorship
  { regex: /\b(thank\s+you|shukriya|thanks)\s+(sabhi\s+ko|all\s+ko|everyone\s+ko)\b/gi, replacement: 'immensely grateful to everyone who supported this effort', context: 'gratitude' },
  { regex: /\b(mentors|seniors|teachers)\s+ka\s+(support|help)\s+(bohot\s+tha|mila)\b/gi, replacement: 'profound gratitude to my mentors and leads for their continuous guidance', context: 'gratitude' },
  { regex: /\b(team\s+ke\s+saath|team\s+members)\s+kaam\s+karke\s+achha\s+laga\b/gi, replacement: 'Collaborating alongside an exceptionally talented team was a highlight', context: 'gratitude' },

  // Social & Call to Action
  { regex: /\b(kya\s+lagta\s+hai|aap\s+batao|apni\s+rai\s+do)\b/gi, replacement: 'I would love to hear your thoughts and perspectives', context: 'general' },
  { regex: /\b(link\s+bio\s+mein\s+hai|comments\s+mein\s+de\s+raha\s+hoon)\b/gi, replacement: 'Links to the codebase and live demonstration are shared in the comments below', context: 'general' },
  { regex: /\b(check\s+out\s+karo|dekhna\s+jaroor|zaroor\s+dekhna)\b/gi, replacement: 'Feel free to explore the project and share your constructive feedback', context: 'general' },
  { regex: /\b(bhai|yaar|dost|bro)\b/gi, replacement: 'colleagues', context: 'general' }
];

export const COMMON_HINGLISH_WORDS: Record<string, string> = {
  'aaj': 'today',
  'kal': 'recently',
  'ab': 'now',
  'bohot': 'immensely',
  'bahut': 'substantially',
  'zyada': 'further',
  'achha': 'positive',
  'achhi': 'effective',
  'sahi': 'sound',
  'galat': 'suboptimal',
  'galti': 'oversight',
  'seekh': 'key takeaway',
  'seekha': 'acquired knowledge',
  'koshish': 'initiative',
  'mehnat': 'diligent effort',
  'mushkil': 'challenging',
  'asaan': 'streamlined',
  'sirf': 'focused specifically on',
  'lekin': 'however,',
  'isliye': 'consequently,',
  'kyunki': 'given that',
  'kaam': 'work',
  'shuru': 'commenced',
  'khatam': 'concluded',
  'faayda': 'value addition',
  'madad': 'assistance',
  'milkar': 'in collaboration'
};

export const TECH_KEYWORDS: string[] = [
  'React', 'Next.js', 'TypeScript', 'JavaScript', 'Python', 'Node.js',
  'Express', 'Tailwind', 'Docker', 'Kubernetes', 'AWS', 'GCP', 'Azure',
  'PostgreSQL', 'MongoDB', 'Redis', 'GraphQL', 'REST API', 'Git', 'GitHub',
  'CI/CD', 'FastAPI', 'Django', 'Spring Boot', 'Java', 'C++', 'Go',
  'Rust', 'Machine Learning', 'AI', 'NLP', 'TensorFlow', 'PyTorch',
  'Vite', 'Vitest', 'Jest', 'Figma', 'System Design', 'Microservices'
];
