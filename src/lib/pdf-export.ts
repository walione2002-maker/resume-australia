// Resume Australia — PDF Export Engine
// Uses html2canvas for pixel-perfect DOM capture + jsPDF for A4 PDF generation.

// Dynamically import libraries to improve initial load time

/** A4 dimensions in mm */
const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;

/** Render scale for crisp output on retina displays */
const RENDER_SCALE = 2;

/** Margin at top/bottom of each page in mm */
const PAGE_MARGIN_Y = 10;

/** Height reserved for the page number footer in mm */
const FOOTER_HEIGHT = 8;

/** Usable content height per page in mm */
const CONTENT_HEIGHT_MM = A4_HEIGHT_MM - PAGE_MARGIN_Y * 2 - FOOTER_HEIGHT;

/**
 * Identifies safe page-break positions by scanning the rendered canvas.
 * It avoids breaking through section headers (elements with data-section-header)
 * by finding the nearest whitespace row below each break point.
 */
function findPageBreaks(
  element: HTMLElement,
  totalHeightPx: number,
  pageHeightPx: number
): number[] {
  const breaks: number[] = [];
  let cursor = pageHeightPx;

  while (cursor < totalHeightPx) {
    // Try to find a section header near this break to avoid cutting through it
    let safeCursor = cursor;
    const headerElements = element.querySelectorAll('[data-section-header]');
    let adjusted = false;

    headerElements.forEach((header) => {
      const rect = header.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      const headerTopPx = (rect.top - elementRect.top) * RENDER_SCALE;
      const headerBottomPx = (rect.bottom - elementRect.top) * RENDER_SCALE;

      // If the break point falls within a header, move it above the header
      if (safeCursor > headerTopPx && safeCursor < headerBottomPx) {
        safeCursor = headerTopPx - 4 * RENDER_SCALE; // 4px gap
        adjusted = true;
      }
      // If the header starts just after the break (within 20px), move break before it
      if (!adjusted && headerTopPx > safeCursor && headerTopPx - safeCursor < 20 * RENDER_SCALE) {
        safeCursor = headerTopPx - 4 * RENDER_SCALE;
      }
    });

    breaks.push(Math.max(0, safeCursor));
    cursor = safeCursor + pageHeightPx;
  }

  return breaks;
}

/**
 * Exports an HTML element as a pixel-perfect A4 PDF.
 *
 * @param element  - The DOM element to capture (e.g. the resume preview panel)
 * @param fileName - Output file name (without extension). Defaults to 'Resume'.
 * @param author   - PDF metadata author name
 * @param title    - PDF metadata title
 */
export async function exportToPDF(
  element: HTMLElement,
  fileName?: string,
  author?: string,
  title?: string
): Promise<void> {
  // Temporarily ensure the element has a white background for capture
  const originalBg = element.style.background;
  element.style.background = '#ffffff';

  // Dynamically import heavy libraries only when PDF export is requested
  const html2canvasModule = await import('html2canvas');
  const html2canvas = html2canvasModule.default;
  const jsPDFModule = await import('jspdf');
  const jsPDF = jsPDFModule.jsPDF;

  const canvas = await html2canvas(element, {
    scale: RENDER_SCALE,
    useCORS: true,
    allowTaint: true,
    logging: false,
    backgroundColor: '#ffffff',
    windowWidth: element.scrollWidth,
    windowHeight: element.scrollHeight,
  });

  // Restore original background
  element.style.background = originalBg;

  const imgData = canvas.toDataURL('image/png', 1.0);
  const canvasWidthPx = canvas.width;
  const canvasHeightPx = canvas.height;

  // Scale factor: how many canvas-pixels per mm
  const pxPerMm = canvasWidthPx / A4_WIDTH_MM;
  const contentHeightPx = CONTENT_HEIGHT_MM * pxPerMm;

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  // Set PDF metadata
  pdf.setProperties({
    title: title || fileName || 'Resume',
    author: author || 'Resume Australia',
    subject: 'Professional Resume',
    creator: 'Resume Australia — resumeaustralia.com.au',
  });

  const totalPages = canvasHeightPx <= contentHeightPx
    ? 1
    : Math.ceil(canvasHeightPx / contentHeightPx);

  if (totalPages === 1) {
    // Single page — straightforward
    const imgHeightMm = (canvasHeightPx / canvasWidthPx) * A4_WIDTH_MM;
    pdf.addImage(imgData, 'PNG', 0, PAGE_MARGIN_Y, A4_WIDTH_MM, imgHeightMm);
  } else {
    // Multi-page with smart break detection
    const pageBreaks = findPageBreaks(element, canvasHeightPx, contentHeightPx);
    const slicePositions = [0, ...pageBreaks, canvasHeightPx];

    for (let i = 0; i < slicePositions.length - 1; i++) {
      if (i > 0) pdf.addPage();

      const sliceTop = slicePositions[i];
      const sliceBottom = slicePositions[i + 1];
      const sliceHeight = sliceBottom - sliceTop;

      // Create a temporary canvas for this page slice
      const pageCanvas = document.createElement('canvas');
      pageCanvas.width = canvasWidthPx;
      pageCanvas.height = sliceHeight;
      const ctx = pageCanvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvasWidthPx, sliceHeight);
        ctx.drawImage(
          canvas,
          0, sliceTop, canvasWidthPx, sliceHeight,
          0, 0, canvasWidthPx, sliceHeight
        );
      }

      const sliceImgData = pageCanvas.toDataURL('image/png', 1.0);
      const sliceHeightMm = (sliceHeight / pxPerMm);

      pdf.addImage(sliceImgData, 'PNG', 0, PAGE_MARGIN_Y, A4_WIDTH_MM, sliceHeightMm);

      // Page number footer
      pdf.setFontSize(8);
      pdf.setTextColor(160, 160, 160);
      pdf.text(
        `Page ${i + 1} of ${slicePositions.length - 1}`,
        A4_WIDTH_MM / 2,
        A4_HEIGHT_MM - PAGE_MARGIN_Y + 2,
        { align: 'center' }
      );
    }
  }

  // Trigger browser download
  const safeName = (fileName || 'Resume').replace(/[^a-zA-Z0-9_\-\s]/g, '').trim();
  pdf.save(`${safeName}.pdf`);
}
