// Resume Australia — ATS Scoring Engine
// Tokenizes resume + job description, normalizes terms, and produces a
// match score with matched/missing keywords and actionable suggestions.

import type { ATSResult } from '@/types';

// ---------------------------------------------------------------------------
// Stop words — filtered out before keyword extraction (120+)
// ---------------------------------------------------------------------------
const STOP_WORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'also', 'am',
  'an', 'and', 'any', 'are', 'aren\'t', 'as', 'at', 'be', 'because', 'been',
  'before', 'being', 'below', 'between', 'both', 'but', 'by', 'can', 'can\'t',
  'cannot', 'could', 'couldn\'t', 'did', 'didn\'t', 'do', 'does', 'doesn\'t',
  'doing', 'don\'t', 'down', 'during', 'each', 'etc', 'even', 'every', 'few',
  'for', 'from', 'further', 'get', 'got', 'had', 'hadn\'t', 'has', 'hasn\'t',
  'have', 'haven\'t', 'having', 'he', 'her', 'here', 'hers', 'herself', 'him',
  'himself', 'his', 'how', 'i', 'if', 'in', 'into', 'is', 'isn\'t', 'it',
  'it\'s', 'its', 'itself', 'just', 'let\'s', 'may', 'me', 'might', 'more',
  'most', 'must', 'mustn\'t', 'my', 'myself', 'need', 'no', 'nor', 'not',
  'now', 'of', 'off', 'on', 'once', 'only', 'or', 'other', 'ought', 'our',
  'ours', 'ourselves', 'out', 'over', 'own', 'per', 'please', 'same', 'shall',
  'shan\'t', 'she', 'should', 'shouldn\'t', 'so', 'some', 'such', 'than',
  'that', 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there',
  'these', 'they', 'this', 'those', 'through', 'to', 'too', 'under', 'until',
  'up', 'upon', 'us', 'very', 'was', 'wasn\'t', 'we', 'were', 'weren\'t',
  'what', 'when', 'where', 'which', 'while', 'who', 'whom', 'why', 'will',
  'with', 'within', 'without', 'won\'t', 'would', 'wouldn\'t', 'you', 'your',
  'yours', 'yourself', 'yourselves',
  // common resume filler words
  'able', 'well', 'new', 'use', 'used', 'using', 'work', 'working',
  'including', 'include', 'ensure', 'role', 'looking', 'join', 'team',
  'strong', 'good', 'great', 'experience', 'years', 'year', 'required',
  'preferred', 'responsibilities', 'requirements', 'job', 'position',
  'company', 'apply', 'candidate', 'ideal', 'qualifications',
]);

// ---------------------------------------------------------------------------
// Basic stemmer – strips common English suffixes
// ---------------------------------------------------------------------------
function stem(word: string): string {
  let w = word;

  // -ation / -tion / -sion / -ment / -ness / -ible / -able / -ful / -less / -ous / -ive
  const longSuffixes = [
    'isation', 'ization', 'ation', 'tion', 'sion',
    'ment', 'ness', 'ible', 'able', 'ful', 'less', 'ous', 'ive',
    'ment', 'ence', 'ance', 'ical', 'ally',
  ];
  for (const suffix of longSuffixes) {
    if (w.length > suffix.length + 2 && w.endsWith(suffix)) {
      w = w.slice(0, -suffix.length);
      break; // only strip one long suffix
    }
  }

  // shorter suffixes: -ing, -ed, -er, -ly, -es, -s
  if (w.length > 5 && w.endsWith('ing')) w = w.slice(0, -3);
  else if (w.length > 4 && w.endsWith('ed')) w = w.slice(0, -2);
  else if (w.length > 4 && w.endsWith('er')) w = w.slice(0, -2);
  else if (w.length > 4 && w.endsWith('ly')) w = w.slice(0, -2);
  else if (w.length > 4 && w.endsWith('es')) w = w.slice(0, -2);
  else if (w.length > 3 && w.endsWith('s') && !w.endsWith('ss')) w = w.slice(0, -1);

  return w;
}

// ---------------------------------------------------------------------------
// Tokenizer — lowercase, strip punctuation, split by whitespace
// ---------------------------------------------------------------------------
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9#+.\-/\s]/g, ' ')   // keep # + . - / for tech terms
    .split(/\s+/)
    .filter((t) => t.length > 1);
}

// ---------------------------------------------------------------------------
// Extract meaningful keywords from job description text
// Also captures multi-word phrases like "machine learning", "project management"
// ---------------------------------------------------------------------------
function extractKeywords(text: string): string[] {
  const tokens = tokenize(text);
  const singles = tokens.filter((t) => !STOP_WORDS.has(t) && t.length > 2);

  // Extract 2-word phrases (bigrams) — very common in JDs
  const bigrams: string[] = [];
  for (let i = 0; i < tokens.length - 1; i++) {
    const a = tokens[i];
    const b = tokens[i + 1];
    if (!STOP_WORDS.has(a) && !STOP_WORDS.has(b) && a.length > 2 && b.length > 2) {
      bigrams.push(`${a} ${b}`);
    }
  }

  // De-duplicate, keeping singles + bigrams
  const seen = new Set<string>();
  const keywords: string[] = [];

  // Bigrams first (higher value)
  for (const bg of bigrams) {
    if (!seen.has(bg)) {
      seen.add(bg);
      keywords.push(bg);
    }
  }
  // Then singles
  for (const s of singles) {
    if (!seen.has(s)) {
      seen.add(s);
      keywords.push(s);
    }
  }

  return keywords;
}

// ---------------------------------------------------------------------------
// Check if a keyword is found in resume tokens (exact, stem, or partial)
// Returns a score: 1.0 = exact, 0.7 = stem, 0.3 = partial, 0 = not found
// ---------------------------------------------------------------------------
function matchKeyword(keyword: string, resumeText: string, resumeTokens: Set<string>, resumeStems: Set<string>): number {
  // For bigrams, check if the exact phrase appears in the lowercased text
  if (keyword.includes(' ')) {
    if (resumeText.includes(keyword)) return 1.0;
    // Check stem match for bigrams
    const parts = keyword.split(' ');
    const stemmedParts = parts.map(stem);
    const allStemsFound = stemmedParts.every((s) => resumeStems.has(s));
    if (allStemsFound) return 0.7;
    // Check if at least one word from the bigram is present
    const anyFound = parts.some((p) => resumeTokens.has(p) || resumeStems.has(stem(p)));
    if (anyFound) return 0.3;
    return 0;
  }

  // Single word checks
  if (resumeTokens.has(keyword)) return 1.0;

  const keywordStem = stem(keyword);
  if (resumeStems.has(keywordStem)) return 0.7;

  // Partial match — keyword is a substring of a resume token or vice versa
  for (const token of resumeTokens) {
    if (token.length > 3 && keyword.length > 3) {
      if (token.includes(keyword) || keyword.includes(token)) return 0.3;
    }
  }

  return 0;
}

// ---------------------------------------------------------------------------
// Suggest where to add missing keywords
// ---------------------------------------------------------------------------
function generateSuggestions(missingKeywords: string[]): string[] {
  const suggestions: string[] = [];

  if (missingKeywords.length === 0) {
    suggestions.push('Great job! Your resume covers the key terms from this job description.');
    return suggestions;
  }

  // Categorize missing keywords for smarter suggestions
  const techTerms: string[] = [];
  const softSkills: string[] = [];
  const otherTerms: string[] = [];

  const techIndicators = [
    'python', 'java', 'javascript', 'typescript', 'react', 'angular', 'vue',
    'node', 'sql', 'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'api',
    'git', 'agile', 'scrum', 'devops', 'ci/cd', 'machine', 'learning',
    'data', 'cloud', 'linux', 'css', 'html', 'ruby', 'go', 'rust', 'swift',
    'kotlin', 'flutter', 'django', 'flask', 'spring', 'mongodb', 'redis',
    'graphql', 'rest', 'microservices', 'terraform', 'ansible', 'jenkins',
    'c#', 'c++', '.net', 'php', 'scala', 'hadoop', 'spark', 'kafka',
    'tableau', 'powerbi', 'excel', 'sap', 'salesforce', 'jira', 'confluence',
    'figma', 'sketch', 'adobe', 'photoshop', 'illustrator',
  ];

  const softIndicators = [
    'leadership', 'communication', 'collaboration', 'analytical',
    'problem', 'solving', 'critical', 'thinking', 'teamwork', 'adaptability',
    'creativity', 'interpersonal', 'negotiation', 'presentation',
    'mentoring', 'coaching', 'strategic', 'planning', 'organizational',
    'decision', 'making', 'time', 'management', 'attention', 'detail',
  ];

  for (const kw of missingKeywords) {
    const lower = kw.toLowerCase();
    if (techIndicators.some((t) => lower.includes(t))) {
      techTerms.push(kw);
    } else if (softIndicators.some((s) => lower.includes(s))) {
      softSkills.push(kw);
    } else {
      otherTerms.push(kw);
    }
  }

  if (techTerms.length > 0) {
    const topTech = techTerms.slice(0, 5);
    suggestions.push(
      `Add these technical skills to your Skills section: ${topTech.map((t) => `"${t}"`).join(', ')}`
    );
  }

  if (softSkills.length > 0) {
    const topSoft = softSkills.slice(0, 3);
    suggestions.push(
      `Weave these soft skills into your experience bullets: ${topSoft.map((s) => `"${s}"`).join(', ')}`
    );
  }

  if (otherTerms.length > 0) {
    const topOther = otherTerms.slice(0, 5);
    for (const term of topOther) {
      suggestions.push(`Consider adding "${term}" to your resume — it appears in the job description`);
    }
  }

  if (missingKeywords.length > 10) {
    suggestions.push(
      `Your resume is missing ${missingKeywords.length} keywords. Consider tailoring your resume more closely to this specific job.`
    );
  }

  if (missingKeywords.length > 5) {
    suggestions.push(
      'Tip: Mirror the exact phrasing from the job description — ATS systems often do exact string matching.'
    );
  }

  suggestions.push(
    'Tip: Place the most critical keywords in your Summary and Skills sections for maximum ATS visibility.'
  );

  return suggestions;
}

// ---------------------------------------------------------------------------
// Main scoring function
// ---------------------------------------------------------------------------
export function scoreResume(resumeText: string, jobDescription: string): ATSResult {
  if (!resumeText.trim() || !jobDescription.trim()) {
    return {
      score: 0,
      matchedKeywords: [],
      missingKeywords: [],
      suggestions: ['Please provide both your resume text and a job description to analyze.'],
    };
  }

  // Tokenize resume
  const resumeLower = resumeText.toLowerCase();
  const resumeTokens = new Set(tokenize(resumeText).filter((t) => t.length > 1));
  const resumeStems = new Set([...resumeTokens].map(stem));

  // Extract keywords from job description
  const jdKeywords = extractKeywords(jobDescription);

  if (jdKeywords.length === 0) {
    return {
      score: 0,
      matchedKeywords: [],
      missingKeywords: [],
      suggestions: ['The job description doesn\'t contain enough meaningful keywords to analyze.'],
    };
  }

  // Score each keyword
  let totalPoints = 0;
  const matchedKeywords: string[] = [];
  const missingKeywords: string[] = [];

  for (const keyword of jdKeywords) {
    const matchScore = matchKeyword(keyword, resumeLower, resumeTokens, resumeStems);
    totalPoints += matchScore;

    if (matchScore >= 0.7) {
      matchedKeywords.push(keyword);
    } else if (matchScore === 0) {
      missingKeywords.push(keyword);
    }
    // partial matches (0.3) count toward score but aren't listed as "matched"
  }

  // Calculate percentage
  const rawScore = (totalPoints / jdKeywords.length) * 100;
  const score = Math.min(100, Math.round(rawScore));

  // Generate suggestions
  const suggestions = generateSuggestions(missingKeywords);

  return {
    score,
    matchedKeywords,
    missingKeywords,
    suggestions,
  };
}
