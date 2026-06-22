// Resume Australia — Action Verb Enforcer
// Scans experience bullet points for weak/passive verbs and suggests
// powerful, ATS-optimised alternatives.

import type { ExperienceEntry, VerbWarning } from '@/types';

// ---------------------------------------------------------------------------
// Weak verbs → strong replacement suggestions (30 entries)
// ---------------------------------------------------------------------------
export const WEAK_VERBS: Record<string, string[]> = {
  'helped':          ['facilitated', 'enabled', 'supported', 'contributed to'],
  'did':             ['executed', 'accomplished', 'delivered', 'completed'],
  'worked':          ['collaborated', 'partnered', 'contributed', 'engaged'],
  'made':            ['developed', 'created', 'produced', 'designed'],
  'got':             ['obtained', 'secured', 'achieved', 'acquired'],
  'used':            ['leveraged', 'utilised', 'employed', 'applied'],
  'tried':           ['endeavoured', 'pursued', 'attempted', 'strived'],
  'ran':             ['directed', 'managed', 'operated', 'administered'],
  'handled':         ['managed', 'coordinated', 'processed', 'administered'],
  'showed':          ['demonstrated', 'illustrated', 'presented', 'showcased'],
  'started':         ['initiated', 'launched', 'established', 'founded'],
  'led':             ['spearheaded', 'directed', 'championed', 'orchestrated'],
  'went':            ['transitioned', 'progressed', 'advanced', 'navigated'],
  'put':             ['implemented', 'deployed', 'established', 'integrated'],
  'kept':            ['maintained', 'sustained', 'preserved', 'upheld'],
  'fixed':           ['resolved', 'remediated', 'rectified', 'troubleshot'],
  'gave':            ['delivered', 'provided', 'presented', 'contributed'],
  'told':            ['communicated', 'briefed', 'informed', 'advised'],
  'looked':          ['analysed', 'evaluated', 'assessed', 'reviewed'],
  'thought':         ['conceptualised', 'strategised', 'envisioned', 'formulated'],
  'changed':         ['transformed', 'redesigned', 'revamped', 'restructured'],
  'assisted':        ['supported', 'facilitated', 'contributed to', 'aided'],
  'responsible':     ['accountable for', 'managed', 'oversaw', 'directed'],
  'participated':    ['contributed', 'collaborated', 'engaged in', 'partnered'],
  'learned':         ['acquired expertise in', 'mastered', 'developed proficiency in', 'studied'],
  'needed':          ['required', 'necessitated', 'demanded', 'warranted'],
  'improved':        ['enhanced', 'optimised', 'elevated', 'strengthened'],
  'set':             ['established', 'configured', 'defined', 'implemented'],
  'built':           ['engineered', 'constructed', 'architected', 'developed'],
  'took':            ['assumed', 'undertook', 'accepted', 'adopted'],
};

// Multi-word weak phrases — detected anywhere in the bullet
const WEAK_PHRASES: Record<string, string[]> = {
  'was responsible for': ['managed', 'directed', 'oversaw', 'led'],
  'was in charge of':    ['managed', 'led', 'supervised', 'headed'],
  'helped with':         ['facilitated', 'contributed to', 'supported', 'assisted with'],
  'worked on':           ['developed', 'contributed to', 'engineered', 'collaborated on'],
  'worked with':         ['partnered with', 'collaborated with', 'coordinated with', 'liaised with'],
  'took part in':        ['participated in', 'contributed to', 'engaged in', 'played a key role in'],
  'in charge of':        ['responsible for', 'managed', 'oversaw', 'directed'],
  'dealt with':          ['managed', 'resolved', 'addressed', 'handled'],
  'came up with':        ['devised', 'conceived', 'formulated', 'designed'],
  'was part of':         ['contributed to', 'served on', 'participated in', 'collaborated within'],
};

// ---------------------------------------------------------------------------
// Analyse experience entries for weak verbs
// ---------------------------------------------------------------------------
export function analyzeVerbs(experience: ExperienceEntry[]): VerbWarning[] {
  const warnings: VerbWarning[] = [];

  for (const entry of experience) {
    for (let bulletIndex = 0; bulletIndex < entry.bullets.length; bulletIndex++) {
      const bullet = entry.bullets[bulletIndex];
      if (!bullet || !bullet.trim()) continue;

      const trimmed = bullet.trim();

      // --- Check multi-word phrases first ---
      const lowerBullet = trimmed.toLowerCase();
      for (const [phrase, suggestions] of Object.entries(WEAK_PHRASES)) {
        const position = lowerBullet.indexOf(phrase);
        if (position !== -1) {
          warnings.push({
            bulletIndex,
            experienceId: entry.id,
            weakVerb: phrase,
            position,
            suggestions,
          });
        }
      }

      // --- Check first word of the bullet ---
      const firstWord = trimmed
        .replace(/^[•\-–—*·]\s*/, '')  // strip bullet markers
        .split(/\s+/)[0]
        ?.toLowerCase()
        .replace(/[^a-z]/g, '');

      if (firstWord && WEAK_VERBS[firstWord]) {
        warnings.push({
          bulletIndex,
          experienceId: entry.id,
          weakVerb: firstWord,
          position: 0,
          suggestions: WEAK_VERBS[firstWord],
        });
      }
    }
  }

  return warnings;
}

// ---------------------------------------------------------------------------
// Helper: replace a weak verb in a bullet string with a strong alternative
// ---------------------------------------------------------------------------
export function replaceVerb(bullet: string, weakVerb: string, replacement: string): string {
  // For multi-word phrases
  if (weakVerb.includes(' ')) {
    const regex = new RegExp(weakVerb, 'gi');
    return bullet.replace(regex, replacement);
  }

  // For single leading word — replace only the first occurrence at the start
  const trimmed = bullet.replace(/^[•\-–—*·]\s*/, '');
  const firstWord = trimmed.split(/\s+/)[0] ?? '';

  if (firstWord.toLowerCase().replace(/[^a-z]/g, '') === weakVerb.toLowerCase()) {
    // Capitalise replacement if original was capitalised
    const isCapitalised = firstWord[0] === firstWord[0].toUpperCase();
    const finalReplacement = isCapitalised
      ? replacement.charAt(0).toUpperCase() + replacement.slice(1)
      : replacement;

    // Find the marker prefix (bullet point character if any)
    const markerMatch = bullet.match(/^([•\-–—*·]\s*)/);
    const marker = markerMatch ? markerMatch[1] : '';
    const rest = trimmed.slice(firstWord.length);

    return `${marker}${finalReplacement}${rest}`;
  }

  // Fallback: simple global replace
  const regex = new RegExp(`\\b${weakVerb}\\b`, 'gi');
  return bullet.replace(regex, replacement);
}
