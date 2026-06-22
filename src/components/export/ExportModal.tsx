'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  FileDown,
  FileText,
  Share2,
  Loader2,
  Check,
  Copy,
  AlertCircle,
} from 'lucide-react';
import { exportToPDF } from '@/lib/pdf-export';
import { exportToTxt } from '@/lib/txt-export';
import { useResumeStore } from '@/stores/resume-store';

interface ExportModalProps {
  onClose: () => void;
}

type ExportState = 'idle' | 'loading' | 'success' | 'error';

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modal = {
  hidden: { opacity: 0, scale: 0.92, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring' as const, damping: 25, stiffness: 350 },
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    y: 20,
    transition: { duration: 0.15 },
  },
};

export function ExportModal({ onClose }: ExportModalProps) {
  const [pdfState, setPdfState] = useState<ExportState>('idle');
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const personalInfo = useResumeStore((s) => s.personalInfo);
  const getPlainText = useResumeStore((s) => s.getPlainText);

  // Reset states when modal mounts
  useEffect(() => {
      setPdfState('idle');
      setShareUrl(null);
      setCopied(false);
      setErrorMsg('');
  }, []);

  // Escape key handler
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const fileName = personalInfo.firstName && personalInfo.lastName
    ? `${personalInfo.firstName}_${personalInfo.lastName}_Resume`
    : 'Resume';

  const handlePdfExport = useCallback(async () => {
    const node = document.getElementById('resume-preview-page');
    if (!node) {
      setErrorMsg('Preview panel not found. Please ensure the resume preview is visible.');
      setPdfState('error');
      return;
    }

    setPdfState('loading');
    setErrorMsg('');

    try {
      await exportToPDF(
        node,
        fileName,
        `${personalInfo.firstName} ${personalInfo.lastName}`.trim() || undefined,
        `${personalInfo.firstName} ${personalInfo.lastName} — ${personalInfo.jobTitle}`.trim() || undefined
      );
      setPdfState('success');
      timerRef.current = setTimeout(() => setPdfState('idle'), 3000);
    } catch (err) {
      console.error('[ExportModal] PDF export failed:', err);
      setErrorMsg('PDF generation failed. Please try again.');
      setPdfState('error');
      timerRef.current = setTimeout(() => setPdfState('idle'), 4000);
    }
  }, [fileName, personalInfo]);

  const handleTxtExport = useCallback(() => {
    exportToTxt(getPlainText, fileName);
  }, [getPlainText, fileName]);

  const handleShareLink = useCallback(() => {
    try {
      const resumeData = {
        personalInfo: useResumeStore.getState().personalInfo,
        experience: useResumeStore.getState().experience,
        education: useResumeStore.getState().education,
        skills: useResumeStore.getState().skills,
        projects: useResumeStore.getState().projects,
        certifications: useResumeStore.getState().certifications,
        languages: useResumeStore.getState().languages,
        sections: useResumeStore.getState().sections,
      };

      const jsonString = JSON.stringify(resumeData);
      const encoded = btoa(unescape(encodeURIComponent(jsonString)));

      // Truncate if too long for URL (limit ~8000 chars for safety)
      if (encoded.length > 8000) {
        setErrorMsg('Resume data is too large for a share link. Try removing some sections.');
        return;
      }

      const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
      const url = `${baseUrl}/preview?data=${encoded}`;
      setShareUrl(url);
    } catch (err) {
      console.error('[ExportModal] Share link generation failed:', err);
      setErrorMsg('Failed to generate share link.');
    }
  }, []);

  const handleCopyLink = useCallback(async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      timerRef.current = setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback for browsers that block clipboard API
      const textarea = document.createElement('textarea');
      textarea.value = shareUrl;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      timerRef.current = setTimeout(() => setCopied(false), 2500);
    }
  }, [shareUrl]);

  const exportOptions = [
    {
      id: 'pdf' as const,
      icon: FileDown,
      title: 'PDF Download',
      description: 'Pixel-perfect PDF matching your preview',
      onClick: handlePdfExport,
    },
    {
      id: 'txt' as const,
      icon: FileText,
      title: 'Plain Text',
      description: 'Raw text for ATS copy-paste uploads',
      onClick: handleTxtExport,
    },
    {
      id: 'share' as const,
      icon: Share2,
      title: 'Share Link',
      description: 'Generate a shareable web preview link',
      onClick: handleShareLink,
    },
  ];

  return (
    <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative z-10 w-full max-w-lg rounded-2xl border border-zinc-200 dark:border-zinc-800  bg-white dark:bg-zinc-900  p-6 shadow-2xl backdrop-blur-xl"
            variants={modal}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 ">Export Resume</h2>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400 ">
                  Choose your preferred format
                </p>
              </div>
              <button
                onClick={onClose}
                className="rounded-lg p-2 text-zinc-500 dark:text-zinc-400  transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800  hover:text-zinc-900 dark:text-zinc-100 "
                aria-label="Close export modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Export Options */}
            <div className="space-y-3">
              {exportOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={option.onClick}
                  disabled={option.id === 'pdf' && pdfState === 'loading'}
                  className="group flex w-full items-center gap-4 rounded-xl border border-zinc-200 dark:border-zinc-800  bg-zinc-50 dark:bg-zinc-950  p-4 text-left transition-all duration-200 hover:border-blue-500/50 hover:bg-zinc-100 dark:hover:bg-zinc-800  disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800/50 transition-colors group-hover:bg-blue-500/20 dark:group-hover:bg-blue-500/30">
                    {option.id === 'pdf' && pdfState === 'loading' ? (
                      <Loader2 className="h-5 w-5 animate-spin text-blue-400" />
                    ) : option.id === 'pdf' && pdfState === 'success' ? (
                      <Check className="h-5 w-5 text-emerald-400" />
                    ) : (
                      <option.icon className="h-5 w-5 text-zinc-500 dark:text-zinc-400  transition-colors group-hover:text-blue-400" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-zinc-900 dark:text-zinc-100 ">
                      {option.id === 'pdf' && pdfState === 'loading'
                        ? 'Generating PDF…'
                        : option.id === 'pdf' && pdfState === 'success'
                          ? 'Downloaded!'
                          : option.title}
                    </p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 ">{option.description}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {errorMsg && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300"
                >
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  {errorMsg}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Share URL Display */}
            <AnimatePresence>
              {shareUrl && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4"
                >
                  <label className="mb-1.5 block text-xs font-medium text-zinc-500 dark:text-zinc-400 ">
                    Shareable Link
                  </label>
                  <div className="flex items-center gap-2 rounded-lg border border-zinc-300  bg-zinc-50 dark:bg-zinc-950  p-2">
                    <input
                      type="text"
                      value={shareUrl}
                      readOnly
                      className="min-w-0 flex-1 truncate bg-transparent text-sm text-zinc-600 dark:text-zinc-400  outline-none"
                    />
                    <button
                      onClick={handleCopyLink}
                      className="flex flex-shrink-0 items-center gap-1.5 rounded-md bg-zinc-100  px-3 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400  transition-colors hover:bg-zinc-700 hover:text-zinc-900 dark:text-zinc-100 "
                    >
                      {copied ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-400" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
    </motion.div>
  );
}


