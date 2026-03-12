export const imageSizes = {
  hero: '100vw',
  card: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  thumbnail: '150px',
  full: '100vw',
  project: '(max-width: 40em) 100vw, (max-width: 64em) 80vw, 800px'
} as const;

export function slugify(input: string) {
  return String(input)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-_]/g, '-')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function deriveSlugFromSrc(src: string) {
  if (!src) return '';
  const url = src.startsWith('http')
    ? new URL(src)
    : new URL(src, 'http://example.com');
  const pathname = url.pathname;
  const name = pathname.split('/').pop() || pathname;
  return slugify(name.replace(/\.[^/.]+$/, ''));
}
