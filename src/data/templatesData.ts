import { Template } from '../types';

export const TEMPLATES_DATA: Template[] = [
  {
    id: 'cert-aws',
    title: 'Cloud Certification Achievement',
    category: 'achievement',
    description: 'Announce AWS, Azure, GCP, or CKA certification with preparation strategy and learnings.',
    badge: 'Popular',
    defaultTone: 'confident',
    defaultLength: 'medium',
    promptTemplate: `Maine [Certification Name] exam successfully pass kar liya hai with [Score or Percentile]! Pichle [Duration] se roz continuous practice aur hands-on labs kar raha tha. Special thanks to [Mentors/Resources] for the support. Next target [Next Goal] hai.`,
    hinglishExample: `Finally AWS Solutions Architect Associate clear kar liya with 850 score! 2 mahine continuous hands-on labs kiye the. Mentors ko thanks. Next target ab Kubernetes CKA hai!`
  },
  {
    id: 'course-completion',
    title: 'Course Completion & New Skills',
    category: 'achievement',
    description: 'Share a recently completed specialized course, bootcamp, or nanodegree.',
    badge: 'Learning',
    defaultTone: 'enthusiastic',
    defaultLength: 'medium',
    promptTemplate: `Maine [Platform / Academy] ka [Course Title] successfully complete kiya hai! Is course mein maine [Key Skill 1], [Key Skill 2], aur [Key Skill 3] practical projects ke sath implement kiya.`,
    hinglishExample: `Maine Meta ka Frontend Professional Certificate complete kar liya Coursera pe! Isme React, accessibility, testing aur modern CSS pe depth mein hands-on projects banaye.`
  },
  {
    id: 'internship-completion',
    title: 'Internship Wrap-up & Learnings',
    category: 'internship',
    description: 'Reflect on internship tenure, achievements, impact, and thank your team.',
    badge: 'Career',
    defaultTone: 'humble',
    defaultLength: 'detailed',
    promptTemplate: `Mera [Company Name] mein [Role] ka internship complete ho gaya. Yahan maine [Key Project] pe kaam kiya aur [Result or Impact] deliver kiya. Team lead aur mentors ka guidance invaluable raha.`,
    hinglishExample: `Aaj mera 6 months ka SDE internship complete ho gaya Swiggy mein. Maine search backend service ka throughput 30% badhaya using Redis cache. Team members aur manager ne bohot seekhaya!`
  },
  {
    id: 'internship-kickoff',
    title: 'New Internship Announcement',
    category: 'internship',
    description: 'Excitedly announce joining a company as an intern.',
    badge: 'Announcement',
    defaultTone: 'enthusiastic',
    defaultLength: 'short',
    promptTemplate: `Super excited to share ki maine [Company Name] join kar liya hai as [Role] Intern! Bohot seekhne ko milega aur production scale pe contribute karne ke liye ready hoon.`,
    hinglishExample: `Bohot excited hoon share karte hue ki maine Zomato mein Frontend Engineering Intern join kiya hai! Team ke sath scale pe kaam karne ke liye excited hoon.`
  },
  {
    id: 'new-job',
    title: 'New Job / Career Milestone',
    category: 'announcement',
    description: 'Share your next career chapter, new role, and appreciation for those who helped.',
    badge: 'Milestone',
    defaultTone: 'confident',
    defaultLength: 'medium',
    promptTemplate: `Excited to announce ki main nayi position start kar raha hoon as [Job Title] at [Company Name]! Grateful to my previous team at [Old Company] for all the learning. Ready for this new chapter.`,
    hinglishExample: `Happy to share that I'm starting a new position as Software Development Engineer at Atlassian! Bohot grateful hoon un sabhi mentors aur friends ka jinhone is interview journey mein support kiya.`
  },
  {
    id: 'project-launch',
    title: 'Open Source / Side Project Launch',
    category: 'project',
    description: 'Showcase a tool or app you built, the problem it solves, and invite feedback.',
    badge: 'Tech',
    defaultTone: 'technical',
    defaultLength: 'detailed',
    promptTemplate: `Maine ek open source project banaya hai jiska naam [Project Name] hai. Yeh [Problem] ko solve karta hai. Tech stack [Tech 1, Tech 2, Tech 3] use kiya hai. GitHub link aur live demo comments mein hai.`,
    hinglishExample: `Maine ek lightweight developer tool banaya hai jiska naam 'API-Flow' hai. Yeh REST APIs ko curl commands mein instant convert karta hai. React, TypeScript aur Tailwind se build kiya hai, zero tracking ke sath. GitHub repo open hai!`
  },
  {
    id: 'hackathon-win',
    title: 'Hackathon Win or Participation',
    category: 'achievement',
    description: 'Share hackathon experience, prototype built within 36 hours, and learnings under pressure.',
    badge: 'Competition',
    defaultTone: 'enthusiastic',
    defaultLength: 'medium',
    promptTemplate: `Hamari team ne [Hackathon Name] mein [Prize / Rank] jeeta! 36 hours non-stop code karke humne [Project Name] banaya jo [Problem] solve karta hai using [Tech Stack]. Team work sabse best part tha.`,
    hinglishExample: `Hamari team ne Smart India Hackathon mein 1st prize jeeta out of 200+ teams! Humne 36 hours mein real-time emergency routing system banaya React aur Go se. Team effort was amazing!`
  },
  {
    id: 'tech-learning',
    title: 'Technical Learning & Insight',
    category: 'linkedin-post',
    description: 'Share a non-obvious engineering insight, bug postmortem, or architecture lesson.',
    badge: 'Knowledge',
    defaultTone: 'natural',
    defaultLength: 'medium',
    promptTemplate: `Maine recently production issue debug karte waqt ek important lesson seekha: [Core Lesson]. Pehle hum [Old Approach] kar rahe the jo fail ho gaya, fir humne [New Approach] kiya aur problem solve hui.`,
    hinglishExample: `Kal production mein memory leak debug kiya. Lesson seekha ki React useEffect mein event listeners clean up na karne se browser crash ho sakta hai. Choti si galti bohot bada issue ban sakti hai!`
  },
  {
    id: 'connect-founder',
    title: 'Connection Note to Founder/Leader',
    category: 'connection-message',
    description: 'Respectful, punchy connection note showing genuine interest in their product or vision.',
    badge: 'Networking',
    defaultTone: 'professional',
    defaultLength: 'short',
    promptTemplate: `Hi [Name], maine aapka [Recent Product / Post / Article] dekha regarding [Topic]. Hum bhi is space mein kaam kar rahe hain aur aapka approach bohot inspiring laga. Would love to connect and follow your journey!`,
    hinglishExample: `Hi Raghav, I have been following your updates on building developer infrastructure at scale. Really admire the engineering-first culture at your company. Would love to connect and stay in touch!`
  },
  {
    id: 'connect-recruiter',
    title: 'Connection Note to Recruiter / HR',
    category: 'connection-message',
    description: 'Direct, polite outreach expressing interest in roles at their organization.',
    badge: 'Job Hunt',
    defaultTone: 'professional',
    defaultLength: 'short',
    promptTemplate: `Hi [Recruiter Name], I hope you are doing well. I noticed you lead talent acquisition for [Engineering/Product] at [Company Name]. I have [X] years of experience in [Key Tech] and would love to connect for future opportunities.`,
    hinglishExample: `Hi Neha, I noticed you are recruiting for frontend engineering roles at PhonePe. I have 2 years of experience building high-performance web applications with React and TypeScript. Would love to connect!`
  },
  {
    id: 'comment-insight',
    title: 'Thoughtful Post Comment',
    category: 'comment-reply',
    description: 'Engage meaningfully on a top post with your own engineering perspective.',
    badge: 'Engagement',
    defaultTone: 'natural',
    defaultLength: 'short',
    promptTemplate: `Great insights on [Topic]! Ek point jo mere experience mein kaam kiya wo tha [Your Insight]. Thanks for sharing this breakdown!`,
    hinglishExample: `Completely agree on testing in production safely with feature flags. Unit tests are great, but synthetic canary tests give the real confidence before 100% rollout. Thanks for this perspective!`
  },
  {
    id: 'about-summary',
    title: 'Modern About Summary for Profile',
    category: 'experience-about',
    description: 'Clean bio summary highlighting who you are, what you build, and your engineering ethos.',
    badge: 'Profile',
    defaultTone: 'professional',
    defaultLength: 'detailed',
    promptTemplate: `Main ek [Your Title] hoon with expertise in [Core Tech]. Mujhe [What drives you / Problem type] solve karna pasand hai. Open to discussing [Type of roles / Collabs].`,
    hinglishExample: `Full Stack Engineer with 3+ years experience building web systems with React, Node.js, and TypeScript. I care deeply about web accessibility, clean architecture, and responsive UX.`
  }
];
