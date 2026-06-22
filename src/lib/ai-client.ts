// Resume Australia — AI Client (Google Gemini)
// Generates ATS-optimised bullet points using Google Gemini.
// Falls back to a built-in library when no API key is configured.

import { GoogleGenerativeAI } from '@google/generative-ai';
import type { AIBulletRequest, AIBulletResponse } from '@/types';

// ---------------------------------------------------------------------------
// API key management
// ---------------------------------------------------------------------------
const STORAGE_KEY = 'resume-australia-gemini-key';

export function setGeminiApiKey(key: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, key.trim());
  }
}

export function getGeminiApiKey(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(STORAGE_KEY);
}

export function hasGeminiApiKey(): boolean {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem(STORAGE_KEY);
}

export function clearGeminiApiKey(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
}

// ---------------------------------------------------------------------------
// Built-in fallback bullets (used when no API key is present)
// ---------------------------------------------------------------------------
const FALLBACK_BULLETS: Record<string, string[]> = {
  default: [
    'Spearheaded cross-functional initiative resulting in 30% improvement in operational efficiency across 4 departments',
    'Developed and implemented process automation that reduced manual workload by 25 hours per week',
    'Managed $1.2M annual budget with 100% compliance to financial controls and reporting standards',
    'Led team of 8 professionals to deliver 12 projects on time and 15% under budget',
    'Established KPI tracking dashboard used by senior leadership for strategic decision-making',
    'Negotiated vendor contracts saving the organisation $180K annually in operational costs',
    'Mentored 5 junior team members, with 3 receiving promotions within 18 months',
    'Streamlined reporting processes reducing turnaround time from 5 days to same-day delivery',
    'Designed stakeholder engagement strategy that increased client satisfaction scores by 28%',
    'Authored comprehensive SOPs adopted across 3 regional offices, standardising operations',
  ],
  'software engineer': [
    'Architected and deployed microservices infrastructure handling 2M+ daily API requests with 99.9% uptime',
    'Reduced page load time by 62% through code splitting, lazy loading, and CDN optimisation',
    'Built CI/CD pipeline with GitHub Actions, cutting deployment time from 45 minutes to 8 minutes',
    'Developed RESTful API serving 500K+ users with comprehensive test coverage exceeding 90%',
    'Led migration from monolithic architecture to microservices, reducing infrastructure costs by 40%',
    'Implemented real-time data processing pipeline using Kafka, handling 10K events per second',
    'Mentored 4 junior developers through code reviews, pair programming, and technical workshops',
    'Designed and built responsive React dashboard used by 15K+ internal users daily',
    'Optimised PostgreSQL queries reducing average response time from 2.1s to 180ms',
    'Integrated third-party payment gateway processing $3.5M in monthly transactions with zero downtime',
  ],
  'project manager': [
    'Delivered $4.2M digital transformation programme 3 weeks ahead of schedule across 5 workstreams',
    'Managed portfolio of 15 concurrent projects with combined budget of $8M and 98% on-time delivery',
    'Introduced Agile methodology across 3 teams, improving sprint velocity by 35% within 6 months',
    'Reduced project risk exposure by 45% through implementation of proactive risk management framework',
    'Coordinated cross-functional team of 25 stakeholders across 4 time zones for global product launch',
    'Established PMO governance framework adopted as organisational standard across all departments',
    'Negotiated scope changes with C-suite executives, maintaining 100% stakeholder satisfaction scores',
    'Created resource allocation model that improved utilisation rates from 68% to 89%',
    'Implemented earned value management system providing real-time visibility into project health',
    'Led post-implementation reviews resulting in 22% improvement in future project estimation accuracy',
  ],
  'marketing': [
    'Orchestrated omnichannel marketing campaign generating $4.2M in qualified pipeline within Q1',
    'Increased organic search traffic by 185% through comprehensive SEO strategy and content optimisation',
    'Managed $2.5M digital advertising budget achieving 340% ROAS across Google, Meta, and LinkedIn',
    'Launched brand awareness campaign reaching 12M impressions with 4.2% engagement rate',
    'Built and grew email subscriber list from 5K to 85K, maintaining 28% open rate and 6% CTR',
    'Developed content marketing strategy producing 200+ assets, driving 45% of total lead generation',
    'Led website redesign project resulting in 52% increase in conversion rate and 38% lower bounce rate',
    'Created marketing automation workflows nurturing 15K leads per month with 18% conversion to SQL',
    'Established influencer partnership programme generating 500K+ impressions per campaign',
    'Analysed customer journey data to identify 3 key drop-off points, recovering 23% of abandoned leads',
  ],
  'data analyst': [
    'Built predictive analytics model achieving 94% accuracy in forecasting quarterly revenue trends',
    'Designed interactive Tableau dashboards used by 200+ stakeholders for real-time business insights',
    'Automated 15 weekly reports using Python and SQL, saving team 30 hours of manual effort per week',
    'Conducted A/B testing framework that improved conversion rates by 28% across 12 product features',
    'Processed and cleaned datasets of 50M+ records using pandas and PySpark for enterprise analytics',
    'Identified $2.3M in cost savings through supply chain data analysis and vendor performance modelling',
    'Developed customer segmentation model using K-means clustering, enabling targeted marketing campaigns',
    'Created ETL pipelines processing 500GB of daily data from 8 source systems into centralised warehouse',
    'Presented data-driven recommendations to executive team, influencing $5M budget allocation decisions',
    'Reduced data quality issues by 67% through implementation of automated validation checks',
  ],
  'sales': [
    'Exceeded annual quota by 142% generating $6.8M in new business revenue across enterprise accounts',
    'Expanded key account portfolio from 12 to 35 clients, increasing territory revenue by 78%',
    'Shortened average sales cycle from 90 days to 52 days through consultative selling methodology',
    'Built and managed pipeline of $15M with 45% close rate, consistently ranking in top 5% of sales team',
    'Negotiated multi-year contracts with Fortune 500 clients valued at $3.2M in annual recurring revenue',
    'Conducted 200+ product demonstrations resulting in 35% demo-to-close conversion rate',
    'Developed strategic partnerships with 8 channel partners, generating 30% of total team revenue',
    'Implemented CRM best practices increasing data accuracy from 65% to 95% across sales organisation',
    'Trained and onboarded 10 new sales representatives, with 8 achieving quota within first quarter',
    'Led quarterly business reviews with C-level executives maintaining 96% client retention rate',
  ],
};

function getFallbackBullets(jobTitle: string, count: number): string[] {
  const lower = jobTitle.toLowerCase();
  let bullets: string[] | undefined;

  // Match against known categories
  for (const [key, val] of Object.entries(FALLBACK_BULLETS)) {
    if (lower.includes(key) || key.includes(lower)) {
      bullets = val;
      break;
    }
  }

  if (!bullets) bullets = FALLBACK_BULLETS['default'];
  // Shuffle and take requested count
  const shuffled = [...bullets].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

// ---------------------------------------------------------------------------
// Main generation function
// ---------------------------------------------------------------------------
export async function generateBullets(request: AIBulletRequest): Promise<AIBulletResponse> {
  const count = request.count ?? 10;
  const apiKey = getGeminiApiKey();

  // No API key → use fallback library
  if (!apiKey) {
    return {
      bullets: getFallbackBullets(request.jobTitle, count),
    };
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const contextClause = request.context
      ? `\n\nAdditional context about the role:\n${request.context}`
      : '';

    const prompt = `You are an expert resume writer specialising in ATS-optimised resumes for the Australian job market.

Generate exactly ${count} resume bullet points for the role of "${request.jobTitle}".${contextClause}

Requirements for each bullet point:
1. Start with a STRONG action verb (e.g., Spearheaded, Architected, Orchestrated, Streamlined)
2. Include at least one quantifiable metric or number (%, $, #, timeframe)
3. Be concise — ideally 1-2 lines, no more than 25 words
4. Be ATS-friendly — use industry-standard keywords
5. Focus on impact and results, not just duties
6. Use Australian English spelling (e.g., "optimised" not "optimized")

Return ONLY the bullet points, one per line, with no numbering, dashes, or bullet markers. No additional commentary.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const bullets = text
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 10)
      .slice(0, count);

    if (bullets.length === 0) {
      return {
        bullets: getFallbackBullets(request.jobTitle, count),
        error: 'AI returned empty response. Showing pre-written bullets instead.',
      };
    }

    return { bullets };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error occurred';

    // If API key is invalid, clear it
    if (message.includes('API_KEY_INVALID') || message.includes('401') || message.includes('403')) {
      clearGeminiApiKey();
    }

    return {
      bullets: getFallbackBullets(request.jobTitle, count),
      error: `AI generation failed: ${message}. Showing pre-written bullets instead.`,
    };
  }
}
