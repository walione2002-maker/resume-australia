import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const routes = [
  'ats-scorer',
  'cover-letter-builder',
  'examples',
  'jobs',
  'blog',
  'interview-prep',
  'about',
  'pricing',
  'network',
  'support',
  'legal',
  'privacy-choices'
];

routes.forEach(route => {
  const dirPath = path.join(__dirname, 'src', 'app', route);
  const filePath = path.join(dirPath, 'page.tsx');
  
  const content = `export default function ${route.replace(/-([a-z])/g, (g) => g[1].toUpperCase()).replace(/^./, str => str.toUpperCase())}Page() {
  return (
    <div className="flex-1 bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4 tracking-tight capitalize">${route.replace(/-/g, ' ')}</h1>
      <p className="text-zinc-600 dark:text-zinc-400 text-lg">Under construction. This feature is scheduled for Phase 2 development.</p>
    </div>
  );
}
`;

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Created ${filePath}`);
  }
});
