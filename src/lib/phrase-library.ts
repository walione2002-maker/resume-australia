// Resume Australia — Pre-written Phrase Library
// 120+ ATS-optimised bullet points across 8 industry categories.

import type { PhraseEntry } from '@/types';

// ---------------------------------------------------------------------------
// Category definitions
// ---------------------------------------------------------------------------
export type PhraseCategory =
  | 'Technology'
  | 'Finance'
  | 'Marketing'
  | 'Healthcare'
  | 'Education'
  | 'Sales'
  | 'Design'
  | 'Management';

export const CATEGORIES: PhraseCategory[] = [
  'Technology',
  'Finance',
  'Marketing',
  'Healthcare',
  'Education',
  'Sales',
  'Design',
  'Management',
];

// ---------------------------------------------------------------------------
// Phrase Library (15 entries per category = 120 total)
// ---------------------------------------------------------------------------
export const PHRASE_LIBRARY: PhraseEntry[] = [
  // ========================= TECHNOLOGY =========================
  { id: 'tech-01', category: 'Technology', text: 'Architected and deployed microservices infrastructure serving 2M+ daily requests with 99.95% uptime SLA', tags: ['microservices', 'architecture', 'infrastructure', 'deployment', 'uptime'] },
  { id: 'tech-02', category: 'Technology', text: 'Reduced application latency by 73% through database query optimisation and Redis caching layer implementation', tags: ['performance', 'database', 'redis', 'caching', 'optimisation'] },
  { id: 'tech-03', category: 'Technology', text: 'Built CI/CD pipeline automating 200+ weekly deployments with zero-downtime releases using GitHub Actions', tags: ['ci/cd', 'devops', 'automation', 'github', 'deployment'] },
  { id: 'tech-04', category: 'Technology', text: 'Developed RESTful API consumed by 500K+ users with comprehensive OpenAPI documentation and 95% test coverage', tags: ['api', 'rest', 'testing', 'documentation', 'backend'] },
  { id: 'tech-05', category: 'Technology', text: 'Migrated legacy monolith to event-driven microservices architecture, reducing infrastructure costs by 45%', tags: ['migration', 'microservices', 'event-driven', 'cost reduction'] },
  { id: 'tech-06', category: 'Technology', text: 'Implemented real-time data pipeline using Apache Kafka processing 50K+ events per second with guaranteed delivery', tags: ['kafka', 'data pipeline', 'real-time', 'streaming', 'big data'] },
  { id: 'tech-07', category: 'Technology', text: 'Led adoption of TypeScript across 12 frontend repositories, reducing production bugs by 38%', tags: ['typescript', 'frontend', 'code quality', 'javascript'] },
  { id: 'tech-08', category: 'Technology', text: 'Designed and implemented OAuth 2.0 authentication system securing 1.2M user accounts across 5 services', tags: ['security', 'authentication', 'oauth', 'identity'] },
  { id: 'tech-09', category: 'Technology', text: 'Optimised PostgreSQL queries reducing average API response time from 2.3s to 180ms for core endpoints', tags: ['postgresql', 'sql', 'database', 'performance', 'optimisation'] },
  { id: 'tech-10', category: 'Technology', text: 'Containerised 25 services with Docker and orchestrated deployment on Kubernetes across 3 cloud regions', tags: ['docker', 'kubernetes', 'containers', 'cloud', 'orchestration'] },
  { id: 'tech-11', category: 'Technology', text: 'Built responsive React dashboard with real-time WebSocket updates used by 15K+ internal stakeholders daily', tags: ['react', 'dashboard', 'websocket', 'frontend', 'real-time'] },
  { id: 'tech-12', category: 'Technology', text: 'Established automated security scanning in CI pipeline, identifying and remediating 200+ vulnerabilities pre-deployment', tags: ['security', 'ci/cd', 'vulnerability', 'scanning', 'devops'] },
  { id: 'tech-13', category: 'Technology', text: 'Developed machine learning model achieving 94% accuracy for fraud detection, preventing $2.1M in annual losses', tags: ['machine learning', 'fraud detection', 'ai', 'python', 'data science'] },
  { id: 'tech-14', category: 'Technology', text: 'Implemented infrastructure-as-code using Terraform managing 150+ cloud resources across AWS and GCP environments', tags: ['terraform', 'iac', 'aws', 'gcp', 'cloud', 'infrastructure'] },
  { id: 'tech-15', category: 'Technology', text: 'Mentored 6 junior developers through structured code reviews, pair programming, and weekly tech talks', tags: ['mentoring', 'leadership', 'code review', 'team development'] },

  // ========================= FINANCE =========================
  { id: 'fin-01', category: 'Finance', text: 'Optimised portfolio allocation strategy resulting in 23% increase in risk-adjusted returns across $500M AUM', tags: ['portfolio', 'investment', 'risk management', 'returns', 'aum'] },
  { id: 'fin-02', category: 'Finance', text: 'Conducted financial modelling for 15+ M&A transactions totalling $2.8B in deal value', tags: ['financial modelling', 'mergers', 'acquisitions', 'valuation'] },
  { id: 'fin-03', category: 'Finance', text: 'Reduced month-end close cycle from 12 days to 5 days through process automation and workflow redesign', tags: ['month-end', 'automation', 'accounting', 'efficiency'] },
  { id: 'fin-04', category: 'Finance', text: 'Implemented SOX compliance framework across 8 business units achieving zero material weaknesses in annual audit', tags: ['sox', 'compliance', 'audit', 'internal controls', 'governance'] },
  { id: 'fin-05', category: 'Finance', text: 'Managed $120M annual operating budget with variance analysis achieving 99.2% forecast accuracy', tags: ['budgeting', 'forecasting', 'variance analysis', 'financial planning'] },
  { id: 'fin-06', category: 'Finance', text: 'Built discounted cash flow models for 20+ infrastructure projects supporting $1.5B in capital allocation decisions', tags: ['dcf', 'valuation', 'capital allocation', 'financial analysis'] },
  { id: 'fin-07', category: 'Finance', text: 'Automated regulatory reporting workflows saving 120 hours per quarter and eliminating manual data entry errors', tags: ['automation', 'regulatory', 'reporting', 'efficiency'] },
  { id: 'fin-08', category: 'Finance', text: 'Led FP&A team of 8 analysts delivering monthly board-level financial reports and strategic recommendations', tags: ['fp&a', 'leadership', 'financial reporting', 'strategy'] },
  { id: 'fin-09', category: 'Finance', text: 'Developed credit risk scoring model reducing default rates by 18% across $800M commercial loan portfolio', tags: ['credit risk', 'risk modelling', 'lending', 'analytics'] },
  { id: 'fin-10', category: 'Finance', text: 'Negotiated banking facility refinancing achieving 85bps reduction in borrowing costs, saving $3.2M annually', tags: ['treasury', 'debt management', 'negotiation', 'cost savings'] },
  { id: 'fin-11', category: 'Finance', text: 'Prepared IPO financial documentation and roadshow materials for successful $350M ASX listing', tags: ['ipo', 'capital markets', 'asx', 'equity', 'roadshow'] },
  { id: 'fin-12', category: 'Finance', text: 'Implemented transfer pricing framework ensuring compliance across 12 international jurisdictions', tags: ['transfer pricing', 'tax', 'international', 'compliance'] },
  { id: 'fin-13', category: 'Finance', text: 'Conducted scenario analysis and stress testing for enterprise risk management reporting to board committee', tags: ['risk management', 'stress testing', 'scenario analysis', 'board reporting'] },
  { id: 'fin-14', category: 'Finance', text: 'Streamlined accounts receivable process reducing DSO from 58 days to 34 days, improving cash flow by $12M', tags: ['accounts receivable', 'cash flow', 'dso', 'working capital'] },
  { id: 'fin-15', category: 'Finance', text: 'Deployed Power BI dashboards providing real-time P&L visibility across 6 business segments to 50+ managers', tags: ['power bi', 'dashboards', 'reporting', 'business intelligence'] },

  // ========================= MARKETING =========================
  { id: 'mkt-01', category: 'Marketing', text: 'Orchestrated omnichannel marketing campaign that generated $4.2M in qualified pipeline within a single quarter', tags: ['campaign', 'pipeline', 'omnichannel', 'lead generation', 'revenue'] },
  { id: 'mkt-02', category: 'Marketing', text: 'Increased organic search traffic by 185% through comprehensive SEO strategy including technical audit and content optimisation', tags: ['seo', 'organic', 'traffic', 'content', 'search'] },
  { id: 'mkt-03', category: 'Marketing', text: 'Managed $2.5M digital advertising budget achieving 340% ROAS across Google Ads, Meta, and LinkedIn', tags: ['digital advertising', 'roas', 'google ads', 'paid media', 'budget'] },
  { id: 'mkt-04', category: 'Marketing', text: 'Launched product go-to-market strategy resulting in 15K signups within first 30 days of release', tags: ['product launch', 'gtm', 'signups', 'growth', 'strategy'] },
  { id: 'mkt-05', category: 'Marketing', text: 'Built and grew email subscriber list from 5K to 85K maintaining 28% open rate and 6.2% click-through rate', tags: ['email marketing', 'subscriber', 'engagement', 'open rate', 'ctr'] },
  { id: 'mkt-06', category: 'Marketing', text: 'Developed content marketing strategy producing 200+ assets driving 45% of total inbound lead generation', tags: ['content marketing', 'content strategy', 'inbound', 'lead generation'] },
  { id: 'mkt-07', category: 'Marketing', text: 'Led website redesign project resulting in 52% increase in conversion rate and 38% reduction in bounce rate', tags: ['website', 'redesign', 'conversion rate', 'ux', 'optimisation'] },
  { id: 'mkt-08', category: 'Marketing', text: 'Created marketing automation workflows in HubSpot nurturing 15K leads per month with 18% MQL conversion', tags: ['marketing automation', 'hubspot', 'lead nurturing', 'workflows'] },
  { id: 'mkt-09', category: 'Marketing', text: 'Established influencer partnership programme generating 2M+ impressions across 25 campaigns', tags: ['influencer', 'partnerships', 'social media', 'brand awareness'] },
  { id: 'mkt-10', category: 'Marketing', text: 'Analysed customer journey data to identify 3 critical drop-off points, recovering 23% of abandoned leads', tags: ['analytics', 'customer journey', 'conversion', 'data analysis'] },
  { id: 'mkt-11', category: 'Marketing', text: 'Rebranded company identity including logo, messaging, and brand guidelines adopted across 15 touchpoints', tags: ['branding', 'brand identity', 'messaging', 'brand guidelines'] },
  { id: 'mkt-12', category: 'Marketing', text: 'Grew social media following by 300% to 120K followers while maintaining 5.4% average engagement rate', tags: ['social media', 'growth', 'engagement', 'community'] },
  { id: 'mkt-13', category: 'Marketing', text: 'Implemented A/B testing framework across landing pages improving average conversion rate from 2.1% to 5.8%', tags: ['a/b testing', 'cro', 'landing pages', 'experimentation'] },
  { id: 'mkt-14', category: 'Marketing', text: 'Produced 50+ video assets for YouTube and social channels accumulating 3M+ views and 85K new subscribers', tags: ['video marketing', 'youtube', 'content creation', 'production'] },
  { id: 'mkt-15', category: 'Marketing', text: 'Designed and executed ABM strategy targeting 50 enterprise accounts, securing 12 meetings with C-suite executives', tags: ['abm', 'account-based', 'enterprise', 'strategy', 'b2b'] },

  // ========================= HEALTHCARE =========================
  { id: 'hc-01', category: 'Healthcare', text: 'Streamlined patient intake process reducing average wait times by 40% across 3 clinical departments', tags: ['patient intake', 'wait times', 'process improvement', 'clinical'] },
  { id: 'hc-02', category: 'Healthcare', text: 'Implemented electronic health records system for 50K+ patient records with 99.9% data migration accuracy', tags: ['ehr', 'electronic health records', 'data migration', 'implementation'] },
  { id: 'hc-03', category: 'Healthcare', text: 'Reduced medication administration errors by 62% through barcode scanning workflow and staff training programme', tags: ['medication safety', 'quality improvement', 'patient safety', 'training'] },
  { id: 'hc-04', category: 'Healthcare', text: 'Managed clinical trial coordination for Phase III study enrolling 1,200 participants across 8 sites', tags: ['clinical trials', 'research', 'coordination', 'phase iii'] },
  { id: 'hc-05', category: 'Healthcare', text: 'Achieved 98% patient satisfaction score through implementation of bedside manner training and follow-up protocols', tags: ['patient satisfaction', 'quality', 'training', 'care'] },
  { id: 'hc-06', category: 'Healthcare', text: 'Developed telehealth programme serving 5K+ remote patients per month, expanding access by 300%', tags: ['telehealth', 'remote care', 'healthcare access', 'digital health'] },
  { id: 'hc-07', category: 'Healthcare', text: 'Led infection control initiative reducing hospital-acquired infections by 35% across 200-bed facility', tags: ['infection control', 'patient safety', 'quality improvement', 'hospital'] },
  { id: 'hc-08', category: 'Healthcare', text: 'Coordinated multidisciplinary care team of 12 specialists managing complex cases with 15% improved outcomes', tags: ['multidisciplinary', 'care coordination', 'team leadership', 'outcomes'] },
  { id: 'hc-09', category: 'Healthcare', text: 'Implemented evidence-based clinical pathway reducing average length of stay from 5.2 to 3.8 days', tags: ['clinical pathway', 'evidence-based', 'length of stay', 'efficiency'] },
  { id: 'hc-10', category: 'Healthcare', text: 'Trained 45 nursing staff on new clinical documentation standards achieving 100% compliance within 60 days', tags: ['training', 'nursing', 'documentation', 'compliance'] },
  { id: 'hc-11', category: 'Healthcare', text: 'Managed $8M departmental budget while delivering 12% cost savings through supply chain optimisation', tags: ['budget', 'cost savings', 'supply chain', 'management'] },
  { id: 'hc-12', category: 'Healthcare', text: 'Authored 8 peer-reviewed publications on clinical outcomes research cited 150+ times in literature', tags: ['research', 'publications', 'clinical outcomes', 'academic'] },
  { id: 'hc-13', category: 'Healthcare', text: 'Designed patient education materials in 6 languages improving treatment adherence rates by 28%', tags: ['patient education', 'adherence', 'multilingual', 'health literacy'] },
  { id: 'hc-14', category: 'Healthcare', text: 'Introduced lean methodology to surgical scheduling, increasing theatre utilisation from 72% to 91%', tags: ['lean', 'surgical', 'scheduling', 'efficiency', 'utilisation'] },
  { id: 'hc-15', category: 'Healthcare', text: 'Achieved Joint Commission accreditation with zero deficiencies across all 14 evaluated standards', tags: ['accreditation', 'compliance', 'quality', 'standards'] },

  // ========================= EDUCATION =========================
  { id: 'edu-01', category: 'Education', text: 'Developed and implemented curriculum reaching 500+ students across 3 grade levels with 92% pass rate', tags: ['curriculum', 'teaching', 'student outcomes', 'education'] },
  { id: 'edu-02', category: 'Education', text: 'Increased student standardised test scores by 25% through differentiated instruction strategies', tags: ['test scores', 'assessment', 'differentiated instruction', 'improvement'] },
  { id: 'edu-03', category: 'Education', text: 'Designed and launched online learning platform adopted by 2,000+ students across 12 schools', tags: ['e-learning', 'online learning', 'platform', 'technology'] },
  { id: 'edu-04', category: 'Education', text: 'Secured $350K in education grants funding STEM programmes for 800+ underserved students', tags: ['grants', 'funding', 'stem', 'equity'] },
  { id: 'edu-05', category: 'Education', text: 'Mentored 25+ student teachers through practicum programme with 100% successful certification rate', tags: ['mentoring', 'teacher training', 'practicum', 'professional development'] },
  { id: 'edu-06', category: 'Education', text: 'Implemented restorative justice programme reducing student suspensions by 60% and improving attendance by 15%', tags: ['restorative justice', 'behaviour', 'attendance', 'student support'] },
  { id: 'edu-07', category: 'Education', text: 'Led professional development workshops for 80+ educators on technology integration and blended learning', tags: ['professional development', 'technology', 'blended learning', 'training'] },
  { id: 'edu-08', category: 'Education', text: 'Coordinated International Baccalaureate programme achieving 95% diploma pass rate exceeding global average', tags: ['ib', 'international baccalaureate', 'programme coordination', 'excellence'] },
  { id: 'edu-09', category: 'Education', text: 'Created inclusive classroom strategies supporting 35 students with diverse learning needs and IEPs', tags: ['inclusion', 'special education', 'iep', 'differentiation'] },
  { id: 'edu-10', category: 'Education', text: 'Established school-industry partnership programme connecting 200+ students with workplace mentors annually', tags: ['partnerships', 'industry', 'mentoring', 'career development'] },
  { id: 'edu-11', category: 'Education', text: 'Published 5 academic papers on pedagogical innovation presented at 3 national education conferences', tags: ['research', 'publication', 'pedagogy', 'conferences'] },
  { id: 'edu-12', category: 'Education', text: 'Introduced gamification elements to maths curriculum increasing student engagement scores by 40%', tags: ['gamification', 'engagement', 'mathematics', 'innovation'] },
  { id: 'edu-13', category: 'Education', text: 'Managed school library transformation into digital learning hub serving 1,500+ students and staff', tags: ['library', 'digital learning', 'transformation', 'resources'] },
  { id: 'edu-14', category: 'Education', text: 'Developed assessment rubrics adopted across entire faculty, standardising grading for 3,000+ students', tags: ['assessment', 'rubrics', 'standardisation', 'grading'] },
  { id: 'edu-15', category: 'Education', text: 'Organised annual STEM fair attracting 400+ participants and securing 3 corporate sponsorships worth $50K', tags: ['stem', 'events', 'sponsorship', 'community engagement'] },

  // ========================= SALES =========================
  { id: 'sales-01', category: 'Sales', text: 'Exceeded quarterly sales targets by 135% through strategic account development and consultative selling', tags: ['quota', 'sales targets', 'account development', 'consultative'] },
  { id: 'sales-02', category: 'Sales', text: 'Generated $8.5M in new business revenue by building relationships with 40+ enterprise accounts', tags: ['revenue', 'new business', 'enterprise', 'relationship building'] },
  { id: 'sales-03', category: 'Sales', text: 'Shortened average sales cycle from 90 days to 52 days through improved qualification and demo processes', tags: ['sales cycle', 'qualification', 'efficiency', 'process improvement'] },
  { id: 'sales-04', category: 'Sales', text: 'Built and managed $15M pipeline with 42% close rate, consistently ranking in top 5% of sales team', tags: ['pipeline', 'close rate', 'top performer', 'sales management'] },
  { id: 'sales-05', category: 'Sales', text: 'Negotiated multi-year SaaS contracts with Fortune 500 clients worth $4.2M in annual recurring revenue', tags: ['negotiation', 'saas', 'enterprise sales', 'arr', 'contracts'] },
  { id: 'sales-06', category: 'Sales', text: 'Expanded territory revenue by 78% year-over-year through strategic prospecting and partner channels', tags: ['territory', 'growth', 'prospecting', 'partnerships'] },
  { id: 'sales-07', category: 'Sales', text: 'Trained and onboarded 12 new sales representatives with 10 achieving quota within first 90 days', tags: ['training', 'onboarding', 'leadership', 'team development'] },
  { id: 'sales-08', category: 'Sales', text: 'Implemented Salesforce CRM best practices increasing data accuracy from 65% to 96% across 30-person team', tags: ['salesforce', 'crm', 'data quality', 'process improvement'] },
  { id: 'sales-09', category: 'Sales', text: 'Led quarterly business reviews with C-suite executives maintaining 97% client retention rate', tags: ['qbr', 'executive relationships', 'retention', 'account management'] },
  { id: 'sales-10', category: 'Sales', text: 'Developed channel partner programme generating 35% of total team revenue through 15 reseller agreements', tags: ['channel', 'partnerships', 'reseller', 'indirect sales'] },
  { id: 'sales-11', category: 'Sales', text: 'Conducted 250+ product demonstrations achieving 38% demo-to-close conversion rate', tags: ['demos', 'presentations', 'conversion', 'product knowledge'] },
  { id: 'sales-12', category: 'Sales', text: 'Created sales playbook and battle cards adopted by 50-person sales organisation across APAC region', tags: ['playbook', 'sales enablement', 'battle cards', 'documentation'] },
  { id: 'sales-13', category: 'Sales', text: 'Won President\'s Club award 3 consecutive years for exceeding annual quota by average of 128%', tags: ['awards', 'recognition', 'top performer', 'excellence'] },
  { id: 'sales-14', category: 'Sales', text: 'Identified and closed 8 cross-sell opportunities within existing accounts generating $1.8M in additional revenue', tags: ['cross-sell', 'upsell', 'account growth', 'revenue expansion'] },
  { id: 'sales-15', category: 'Sales', text: 'Represented company at 12 industry conferences generating 200+ qualified leads per event', tags: ['conferences', 'networking', 'lead generation', 'events'] },

  // ========================= DESIGN =========================
  { id: 'des-01', category: 'Design', text: 'Led end-to-end design process for flagship product used by 100K+ users, increasing engagement by 45%', tags: ['product design', 'ux', 'engagement', 'user experience'] },
  { id: 'des-02', category: 'Design', text: 'Established design system with 200+ reusable components reducing development handoff time by 60%', tags: ['design system', 'components', 'efficiency', 'ui'] },
  { id: 'des-03', category: 'Design', text: 'Conducted 50+ user research sessions informing product decisions that improved NPS score from 32 to 67', tags: ['user research', 'nps', 'product strategy', 'insights'] },
  { id: 'des-04', category: 'Design', text: 'Redesigned checkout flow reducing cart abandonment rate from 68% to 31% and increasing revenue by $2.1M', tags: ['checkout', 'conversion', 'e-commerce', 'ux design'] },
  { id: 'des-05', category: 'Design', text: 'Created brand identity system for 3 product lines including logos, typography, and colour palette guidelines', tags: ['brand identity', 'visual design', 'branding', 'guidelines'] },
  { id: 'des-06', category: 'Design', text: 'Built and maintained Figma component library used by 8 designers and 15 developers across 4 product teams', tags: ['figma', 'design tools', 'collaboration', 'component library'] },
  { id: 'des-07', category: 'Design', text: 'Designed responsive web experience achieving WCAG 2.1 AA compliance across all 35 page templates', tags: ['accessibility', 'wcag', 'responsive', 'web design', 'compliance'] },
  { id: 'des-08', category: 'Design', text: 'Led design sprint workshops with cross-functional teams, generating 15 validated product concepts in 6 months', tags: ['design sprint', 'workshops', 'innovation', 'collaboration'] },
  { id: 'des-09', category: 'Design', text: 'Implemented usability testing programme identifying 28 critical UX issues before product launch', tags: ['usability testing', 'qa', 'ux research', 'quality'] },
  { id: 'des-10', category: 'Design', text: 'Designed onboarding flow improving user activation rate from 25% to 58% within first 7 days', tags: ['onboarding', 'activation', 'user flow', 'retention'] },
  { id: 'des-11', category: 'Design', text: 'Created 500+ marketing assets including social media graphics, email templates, and presentation decks', tags: ['graphic design', 'marketing', 'visual content', 'production'] },
  { id: 'des-12', category: 'Design', text: 'Mentored 4 junior designers establishing critique sessions and career development frameworks', tags: ['mentoring', 'leadership', 'design critique', 'team development'] },
  { id: 'des-13', category: 'Design', text: 'Produced motion design system with 40+ micro-interactions improving perceived performance by 35%', tags: ['motion design', 'animation', 'micro-interactions', 'performance'] },
  { id: 'des-14', category: 'Design', text: 'Redesigned mobile app experience achieving 4.8-star App Store rating and 92% user satisfaction score', tags: ['mobile design', 'app store', 'user satisfaction', 'mobile ux'] },
  { id: 'des-15', category: 'Design', text: 'Conducted competitive analysis across 15 products, presenting actionable design recommendations to VP of Product', tags: ['competitive analysis', 'strategy', 'research', 'stakeholder communication'] },

  // ========================= MANAGEMENT =========================
  { id: 'mgmt-01', category: 'Management', text: 'Directed cross-functional team of 15 engineers to deliver $2M project 3 weeks ahead of schedule', tags: ['project delivery', 'team leadership', 'engineering', 'budget'] },
  { id: 'mgmt-02', category: 'Management', text: 'Grew department from 8 to 35 employees while maintaining 94% team engagement score over 3 years', tags: ['team building', 'scaling', 'engagement', 'hiring'] },
  { id: 'mgmt-03', category: 'Management', text: 'Implemented OKR framework across 5 departments aligning 200+ employees with company strategic objectives', tags: ['okr', 'strategy', 'alignment', 'performance management'] },
  { id: 'mgmt-04', category: 'Management', text: 'Reduced employee turnover from 28% to 12% through comprehensive retention programme and career pathing', tags: ['retention', 'turnover', 'culture', 'career development'] },
  { id: 'mgmt-05', category: 'Management', text: 'Managed P&L responsibility for $25M business unit achieving 18% year-over-year revenue growth', tags: ['p&l', 'revenue growth', 'business unit', 'financial management'] },
  { id: 'mgmt-06', category: 'Management', text: 'Led organisational restructure consolidating 4 overlapping teams into 2 streamlined units, saving $1.5M', tags: ['restructuring', 'organisational design', 'efficiency', 'cost savings'] },
  { id: 'mgmt-07', category: 'Management', text: 'Established quarterly strategic planning process adopted by executive leadership team of 12 directors', tags: ['strategic planning', 'executive leadership', 'governance', 'process'] },
  { id: 'mgmt-08', category: 'Management', text: 'Negotiated and managed relationships with 25+ vendors reducing procurement costs by 22% annually', tags: ['vendor management', 'procurement', 'negotiation', 'cost reduction'] },
  { id: 'mgmt-09', category: 'Management', text: 'Launched employee development programme with 85% participation rate and measurable skill improvement', tags: ['learning and development', 'training', 'employee development', 'skills'] },
  { id: 'mgmt-10', category: 'Management', text: 'Drove digital transformation initiative resulting in 40% improvement in operational efficiency across 6 functions', tags: ['digital transformation', 'operations', 'efficiency', 'change management'] },
  { id: 'mgmt-11', category: 'Management', text: 'Chaired monthly steering committee presenting project portfolio health to board of directors', tags: ['steering committee', 'board reporting', 'governance', 'portfolio management'] },
  { id: 'mgmt-12', category: 'Management', text: 'Developed succession planning framework identifying and grooming 8 high-potential leaders for senior roles', tags: ['succession planning', 'talent management', 'leadership development'] },
  { id: 'mgmt-13', category: 'Management', text: 'Implemented LEAN Six Sigma methodology across operations, delivering 15 process improvements worth $3.2M', tags: ['lean', 'six sigma', 'process improvement', 'operations'] },
  { id: 'mgmt-14', category: 'Management', text: 'Managed crisis response team during COVID-19, transitioning 500+ employees to remote work within 2 weeks', tags: ['crisis management', 'remote work', 'change management', 'business continuity'] },
  { id: 'mgmt-15', category: 'Management', text: 'Established diversity and inclusion council increasing underrepresented group hiring by 45% within 12 months', tags: ['diversity', 'inclusion', 'dei', 'hiring', 'culture'] },
];

// ---------------------------------------------------------------------------
// Search function — fuzzy matching across text and tags
// ---------------------------------------------------------------------------
export function searchPhrases(query: string, category?: string): PhraseEntry[] {
  let pool = PHRASE_LIBRARY;

  // Filter by category first if specified
  if (category && category !== 'All') {
    pool = pool.filter((p) => p.category === category);
  }

  // If no query, return all in pool
  if (!query.trim()) return pool;

  const terms = query
    .toLowerCase()
    .split(/\s+/)
    .filter((t) => t.length > 1);

  // Score each entry — higher = better match
  const scored = pool.map((entry) => {
    let score = 0;
    const lowerText = entry.text.toLowerCase();
    const lowerTags = entry.tags.map((t) => t.toLowerCase());

    for (const term of terms) {
      // Exact match in text
      if (lowerText.includes(term)) score += 3;
      // Tag exact match
      if (lowerTags.some((tag) => tag === term)) score += 5;
      // Tag partial match
      if (lowerTags.some((tag) => tag.includes(term) || term.includes(tag))) score += 2;
      // Category match
      if (entry.category.toLowerCase().includes(term)) score += 1;
    }

    return { entry, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((s) => s.entry);
}
