'use client';

import { Navbar } from '@/components/shared/Navbar';
import { KanbanBoard } from '@/components/tracker/KanbanBoard';
import { BriefcaseBusiness, Plus } from 'lucide-react';
import { useState } from 'react';
import { AddJobModal } from '@/components/tracker/AddJobModal';

export default function TrackerPage() {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-zinc-900  overflow-hidden font-sans">
      <Navbar />
      
      <main className="flex-1 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="shrink-0 px-6 py-8 md:px-12 bg-white dark:bg-zinc-900  border-b border-zinc-900">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100  flex items-center gap-3">
                <BriefcaseBusiness className="text-blue-500" size={28} />
                Job Application Tracker
              </h1>
              <p className="text-zinc-500 dark:text-zinc-400  mt-2 text-sm max-w-2xl">
                Keep track of where you've applied. Drag and drop jobs across columns to update their status.
              </p>
            </div>
            
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-zinc-900 dark:text-zinc-100  font-medium rounded-xl transition-colors shadow-[0_0_15px_rgba(37,99,235,0.3)] shrink-0"
            >
              <Plus size={18} />
              Add New Job
            </button>
          </div>
        </div>

        {/* Board */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden p-6 md:p-8 bg-white dark:bg-zinc-900 ">
          <div className="max-w-[1600px] h-full mx-auto">
            <KanbanBoard />
          </div>
        </div>
      </main>

      {showAddModal && (
        <AddJobModal onClose={() => setShowAddModal(false)} />
      )}
    </div>
  );
}

