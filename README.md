# Prosely (प्रोसेली)
### *Premium Hinglish-to-LinkedIn Writing Studio*

> **"From raw thoughts to professional presence."**

Prosely is a professional writing studio engineered to convert informal Hinglish, mixed-language thoughts, broken English, and unstructured engineering notes into polished, authentic, and high-impact LinkedIn content.

Designed specifically for students, software engineers, technical leads, and founders, Prosely preserves your authentic voice, protects original facts and metrics, and structures your thoughts without resorting to generic, robotic AI clichés.

---

## 🌟 Key Features

### 1. Smart Hinglish & Mixed-Language Studio
- **Authentic Translation & Polishing**: Recognizes hundreds of Hinglish idioms, conversational markers, and colloquialisms (e.g., *"Bhai maine crack kar liya"*, *"bahut mehnat lagi"*, *"project banaya with React and Node"*), translating them into articulate professional equivalents.
- **Fact & Metric Integrity**: Preserves every number, score, percentage, project name, and tech stack detail you provide. Never invents fake credentials, statistics, or credentials.
- **Multilingual Support**: Accepts freeform Hinglish, informal English, bullet points, and rough technical brain-dumps.
- **Sample Presets**: One-click sample Hinglish loader to immediately test the transformation engine.

### 2. Dedicated LinkedIn Content Modes
Prosely provides 9 dedicated generation modes, each tailored with contextual guidance and industry-standard LinkedIn narrative structures:
1. **LinkedIn Posts**: General professional reflections, engineering observations, and discussion starters.
2. **Achievements & Certificates**: AWS/Azure/GCP certifications, degrees, competitive programming milestones, and exam clears.
3. **Experience & About Section**: Polished profile bio summaries and role statements.
4. **Internship Experiences**: Kickoffs, milestones, and tenure conclusion reflections.
5. **Project Descriptions**: Side projects, open-source builds, and capstone showcases with tech stack highlights.
6. **Professional Announcements**: New roles, promotions, and major career milestones.
7. **Project Launches & Tech Updates**: Version releases, architectural migrations, and ship logs.
8. **Comments & Replies**: Thoughtful, high-value comments on top industry posts that boost personal visibility.
9. **Connection Messages**: Personalized, high-converting outreach notes for founders, leaders, and recruiters.

### 3. Writing Tone & Length Controls
- **8 Distinct Tones**:
  - `Professional` (Structured & articulate)
  - `Natural & Human` (Warm, approachable, authentic)
  - `Confident` (Bold, direct, impact-focused)
  - `Humble` (Grateful & growth-oriented)
  - `Enthusiastic` (High energy & celebratory)
  - `Storytelling` (Engaging narrative arc)
  - `Technical` (Architecture & engineering depth)
  - `Concise` (Snappy bullets, zero fluff)
- **3 Target Lengths**:
  - `Short` (~50-90 words • Mobile-optimized punchy post)
  - `Medium` (~150-220 words • Standard balanced LinkedIn post)
  - `Detailed` (~300-450 words • Comprehensive deep-dive or case study)

### 4. Alternative Angles & Variations
- Generates 3 distinct stylistic variations for every post:
  - **Direct & Impact-Focused**: Metric and outcome-oriented hook.
  - **Storytelling & Journey**: Narrative arc with personal voice and gratitude.
  - **Actionable Insights**: Educational takeaways and bullet points.
- Instant one-click version switcher to apply any variation directly to your editor.

### 5. Targeted Polish Actions
Quick micro-actions to refine posts without re-generating from scratch:
- **Rewrite**: Fresh regeneration with selected tone and length.
- **Fix Grammar**: Punctuation, capitalization, and syntax cleanup.
- **More Professional**: Replaces casual idioms with elevated business vocabulary.
- **More Natural**: Replaces stiff phrasing with conversational, authentic language.
- **Shorten**: Condenses content for quick reading.
- **Expand**: Elaborates with deeper engineering reflections.

### 6. Realistic LinkedIn Post Preview
- High-fidelity interactive LinkedIn card preview showing avatar, author name, headline, post timestamp, paragraph line breaks, and emojis.
- Interactive `...see more` truncation toggle matching LinkedIn's feed behavior.
- Post engagement mock (Reactions: Like, Celebrate, Love, and comment stats).
- Customizable author name and headline from Settings.

### 7. Hashtag Assistant
- Context-aware rule-based hashtag generation based on post mode and detected technical skills (e.g. `#WebDevelopment`, `#React`, `#TypeScript`, `#Docker`).
- Remove individual hashtags or add custom tags with 1 click.
- One-click copy for all hashtags or full post.

### 8. Local Drafts History & Privacy First
- Automatically saves all generated iterations and drafts locally in browser `localStorage`.
- Search drafts by keyword or filter by content category.
- Re-open previous drafts in the studio with 1 click.
- Permanent "Clear All History" deletion with confirmation.
- **100% Client-Side Privacy**: Zero telemetry, zero analytics tracking, and zero remote data transmission.

### 9. Curated Predefined Templates
Includes 12+ ready-to-use structured templates for:
- Cloud certifications (AWS, Azure, GCP, CKA)
- Course completions & bootcamp projects
- Internship kickoff & wrap-up
- New job offers & career transitions
- Open-source releases & side-project showcases
- Hackathon participation & wins
- Technical learnings & postmortems
- Personalized connection requests (Founders, Engineers, Recruiters)
- Thoughtful post comments & replies

---

## 🏗️ Architecture & Technology Stack

```
Prosely Architecture Overview
┌─────────────────────────────────────────────────────────────────┐
│                          UI Layer                               │
│  React 18 + TypeScript + Tailwind CSS + Lucide + Framer Motion  │
│  (AppLayout, Workspace, LinkedInPreview, TopBar, AppSidebar)     │
└────────────────────────────────┬────────────────────────────────┘
                                 │
┌────────────────────────────────▼────────────────────────────────┐
│                        Context Layer                            │
│  WritingContext | SettingsContext | ThemeContext | ToastContext  │
└────────────────────────────────┬────────────────────────────────┘
                                 │
┌────────────────────────────────▼────────────────────────────────┐
│                        Services Layer                           │
│  ┌───────────────────────┐          ┌─────────────────────────┐ │
│  │   historyStorage.ts   │          │   settingsStorage.ts    │ │
│  │     (localStorage)    │          │     (localStorage)      │ │
│  └───────────────────────┘          └─────────────────────────┘ │
│                                                                 │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │              AIService (Provider Registry)                 │ │
│  └───────────────┬────────────────────────────┬───────────────┘ │
│                  │                            │                 │
│  ┌───────────────▼──────────────┐   ┌─────────▼───────────────┐ │
│  │ MockAIProvider (Deterministic│   │ External Provider Stubs │ │
│  │ Rule Engine + Hinglish Dict) │   │ (OpenAI, Gemini, Proxy) │ │
│  └──────────────────────────────┘   └─────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

- **Frontend**: React 18 + TypeScript (strict mode)
- **Build System**: Vite 5
- **Styling**: Tailwind CSS with custom Linear/Notion-inspired design tokens
- **Routing**: React Router v6
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Testing**: Vitest + React Testing Library + jsdom (36/36 tests passing)

---

## 🤖 AI Architecture: Mock Engine vs Future Providers

### Why a Local Demonstration Engine in Release 1.0?
Prosely follows a strict **zero-cost, zero-API-key, 100% privacy-first** architecture out of the box:
1. **Runs Offline**: Completely works without internet, subscriptions, or credit cards.
2. **Deterministic Transformations**: Recognizes Hinglish patterns, metrics, and domain entities deterministically.
3. **No Hidden Costs**: Never hits paid external APIs or rate limits.
4. **Complete Privacy**: Content is never sent to any external server.

### Limitations of the Local Demonstration Engine
- **Vocabulary Scope**: The local rule engine operates based on regex pattern matching and semantic dictionaries. Complex colloquial slang that falls outside the dictionary will be cleaned rather than deeply synthesized.
- **Rule-Based Phrasing**: While the output is structured, professional, and grammatically sound, it lacks the probabilistic flexibility of a 100-billion parameter neural network.

### Integrating Production AI Providers (OpenAI, Gemini, Anthropic)
The codebase is built with a pluggable `AIProvider` interface (`src/services/ai/AIProvider.ts`):

```typescript
export interface AIProvider {
  id: string;
  name: string;
  description: string;
  isLocal: boolean;
  isConfigured: boolean;

  rewriteContent(input: string, options: RewriteOptions): Promise<RewriteResult>;
  generateContent(prompt: string, options: RewriteOptions): Promise<RewriteResult>;
  improveContent(currentContent: string, action: ImprovementAction, options: RewriteOptions): Promise<string>;
  generateHashtags(content: string, category: ContentCategory): Promise<string[]>;
  generateVariations(content: string, options: RewriteOptions): Promise<Variation[]>;
}
```

To connect an external provider:
1. Add your key to `.env`:
   ```bash
   VITE_OPENAI_API_KEY=sk-your-openai-api-key
   VITE_GEMINI_API_KEY=AIzaSy-your-gemini-key
   ```
2. Or point the provider endpoint to your secure backend API proxy (recommended for production deployments to avoid client-side key exposure).
3. Switch active provider in **Settings > AI Engine & Provider Architecture**.

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| `⌘ + Enter` / `Ctrl + Enter` | **Generate / Transform Post** |
| `⌘ + Shift + C` / `Ctrl + Shift + C` | **Copy Generated Post** |
| `Esc` | **Close Dialog / Modal** |

---

## 🚀 Getting Started

### Prerequisites
- Node.js `v18.0.0` or higher (tested on Node v24)
- npm `v9.0.0` or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/prosely.git
cd prosely

# Install dependencies
npm install

# Run the development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Running Tests

```bash
# Run unit and integration tests
npm test
```

### Building for Production

```bash
# Type check and build optimized bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🔒 Security & Privacy Notice
Prosely is designed with privacy by design:
- No user content is ever transmitted across the network in the default engine mode.
- All drafts, settings, and templates are stored inside browser `localStorage`.
- Sanitized HTML rendering prevents cross-site scripting (XSS).
- Users have full control to clear all local data at any time from the Danger Zone in Settings.

---

## 📄 License
MIT License. Built with craftsmanship for ambitious professionals.
