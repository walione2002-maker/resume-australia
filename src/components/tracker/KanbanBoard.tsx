'use client';

import { useState, useCallback, useMemo } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
  type DragOverEvent,
} from '@dnd-kit/core';
import { useDroppable } from '@dnd-kit/core';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useJobStore } from '@/stores/job-store';
import type { JobEntry, JobStatus } from '@/types';
import { JobCard } from './JobCard';
import { AddJobModal } from './AddJobModal';

const COLUMNS: { id: JobStatus; label: string; color: string; dotColor: string }[] = [
  { id: 'saved', label: 'Saved', color: 'border-zinc-600', dotColor: 'bg-zinc-400' },
  { id: 'applied', label: 'Applied', color: 'border-blue-600', dotColor: 'bg-blue-400' },
  { id: 'interviewing', label: 'Interviewing', color: 'border-amber-600', dotColor: 'bg-amber-400' },
  { id: 'offered', label: 'Offered', color: 'border-emerald-600', dotColor: 'bg-emerald-400' },
  { id: 'rejected', label: 'Rejected', color: 'border-red-600', dotColor: 'bg-red-400' },
];

// ── Droppable Column ────────────────────────────────────────────

interface ColumnProps {
  column: (typeof COLUMNS)[number];
  jobs: JobEntry[];
  isOver: boolean;
  onAddClick: (status: JobStatus) => void;
  onEditJob: (job: JobEntry) => void;
  onDeleteJob: (id: string) => void;
}

function Column({ column, jobs, isOver, onAddClick, onEditJob, onDeleteJob }: ColumnProps) {
  const { setNodeRef } = useDroppable({ id: column.id });

  return (
    <div
      ref={setNodeRef}
      className={`flex min-h-[300px] w-72 flex-shrink-0 flex-col rounded-xl border-t-2 ${column.color} transition-colors duration-200 lg:w-full ${
        isOver ? 'bg-zinc-100  ring-2 ring-blue-500/30' : 'bg-zinc-50 dark:bg-zinc-950 '
      }`}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className={`h-2.5 w-2.5 rounded-full ${column.dotColor}`} />
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 ">{column.label}</h3>
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-zinc-100  px-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-400 ">
            {jobs.length}
          </span>
        </div>
        <button
          onClick={() => onAddClick(column.id)}
          className="rounded-md p-1 text-zinc-500 dark:text-zinc-400 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800  hover:text-zinc-600 dark:text-zinc-400 "
          aria-label={`Add job to ${column.label}`}
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {/* Cards */}
      <div className="flex flex-1 flex-col gap-2 px-3 pb-3">
        {jobs.length === 0 && (
          <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-zinc-200 dark:border-zinc-800  py-8">
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              Drop jobs here
            </p>
          </div>
        )}
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            dotColor={column.dotColor}
            onEdit={() => onEditJob(job)}
            onDelete={() => onDeleteJob(job.id)}
          />
        ))}
      </div>
    </div>
  );
}

// ── Kanban Board ────────────────────────────────────────────────

export function KanbanBoard() {
  const jobs = useJobStore((s) => s.jobs);
  const moveJob = useJobStore((s) => s.moveJob);
  const removeJob = useJobStore((s) => s.removeJob);

  const [activeJob, setActiveJob] = useState<JobEntry | null>(null);
  const [overColumnId, setOverColumnId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobEntry | null>(null);
  const [defaultStatus, setDefaultStatus] = useState<JobStatus>('saved');

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 5 } })
  );

  const jobsByStatus = useMemo(() => {
    const grouped: Record<JobStatus, JobEntry[]> = {
      saved: [],
      applied: [],
      interviewing: [],
      offered: [],
      rejected: [],
    };
    jobs.forEach((job) => {
      grouped[job.status].push(job);
    });
    return grouped;
  }, [jobs]);

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      const job = jobs.find((j) => j.id === event.active.id);
      setActiveJob(job || null);
    },
    [jobs]
  );

  const handleDragOver = useCallback((event: DragOverEvent) => {
    const overId = event.over?.id;
    setOverColumnId(overId ? String(overId) : null);
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      setActiveJob(null);
      setOverColumnId(null);

      if (!over) return;

      const draggedJobId = String(active.id);
      const targetStatus = String(over.id) as JobStatus;

      // Only move if dropped on a valid column
      if (COLUMNS.some((col) => col.id === targetStatus)) {
        moveJob(draggedJobId, targetStatus);
      }
    },
    [moveJob]
  );

  const handleAddClick = useCallback((status: JobStatus) => {
    setEditingJob(null);
    setDefaultStatus(status);
    setModalOpen(true);
  }, []);

  const handleEditJob = useCallback((job: JobEntry) => {
    setEditingJob(job);
    setDefaultStatus(job.status);
    setModalOpen(true);
  }, []);

  const handleDeleteJob = useCallback(
    (id: string) => {
      removeJob(id);
    },
    [removeJob]
  );

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        {/* Add Job Button (top) */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 ">Job Tracker</h1>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400 ">
              Track your applications across the hiring pipeline
            </p>
          </div>
          <button
            onClick={() => handleAddClick('saved')}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100  shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-500"
          >
            <Plus className="h-4 w-4" />
            Add Job
          </button>
        </div>

        {/* Columns */}
        <div className="flex gap-4 overflow-x-auto pb-4 lg:grid lg:grid-cols-5 lg:overflow-visible">
          {COLUMNS.map((column) => (
            <Column
              key={column.id}
              column={column}
              jobs={jobsByStatus[column.id]}
              isOver={overColumnId === column.id}
              onAddClick={handleAddClick}
              onEditJob={handleEditJob}
              onDeleteJob={handleDeleteJob}
            />
          ))}
        </div>

        {/* Drag Overlay — renders a ghost card while dragging */}
        <DragOverlay>
          {activeJob && (
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: 1.04, rotate: 2 }}
              className="w-72 lg:w-full"
            >
              <JobCard
                job={activeJob}
                dotColor="bg-blue-400"
                isDragOverlay
                onEdit={() => {}}
                onDelete={() => {}}
              />
            </motion.div>
          )}
        </DragOverlay>
      </DndContext>

      <AddJobModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingJob(null);
        }}
        editingJob={editingJob}
        defaultStatus={defaultStatus}
      />
    </>
  );
}


