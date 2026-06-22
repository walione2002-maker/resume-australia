import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        results.push(file);
      }
    }
  });
  return results;
}

const srcDir = path.join(__dirname, 'src');
const files = walk(srcDir);

// Mapping of light classes to add a dark variant next to them
// Note: we use regex replacement, e.g. \bbg-white\b -> bg-white dark:bg-zinc-900
const classMap = {
  'bg-white': 'dark:bg-zinc-900',
  'bg-zinc-50': 'dark:bg-zinc-950',
  'bg-\\\\[#f9fafd\\\\]': 'dark:bg-zinc-950',
  'text-zinc-900': 'dark:text-zinc-100',
  'text-gray-900': 'dark:text-gray-100',
  'text-zinc-800': 'dark:text-zinc-200',
  'text-zinc-700': 'dark:text-zinc-300',
  'text-zinc-600': 'dark:text-zinc-400',
  'text-zinc-500': 'dark:text-zinc-400',
  'border-zinc-200': 'dark:border-zinc-800',
  'border-gray-200': 'dark:border-gray-800',
  'hover:bg-zinc-50': 'dark:hover:bg-zinc-800',
  'hover:bg-zinc-100': 'dark:hover:bg-zinc-800'
};

let count = 0;
files.forEach(file => {
  let originalContent = fs.readFileSync(file, 'utf8');
  let content = originalContent;

  for (const [lightClass, darkClass] of Object.entries(classMap)) {
    // Only match inside quotes or backticks to avoid messing with non-class text
    // A simple regex approach: replace \b(lightClass)\b with lightClass darkClass
    // Since we only stripped dark:, they are missing. We add them back.
    // Ensure we don't double add if it exists
    const regex = new RegExp(`(?<!dark:)\\b(${lightClass})\\b(?!\\s*dark:)`, 'g');
    content = content.replace(regex, `$1 ${darkClass}`);
  }

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Added dark variants to:', file);
    count++;
  }
});

console.log(`Finished adding dark mode to ${count} files.`);
