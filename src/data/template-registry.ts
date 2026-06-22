import { TemplateConfig } from '@/types';

export const templateRegistry: TemplateConfig[] = [
  // ==========================================
  // TECHNOLOGY INDUSTRY (10 Templates)
  // ==========================================
  {
    id: 'tech_silicon',
    name: 'Silicon Valley',
    industry: 'Technology',
    layout: 'sidebar',
    description: 'A modern, dark-accented sidebar layout perfect for software engineers.',
    primaryColor: '#0f172a', // slate-900
    secondaryColor: '#3b82f6', // blue-500
    accentColor: '#60a5fa', // blue-400
    fontHeading: 'Inter, sans-serif',
    fontBody: 'Inter, sans-serif',
  },
  {
    id: 'tech_startup',
    name: 'Startup Hustle',
    industry: 'Technology',
    layout: 'grid',
    description: 'High impact banner layout that screams innovation and disruption.',
    primaryColor: '#4f46e5', // indigo-600
    secondaryColor: '#4338ca', // indigo-700
    accentColor: '#818cf8', // indigo-400
    fontHeading: 'Outfit, sans-serif',
    fontBody: 'Roboto, sans-serif',
  },
  {
    id: 'tech_enterprise',
    name: 'Enterprise Architect',
    industry: 'Technology',
    layout: 'executive',
    description: 'Clean, structured layout for senior leadership and architecture roles.',
    primaryColor: '#1e293b', // slate-800
    secondaryColor: '#475569', // slate-600
    accentColor: '#94a3b8', // slate-400
    fontHeading: 'Roboto Mono, monospace',
    fontBody: 'Inter, sans-serif',
  },
  {
    id: 'tech_frontend',
    name: 'Frontend Wizard',
    industry: 'Technology',
    layout: 'sidebar',
    description: 'Vibrant, colorful sidebar to highlight UI/UX and frontend skills.',
    primaryColor: '#ec4899', // pink-500
    secondaryColor: '#db2777', // pink-600
    accentColor: '#f472b6', // pink-400
    fontHeading: 'Poppins, sans-serif',
    fontBody: 'Outfit, sans-serif',
  },
  {
    id: 'tech_backend',
    name: 'Backend Systems',
    industry: 'Technology',
    layout: 'traditional',
    description: 'No-nonsense, highly dense traditional format for backend logic experts.',
    primaryColor: '#111827', // gray-900
    secondaryColor: '#374151', // gray-700
    accentColor: '#6b7280', // gray-500
    fontHeading: 'Fira Code, monospace',
    fontBody: 'Roboto, sans-serif',
  },
  {
    id: 'tech_data',
    name: 'Data Scientist',
    industry: 'Technology',
    layout: 'minimalist',
    description: 'Clean and analytical minimalist design focusing on metrics and models.',
    primaryColor: '#059669', // emerald-600
    secondaryColor: '#047857', // emerald-700
    accentColor: '#34d399', // emerald-400
    fontHeading: 'Inter, sans-serif',
    fontBody: 'Inter, sans-serif',
  },
  {
    id: 'tech_devops',
    name: 'DevOps Engineer',
    industry: 'Technology',
    layout: 'grid',
    description: 'Utilitarian grid layout representing infrastructure and pipelines.',
    primaryColor: '#ea580c', // orange-600
    secondaryColor: '#c2410c', // orange-700
    accentColor: '#fb923c', // orange-400
    fontHeading: 'Ubuntu, sans-serif',
    fontBody: 'Roboto, sans-serif',
  },
  {
    id: 'tech_cyber',
    name: 'Cyber Security',
    industry: 'Technology',
    layout: 'executive',
    description: 'Sharp, commanding layout for security analysts and penetration testers.',
    primaryColor: '#dc2626', // red-600
    secondaryColor: '#b91c1c', // red-700
    accentColor: '#f87171', // red-400
    fontHeading: 'Courier New, monospace',
    fontBody: 'Inter, sans-serif',
  },
  {
    id: 'tech_product',
    name: 'Product Manager',
    industry: 'Technology',
    layout: 'sidebar',
    description: 'Balanced layout highlighting leadership and cross-functional skills.',
    primaryColor: '#7c3aed', // violet-600
    secondaryColor: '#6d28d9', // violet-700
    accentColor: '#a78bfa', // violet-400
    fontHeading: 'Montserrat, sans-serif',
    fontBody: 'Open Sans, sans-serif',
  },
  {
    id: 'tech_cloud',
    name: 'Cloud Architect',
    industry: 'Technology',
    layout: 'minimalist',
    description: 'Airy, spacious design reflecting cloud computing environments.',
    primaryColor: '#0284c7', // sky-600
    secondaryColor: '#0369a1', // sky-700
    accentColor: '#38bdf8', // sky-400
    fontHeading: 'Nunito, sans-serif',
    fontBody: 'Nunito, sans-serif',
  },

  // ==========================================
  // FINANCE INDUSTRY (10 Templates)
  // ==========================================
  {
    id: 'fin_wallstreet',
    name: 'Wall Street',
    industry: 'Finance',
    layout: 'traditional',
    description: 'The gold-standard strict traditional format expected by major banks.',
    primaryColor: '#000000',
    secondaryColor: '#333333',
    accentColor: '#666666',
    fontHeading: 'Times New Roman, serif',
    fontBody: 'Times New Roman, serif',
  },
  {
    id: 'fin_investment',
    name: 'Investment Banker',
    industry: 'Finance',
    layout: 'executive',
    description: 'Highly professional layout focusing on deal flow and transaction sizes.',
    primaryColor: '#172554', // blue-950
    secondaryColor: '#1e3a8a', // blue-900
    accentColor: '#3b82f6', // blue-500
    fontHeading: 'Garamond, serif',
    fontBody: 'Arial, sans-serif',
  },
  {
    id: 'fin_quant',
    name: 'Quantitative Analyst',
    industry: 'Finance',
    layout: 'minimalist',
    description: 'Clean data-driven format for mathematics and algorithmic trading roles.',
    primaryColor: '#334155', // slate-700
    secondaryColor: '#1e293b', // slate-800
    accentColor: '#64748b', // slate-500
    fontHeading: 'Helvetica, sans-serif',
    fontBody: 'Helvetica, sans-serif',
  },
  {
    id: 'fin_fintech',
    name: 'FinTech Innovator',
    industry: 'Finance',
    layout: 'grid',
    description: 'Modern banner layout bridging the gap between finance and technology.',
    primaryColor: '#0d9488', // teal-600
    secondaryColor: '#0f766e', // teal-700
    accentColor: '#2dd4bf', // teal-400
    fontHeading: 'Outfit, sans-serif',
    fontBody: 'Inter, sans-serif',
  },
  {
    id: 'fin_accounting',
    name: 'Certified Accountant',
    industry: 'Finance',
    layout: 'traditional',
    description: 'Structured, reliable format perfect for CPA and audit professionals.',
    primaryColor: '#111827',
    secondaryColor: '#4b5563',
    accentColor: '#9ca3af',
    fontHeading: 'Georgia, serif',
    fontBody: 'Georgia, serif',
  },
  {
    id: 'fin_private_equity',
    name: 'Private Equity',
    industry: 'Finance',
    layout: 'sidebar',
    description: 'Premium dark-blue sidebar highlighting portfolios and asset management.',
    primaryColor: '#0f172a',
    secondaryColor: '#1e293b',
    accentColor: '#cbd5e1',
    fontHeading: 'Playfair Display, serif',
    fontBody: 'Inter, sans-serif',
  },
  {
    id: 'fin_wealth',
    name: 'Wealth Advisor',
    industry: 'Finance',
    layout: 'executive',
    description: 'Elegant and trustworthy layout for client-facing wealth managers.',
    primaryColor: '#b45309', // amber-700
    secondaryColor: '#92400e', // amber-800
    accentColor: '#d97706', // amber-600
    fontHeading: 'Merriweather, serif',
    fontBody: 'Open Sans, sans-serif',
  },
  {
    id: 'fin_actuary',
    name: 'Actuarial Science',
    industry: 'Finance',
    layout: 'minimalist',
    description: 'Precise, spacing-oriented layout for risk assessment professionals.',
    primaryColor: '#4338ca',
    secondaryColor: '#3730a3',
    accentColor: '#818cf8',
    fontHeading: 'Roboto, sans-serif',
    fontBody: 'Roboto, sans-serif',
  },
  {
    id: 'fin_crypto',
    name: 'Crypto Trader',
    industry: 'Finance',
    layout: 'sidebar',
    description: 'Futuristic, bold dark layout for decentralized finance experts.',
    primaryColor: '#18181b', // zinc-900
    secondaryColor: '#eab308', // yellow-500
    accentColor: '#facc15', // yellow-400
    fontHeading: 'Space Grotesk, sans-serif',
    fontBody: 'Inter, sans-serif',
  },
  {
    id: 'fin_corporate',
    name: 'Corporate Finance',
    industry: 'Finance',
    layout: 'grid',
    description: 'Strong, commanding banner layout for FP&A and corporate strategy.',
    primaryColor: '#1d4ed8', // blue-700
    secondaryColor: '#1e40af', // blue-800
    accentColor: '#60a5fa', // blue-400
    fontHeading: 'Arial, sans-serif',
    fontBody: 'Arial, sans-serif',
  },

  // ==========================================
  // HEALTHCARE INDUSTRY (10 Templates)
  // ==========================================
  {
    id: 'health_medical',
    name: 'Medical Doctor',
    industry: 'Healthcare',
    layout: 'executive',
    description: 'Clean, clinical layout prioritizing education and residency details.',
    primaryColor: '#0369a1', // sky-700
    secondaryColor: '#075985', // sky-800
    accentColor: '#38bdf8', // sky-400
    fontHeading: 'Georgia, serif',
    fontBody: 'Helvetica, sans-serif',
  },
  {
    id: 'health_nursing',
    name: 'Registered Nurse',
    industry: 'Healthcare',
    layout: 'traditional',
    description: 'Compassionate, highly readable layout focusing on patient care experience.',
    primaryColor: '#0f766e', // teal-700
    secondaryColor: '#115e59', // teal-800
    accentColor: '#2dd4bf', // teal-400
    fontHeading: 'Roboto, sans-serif',
    fontBody: 'Roboto, sans-serif',
  },
  {
    id: 'health_surgeon',
    name: 'Surgical Specialist',
    industry: 'Healthcare',
    layout: 'minimalist',
    description: 'Ultra-precise minimalist layout matching the precision of surgery.',
    primaryColor: '#111827',
    secondaryColor: '#374151',
    accentColor: '#6b7280',
    fontHeading: 'Inter, sans-serif',
    fontBody: 'Inter, sans-serif',
  },
  {
    id: 'health_research',
    name: 'Clinical Researcher',
    industry: 'Healthcare',
    layout: 'sidebar',
    description: 'Sidebar layout to cleanly separate publications and trials from experience.',
    primaryColor: '#4338ca',
    secondaryColor: '#3730a3',
    accentColor: '#818cf8',
    fontHeading: 'Merriweather, serif',
    fontBody: 'Open Sans, sans-serif',
  },
  {
    id: 'health_admin',
    name: 'Hospital Administrator',
    industry: 'Healthcare',
    layout: 'grid',
    description: 'Strong leadership banner layout for healthcare operations and management.',
    primaryColor: '#1e3a8a',
    secondaryColor: '#1e40af',
    accentColor: '#60a5fa',
    fontHeading: 'Arial, sans-serif',
    fontBody: 'Arial, sans-serif',
  },
  {
    id: 'health_pharmacy',
    name: 'Pharmacist',
    industry: 'Healthcare',
    layout: 'traditional',
    description: 'Detail-oriented traditional format highlighting certifications and precision.',
    primaryColor: '#166534', // green-800
    secondaryColor: '#14532d', // green-900
    accentColor: '#4ade80', // green-400
    fontHeading: 'Times New Roman, serif',
    fontBody: 'Helvetica, sans-serif',
  },
  {
    id: 'health_therapy',
    name: 'Physical Therapist',
    industry: 'Healthcare',
    layout: 'sidebar',
    description: 'Approachable, warm sidebar layout for rehabilitation professionals.',
    primaryColor: '#ea580c',
    secondaryColor: '#c2410c',
    accentColor: '#fb923c',
    fontHeading: 'Nunito, sans-serif',
    fontBody: 'Nunito, sans-serif',
  },
  {
    id: 'health_dental',
    name: 'Dentistry',
    industry: 'Healthcare',
    layout: 'executive',
    description: 'Crisp, bright layout for dental professionals and orthodontists.',
    primaryColor: '#0284c7',
    secondaryColor: '#0369a1',
    accentColor: '#38bdf8',
    fontHeading: 'Outfit, sans-serif',
    fontBody: 'Inter, sans-serif',
  },
  {
    id: 'health_emtb',
    name: 'Paramedic / EMT',
    industry: 'Healthcare',
    layout: 'grid',
    description: 'High-visibility layout reflecting emergency response and critical care.',
    primaryColor: '#dc2626',
    secondaryColor: '#b91c1c',
    accentColor: '#f87171',
    fontHeading: 'Roboto Condensed, sans-serif',
    fontBody: 'Roboto, sans-serif',
  },
  {
    id: 'health_psych',
    name: 'Psychiatrist',
    industry: 'Healthcare',
    layout: 'minimalist',
    description: 'Calm, spacious, and empathetic layout for mental health professionals.',
    primaryColor: '#5b21b6', // violet-800
    secondaryColor: '#4c1d95', // violet-900
    accentColor: '#8b5cf6', // violet-500
    fontHeading: 'Playfair Display, serif',
    fontBody: 'Georgia, serif',
  },

  // ==========================================
  // CREATIVE INDUSTRY (10 Templates)
  // ==========================================
  {
    id: 'create_designer',
    name: 'UI/UX Designer',
    industry: 'Creative',
    layout: 'sidebar',
    description: 'Highly visual layout featuring bold typography and strong contrast.',
    primaryColor: '#000000',
    secondaryColor: '#ec4899',
    accentColor: '#f472b6',
    fontHeading: 'Outfit, sans-serif',
    fontBody: 'Inter, sans-serif',
  },
  {
    id: 'create_artdir',
    name: 'Art Director',
    industry: 'Creative',
    layout: 'grid',
    description: 'Magazine-style grid layout that treats the resume like an editorial piece.',
    primaryColor: '#be185d', // pink-700
    secondaryColor: '#9d174d', // pink-800
    accentColor: '#f472b6',
    fontHeading: 'Playfair Display, serif',
    fontBody: 'Montserrat, sans-serif',
  },
  {
    id: 'create_copywriter',
    name: 'Copywriter',
    industry: 'Creative',
    layout: 'minimalist',
    description: 'Typography-first minimalist design that lets the words speak for themselves.',
    primaryColor: '#111827',
    secondaryColor: '#374151',
    accentColor: '#9ca3af',
    fontHeading: 'Merriweather, serif',
    fontBody: 'Merriweather, serif',
  },
  {
    id: 'create_animator',
    name: 'Animator',
    industry: 'Creative',
    layout: 'sidebar',
    description: 'Vibrant, dark-mode inspired sidebar for motion graphics and VFX artists.',
    primaryColor: '#18181b',
    secondaryColor: '#8b5cf6',
    accentColor: '#a78bfa',
    fontHeading: 'Space Grotesk, sans-serif',
    fontBody: 'Inter, sans-serif',
  },
  {
    id: 'create_photo',
    name: 'Photographer',
    industry: 'Creative',
    layout: 'grid',
    description: 'Lens-focused, high contrast layout perfect for visual artists.',
    primaryColor: '#0f172a',
    secondaryColor: '#cbd5e1',
    accentColor: '#94a3b8',
    fontHeading: 'Roboto Mono, monospace',
    fontBody: 'Roboto, sans-serif',
  },
  {
    id: 'create_fashion',
    name: 'Fashion Designer',
    industry: 'Creative',
    layout: 'minimalist',
    description: 'Avant-garde, ultra-spacious layout reflecting high-fashion aesthetics.',
    primaryColor: '#000000',
    secondaryColor: '#6b7280',
    accentColor: '#d1d5db',
    fontHeading: 'Didot, serif',
    fontBody: 'Helvetica, sans-serif',
  },
  {
    id: 'create_marketing',
    name: 'Creative Marketer',
    industry: 'Creative',
    layout: 'executive',
    description: 'Bold, conversion-focused layout highlighting campaign ROI and strategy.',
    primaryColor: '#ea580c',
    secondaryColor: '#c2410c',
    accentColor: '#fb923c',
    fontHeading: 'Poppins, sans-serif',
    fontBody: 'Open Sans, sans-serif',
  },
  {
    id: 'create_architect',
    name: 'Architect',
    industry: 'Creative',
    layout: 'traditional',
    description: 'Blueprint-inspired, highly structured and precise layout.',
    primaryColor: '#334155',
    secondaryColor: '#1e293b',
    accentColor: '#64748b',
    fontHeading: 'Helvetica Neue, sans-serif',
    fontBody: 'Helvetica Neue, sans-serif',
  },
  {
    id: 'create_music',
    name: 'Audio Engineer',
    industry: 'Creative',
    layout: 'sidebar',
    description: 'Studio-inspired layout with wave-like flow for sound designers.',
    primaryColor: '#047857',
    secondaryColor: '#065f46',
    accentColor: '#34d399',
    fontHeading: 'Ubuntu, sans-serif',
    fontBody: 'Roboto, sans-serif',
  },
  {
    id: 'create_game',
    name: 'Game Developer',
    industry: 'Creative',
    layout: 'grid',
    description: 'Cyber-themed, neon-accented grid layout for the interactive entertainment industry.',
    primaryColor: '#4c1d95',
    secondaryColor: '#2e1065',
    accentColor: '#8b5cf6',
    fontHeading: 'Fira Code, monospace',
    fontBody: 'Inter, sans-serif',
  },

  // ==========================================
  // ACADEMIC INDUSTRY (10 Templates)
  // ==========================================
  {
    id: 'acad_professor',
    name: 'University Professor',
    industry: 'Academic',
    layout: 'traditional',
    description: 'The standard CV format required for tenure-track academic applications.',
    primaryColor: '#000000',
    secondaryColor: '#333333',
    accentColor: '#666666',
    fontHeading: 'Times New Roman, serif',
    fontBody: 'Times New Roman, serif',
  },
  {
    id: 'acad_researcher',
    name: 'Postdoc Researcher',
    industry: 'Academic',
    layout: 'executive',
    description: 'Structured layout emphasizing publications, grants, and methodology.',
    primaryColor: '#1e3a8a',
    secondaryColor: '#172554',
    accentColor: '#3b82f6',
    fontHeading: 'Georgia, serif',
    fontBody: 'Arial, sans-serif',
  },
  {
    id: 'acad_teacher',
    name: 'Educator',
    industry: 'Academic',
    layout: 'sidebar',
    description: 'Approachable layout highlighting teaching philosophy and certifications.',
    primaryColor: '#0f766e',
    secondaryColor: '#115e59',
    accentColor: '#2dd4bf',
    fontHeading: 'Nunito, sans-serif',
    fontBody: 'Nunito, sans-serif',
  },
  {
    id: 'acad_admin',
    name: 'Higher Ed Administration',
    industry: 'Academic',
    layout: 'grid',
    description: 'Leadership-focused banner layout for deans and university administrators.',
    primaryColor: '#7c3aed',
    secondaryColor: '#6d28d9',
    accentColor: '#a78bfa',
    fontHeading: 'Montserrat, sans-serif',
    fontBody: 'Open Sans, sans-serif',
  },
  {
    id: 'acad_librarian',
    name: 'Archivist / Librarian',
    industry: 'Academic',
    layout: 'minimalist',
    description: 'Highly organized, detail-oriented layout with classic typography.',
    primaryColor: '#451a03', // amber-950
    secondaryColor: '#78350f', // amber-900
    accentColor: '#b45309', // amber-700
    fontHeading: 'Merriweather, serif',
    fontBody: 'Georgia, serif',
  },
  {
    id: 'acad_phd',
    name: 'PhD Candidate',
    industry: 'Academic',
    layout: 'traditional',
    description: 'Long-form CV layout capable of scaling to multiple pages for extensive bibliographies.',
    primaryColor: '#111827',
    secondaryColor: '#374151',
    accentColor: '#6b7280',
    fontHeading: 'Garamond, serif',
    fontBody: 'Garamond, serif',
  },
  {
    id: 'acad_scientist',
    name: 'Research Scientist',
    industry: 'Academic',
    layout: 'sidebar',
    description: 'Modern science layout dividing lab skills and wet-lab experience cleanly.',
    primaryColor: '#0369a1',
    secondaryColor: '#075985',
    accentColor: '#38bdf8',
    fontHeading: 'Roboto, sans-serif',
    fontBody: 'Roboto, sans-serif',
  },
  {
    id: 'acad_adjunct',
    name: 'Adjunct Lecturer',
    industry: 'Academic',
    layout: 'executive',
    description: 'Focused layout emphasizing course development and student evaluations.',
    primaryColor: '#b91c1c',
    secondaryColor: '#991b1b',
    accentColor: '#ef4444',
    fontHeading: 'Playfair Display, serif',
    fontBody: 'Arial, sans-serif',
  },
  {
    id: 'acad_k12',
    name: 'K-12 Principal',
    industry: 'Academic',
    layout: 'grid',
    description: 'Authoritative yet approachable layout for secondary education leadership.',
    primaryColor: '#1d4ed8',
    secondaryColor: '#1e40af',
    accentColor: '#60a5fa',
    fontHeading: 'Outfit, sans-serif',
    fontBody: 'Inter, sans-serif',
  },
  {
    id: 'acad_counselor',
    name: 'Academic Counselor',
    industry: 'Academic',
    layout: 'minimalist',
    description: 'Warm, empathetic, space-driven layout for student advisory roles.',
    primaryColor: '#0d9488',
    secondaryColor: '#0f766e',
    accentColor: '#2dd4bf',
    fontHeading: 'Poppins, sans-serif',
    fontBody: 'Open Sans, sans-serif',
  },
];
