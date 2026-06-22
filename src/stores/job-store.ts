import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { JobEntry, JobStatus } from '@/types';

const generateId = () => Math.random().toString(36).substring(2, 11);

interface JobStore {
  jobs: JobEntry[];
  addJob: (job: Omit<JobEntry, 'id' | 'dateAdded'>) => void;
  updateJob: (id: string, data: Partial<JobEntry>) => void;
  removeJob: (id: string) => void;
  moveJob: (id: string, status: JobStatus) => void;
  getJobsByStatus: (status: JobStatus) => JobEntry[];
}

export const useJobStore = create<JobStore>()(
  persist(
    (set, get) => ({
      jobs: [],

      addJob: (job) =>
        set((state) => ({
          jobs: [
            ...state.jobs,
            {
              ...job,
              id: generateId(),
              dateAdded: new Date().toISOString(),
            },
          ],
        })),

      updateJob: (id, data) =>
        set((state) => ({
          jobs: state.jobs.map((j) => (j.id === id ? { ...j, ...data } : j)),
        })),

      removeJob: (id) =>
        set((state) => ({
          jobs: state.jobs.filter((j) => j.id !== id),
        })),

      moveJob: (id, status) =>
        set((state) => ({
          jobs: state.jobs.map((j) =>
            j.id === id
              ? { ...j, status, ...(status === 'applied' && !j.dateApplied ? { dateApplied: new Date().toISOString() } : {}) }
              : j
          ),
        })),

      getJobsByStatus: (status) => get().jobs.filter((j) => j.status === status),
    }),
    { name: 'resume-australia-jobs', version: 1 }
  )
);
