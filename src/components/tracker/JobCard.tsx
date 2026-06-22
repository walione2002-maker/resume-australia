'use client';

import { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GripVertical,
  ChevronDown,
  ChevronUp,
  Pencil,
  Trash2,
  MapPin,
  Calendar,
  ExternalLink,
  DollarSign,
  StickyNote,
} from 'lucide-react';
import type { JobEntry } from '@/types';

interface JobCardProps {
  job: JobEntry;
  dotColor: string;
  isDragOverlay?: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

export function JobCard({
  job,
  dotColor,
  isDragOverlay = false,
  onEdit,
  onDelete,
}: JobCardProps) {
  const [expanded, setExpanded] = useState(false);

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: job.id,
    disabled: isDragOverlay,
  });

  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.4 : 1,
      }
    : undefined;

  const formattedDate = (() => {
    try {
      return new Date(job.dateAdded).toLocaleDateString('en-AU', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return job.dateAdded;
    }
  })();

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group rounded-lg border border-zinc-200 dark:border-zinc-800  bg-zinc-50 dark:bg-zinc-950  transition-all duration-150 ${
        isDragOverlay
          ? 'shadow-2xl shadow-blue-500/20 ring-2 ring-blue-500/40'
          : 'hover:border-zinc-300  hover:shadow-lg hover:shadow-black/20'
      } ${isDragging ? 'z-50' : ''}`}
    >
      {/* Main Card Content */}
      <div className="p-3">
        <div className="flex items-start gap-2">
          {/* Drag Handle */}
          {!isDragOverlay && (
            <button
              {...attributes}
              {...listeners}
              className="mt-0.5 flex-shrink-0 cursor-grab rounded p-0.5 text-zinc-600 dark:text-zinc-400 transition-colors hover:text-zinc-500 dark:text-zinc-400  active:cursor-grabbing"
              aria-label="Drag to reorder"
            >
              <GripVertical className="h-4 w-4" />
            </button>
          )}

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <div className={`h-2 w-2 flex-shrink-0 rounded-full ${dotColor}`} />
              <h4 className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-100 ">
                {job.company || 'Untitled Company'}
              </h4>
            </div>
            <p className="mt-0.5 truncate text-xs text-zinc-500 dark:text-zinc-400 ">
              {job.position || 'No position specified'}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
              {job.location && (
                <span className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
                  <MapPin className="h-3 w-3" />
                  {job.location}
                </span>
              )}
              <span className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
                <Calendar className="h-3 w-3" />
                {formattedDate}
              </span>
            </div>
          </div>

          {/* Expand Toggle */}
          {!isDragOverlay && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex-shrink-0 rounded p-1 text-zinc-600 dark:text-zinc-400 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800  hover:text-zinc-500 dark:text-zinc-400 "
              aria-label={expanded ? 'Collapse' : 'Expand'}
            >
              {expanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Expanded Details */}
      <AnimatePresence>
        {expanded && !isDragOverlay && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="border-t border-zinc-200 dark:border-zinc-800  px-3 pb-3 pt-2.5">
              {/* Extra details */}
              <div className="space-y-2">
                {job.salary && (
                  <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 ">
                    <DollarSign className="h-3.5 w-3.5 flex-shrink-0 text-zinc-500 dark:text-zinc-400" />
                    <span>{job.salary}</span>
                  </div>
                )}
                {job.url && (
                  <div className="flex items-center gap-2 text-xs">
                    <ExternalLink className="h-3.5 w-3.5 flex-shrink-0 text-zinc-500 dark:text-zinc-400" />
                    <a
                      href={job.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="truncate text-blue-400 transition-colors hover:text-blue-300"
                    >
                      {job.url}
                    </a>
                  </div>
                )}
                {job.notes && (
                  <div className="flex items-start gap-2 text-xs text-zinc-500 dark:text-zinc-400 ">
                    <StickyNote className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-zinc-500 dark:text-zinc-400" />
                    <p className="whitespace-pre-wrap leading-relaxed">{job.notes}</p>
                  </div>
                )}
                {job.dateApplied && (
                  <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 ">
                    <Calendar className="h-3.5 w-3.5 flex-shrink-0 text-zinc-500 dark:text-zinc-400" />
                    <span>
                      Applied:{' '}
                      {new Date(job.dateApplied).toLocaleDateString('en-AU', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="mt-3 flex items-center gap-2">
                <button
                  onClick={onEdit}
                  className="inline-flex items-center gap-1.5 rounded-md bg-zinc-100 dark:bg-zinc-800/50 px-2.5 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400  transition-colors hover:bg-zinc-700 hover:text-zinc-900 dark:text-zinc-100 "
                >
                  <Pencil className="h-3 w-3" />
                  Edit
                </button>
                <button
                  onClick={onDelete}
                  className="inline-flex items-center gap-1.5 rounded-md bg-zinc-100  px-2.5 py-1.5 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/10 hover:text-red-300"
                >
                  <Trash2 className="h-3 w-3" />
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


