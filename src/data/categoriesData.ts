import { ContentCategory, WritingLength, WritingTone } from '../types';

export interface CategoryMetadata {
  id: ContentCategory;
  name: string;
  shortName: string;
  description: string;
  placeholder: string;
  defaultTone: WritingTone;
  defaultLength: WritingLength;
  badge?: string;
  sampleInput: string;
  fields?: {
    id: string;
    label: string;
    placeholder: string;
    helper?: string;
  }[];
}

export const CATEGORIES_DATA: Record<ContentCategory, CategoryMetadata> = {
  'linkedin-post': {
    id: 'linkedin-post',
    name: 'LinkedIn Posts',
    shortName: 'Post',
    description: 'General professional posts, observations, industry thoughts, and discussion starters.',
    placeholder: 'e.g., Maine notice kiya ki coding mein premature optimization se jyada nuksan hota hai. Real user feedback lene se jaldi product improve hota hai...',
    defaultTone: 'natural',
    defaultLength: 'medium',
    sampleInput: 'Maine notice kiya ki devs aksar premature optimization mein fas jaate hain. Pehle working product ship karna chahiye aur real metrics dekh kar improve karna chahiye. Simple code maintain karna sabse badi superpower hai.',
  },
  'achievement': {
    id: 'achievement',
    name: 'Achievements & Certificates',
    shortName: 'Achievement',
    description: 'Milestones, exams passed, certifications earned, hackathon rankings, and awards.',
    placeholder: 'e.g., Bhai finally AWS Solutions Architect Associate clear ho gaya! Score 860 aaya. 2 months prepare kiya tha hands-on labs ke saath...',
    defaultTone: 'confident',
    defaultLength: 'medium',
    badge: 'Popular',
    sampleInput: 'Finally AWS Solutions Architect Associate exam clear ho gaya with 860 score! Pichle 2 mahine se roz 2 ghante padhta tha, hands-on VPC aur IAM labs kiye. Mentors ko bohot thanks jinhone guide kiya.',
    fields: [
      { id: 'achievementTitle', label: 'Achievement / Certificate Title', placeholder: 'AWS Certified Solutions Architect - Associate' },
      { id: 'organization', label: 'Issuing Organization', placeholder: 'Amazon Web Services (AWS)' },
      { id: 'metric', label: 'Score / Ranking (Optional)', placeholder: 'Score: 860/1000' },
      { id: 'preparationTime', label: 'Time Invested / Prep Duration', placeholder: '2 months of intensive hands-on labs' },
      { id: 'keyLearnings', label: 'Key Skills / Learnings', placeholder: 'High availability, VPC peering, IAM least-privilege, Cost optimization' }
    ]
  },
  'experience-about': {
    id: 'experience-about',
    name: 'Experience & About Section',
    shortName: 'About',
    description: 'LinkedIn About bio summary and role responsibility statements that stand out.',
    placeholder: 'e.g., Main 3 saal se React aur Node pe kaam kar raha hoon. Scalable web apps banana aur clean code likhna pasand hai. New full-stack roles dhoondh raha hoon...',
    defaultTone: 'professional',
    defaultLength: 'medium',
    sampleInput: 'I am a Full Stack Developer with 3 years of experience building web applications using React, TypeScript, and Node.js. Obsessed with clean architecture and responsive UI. Actively open to new software engineering opportunities.',
    fields: [
      { id: 'role', label: 'Current / Desired Role', placeholder: 'Full Stack Software Engineer' },
      { id: 'experienceYears', label: 'Years of Experience', placeholder: '3+ years' },
      { id: 'coreTech', label: 'Core Tech Stack', placeholder: 'React, TypeScript, Node.js, PostgreSQL, Docker' },
      { id: 'passion', label: 'Engineering Philosophy', placeholder: 'Crafting performant, accessible web apps and mentoring junior devs' }
    ]
  },
  'internship': {
    id: 'internship',
    name: 'Internship Experiences',
    shortName: 'Internship',
    description: 'Internship kickoffs, milestones, learnings, and tenure completion reflections.',
    placeholder: 'e.g., Aaj mera Microsoft mein summer internship khatam ho gaya. Azure SDK team ke saath kaam kiya. Team bohot supportive thi aur production deployment seekha...',
    defaultTone: 'humble',
    defaultLength: 'medium',
    badge: 'Students & Grads',
    sampleInput: 'Aaj mera 3-month Software Engineering internship complete hua at TechCorp. Yahan maine payment checkout microservice ko optimize kiya aur latency 25% drop hui. Team lead aur mentors ne bohot support kiya.',
    fields: [
      { id: 'company', label: 'Company / Organization', placeholder: 'TechCorp Labs' },
      { id: 'role', label: 'Internship Role', placeholder: 'Software Engineering Intern' },
      { id: 'duration', label: 'Duration', placeholder: '3 months (May - August 2024)' },
      { id: 'impact', label: 'Key Project & Impact', placeholder: 'Optimized checkout latency by 25% using Redis caching' }
    ]
  },
  'project': {
    id: 'project',
    name: 'Project Descriptions',
    shortName: 'Project',
    description: 'Side projects, personal builds, capstones, and open-source contributions.',
    placeholder: 'e.g., Ek open source markdown editor banaya React aur Tailwind se. Real-time preview support karta hai aur keyboard shortcuts bhi hain...',
    defaultTone: 'technical',
    defaultLength: 'detailed',
    sampleInput: 'Maine ek privacy-first offline notes app banaya React, IndexedDB aur Tailwind se. Isme zero network telemetry hai, pure markdown support hai, aur search instant kaam karta hai. GitHub pe open source kar diya hai.',
    fields: [
      { id: 'projectName', label: 'Project Name', placeholder: 'DocuSync' },
      { id: 'problemSolved', label: 'Problem Being Solved', placeholder: 'Developers need instant local-first docs without subscription paywalls' },
      { id: 'techStack', label: 'Tech Stack', placeholder: 'React, TypeScript, Tailwind CSS, IndexedDB, Vite' },
      { id: 'features', label: 'Key Features / Metrics', placeholder: 'Offline-ready, <50ms fuzzy search, 100% test coverage' }
    ]
  },
  'announcement': {
    id: 'announcement',
    name: 'Professional Announcements',
    shortName: 'Announcement',
    description: 'New job offers, company promotions, speaking engagements, and major news.',
    placeholder: 'e.g., Maine nayi company join kar li as Senior Frontend Engineer! Bohot excited hoon nayi team ke saath scale pe kaam karne ke liye...',
    defaultTone: 'enthusiastic',
    defaultLength: 'medium',
    sampleInput: 'Delighted to share that I am starting a new position as Software Engineer at Acme Cloud! Grateful to all my mentors who supported me through the interview journey. Super excited to build distributed systems with this team.',
    fields: [
      { id: 'newsTitle', label: 'Announcement Title', placeholder: 'Starting a new position as Software Engineer' },
      { id: 'organization', label: 'Company / Organization', placeholder: 'Acme Cloud' },
      { id: 'focusArea', label: 'What you will be working on', placeholder: 'Building high-throughput cloud ingestion pipelines' }
    ]
  },
  'launch-update': {
    id: 'launch-update',
    name: 'Project Launches & Tech Updates',
    shortName: 'Launch',
    description: 'Product launches, feature releases, architectural upgrades, and tech ship logs.',
    placeholder: 'e.g., Aaj humne version 2.0 release kiya. Load time 40% fast ho gaya hai aur dark mode add kar diya hai. Check out karo...',
    defaultTone: 'confident',
    defaultLength: 'medium',
    sampleInput: 'We just shipped v2.0 of our developer portal! Replaced legacy SSR with Vite + Edge caching, reducing initial page load by 45%. Dark mode and keyboard navigation are now fully supported out of the box.',
  },
  'comment-reply': {
    id: 'comment-reply',
    name: 'Comments & Replies',
    shortName: 'Comment',
    description: 'Thoughtful, high-value comments on industry posts that boost personal visibility.',
    placeholder: 'e.g., Agree karta hoon author ke saath. Junior devs ko pehle basics pe dhyan dena chahiye na ki direct naye frameworks pe jump karna...',
    defaultTone: 'natural',
    defaultLength: 'short',
    sampleInput: 'Completely agree with this breakdown. In my early career, I jumped straight into microservices without understanding monolith patterns. Mastering fundamentals first prevents so much technical debt later on.',
  },
  'connection-message': {
    id: 'connection-message',
    name: 'Connection Messages',
    shortName: 'Connect Note',
    description: 'Personalized, courteous LinkedIn connection requests that get high acceptance rates.',
    placeholder: 'e.g., Hi Rahul, maine aapka recent post dekha distributed caching ke baare mein. Main bhi backend engineer hoon aur connect karna chahta hoon...',
    defaultTone: 'professional',
    defaultLength: 'short',
    sampleInput: 'Hi Priyesh, I read your recent post on database indexing strategies in Postgres. As a fellow backend engineer working with high-volume queries, I really appreciated your practical approach. Would love to connect and keep in touch!',
  }
};
