// Resume Australia — Plain Text Export
// Creates a downloadable .txt file from the resume store's plain text output.

/**
 * Exports resume data as a plain text file and triggers a browser download.
 *
 * @param getPlainText - A function that returns the plain-text representation of the resume
 * @param fileName     - Output file name (without extension). Defaults to 'Resume'.
 */
export function exportToTxt(
  getPlainText: () => string,
  fileName?: string
): void {
  const text = getPlainText();

  if (!text.trim()) {
    console.warn('[txt-export] No resume content to export.');
    return;
  }

  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const safeName = (fileName || 'Resume').replace(/[^a-zA-Z0-9_\-\s]/g, '').trim();

  const link = document.createElement('a');
  link.href = url;
  link.download = `${safeName}.txt`;
  link.style.display = 'none';

  document.body.appendChild(link);
  link.click();

  // Cleanup
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 100);
}
