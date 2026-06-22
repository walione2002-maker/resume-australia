'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthContext';
import { fetchUserResumes, deleteResumeFromCloud, SavedResume } from '@/lib/db';
import { useResumeStore } from '@/stores/resume-store';
import { useTemplateStore } from '@/stores/template-store';
import { FileText, Plus, Trash2, Clock, ChevronRight } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [resumes, setResumes] = useState<SavedResume[]>([]);
  const [loading, setLoading] = useState(true);

  const { loadFromCloud, setResumeId, resetResume } = useResumeStore();
  const { setTemplate, setCustomColor } = useTemplateStore();

  useEffect(() => {
    if (user === null) {
      router.push('/');
      return;
    }

    if (user) {
      loadResumes();
    }
  }, [user, router]);

  const loadResumes = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const fetched = await fetchUserResumes(user.uid);
      setResumes(fetched);
    } catch (error) {
      console.error("Failed to fetch resumes", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenResume = (savedResume: SavedResume) => {
    // 1. Load Resume Data
    loadFromCloud(savedResume.resumeData);
    
    // 2. Set the Resume ID to track saving
    setResumeId(savedResume.id);
    
    // 3. Load Template Config
    if (savedResume.templateConfig) {
      setTemplate(savedResume.templateConfig.templateId as any);
      setCustomColor(savedResume.templateConfig.customColor);
    }

    // 4. Navigate to editor
    router.push('/resume-builder');
  };

  const handleDelete = async (e: React.MouseEvent, resumeId: string) => {
    e.stopPropagation();
    if (!user) return;
    
    if (confirm("Are you sure you want to delete this resume?")) {
      await deleteResumeFromCloud(user.uid, resumeId);
      setResumes(resumes.filter(r => r.id !== resumeId));
    }
  };

  const handleCreateNew = () => {
    resetResume();
    setResumeId(null);
    router.push('/resume-builder');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Your Resumes</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Manage and edit your saved resumes.</p>
          </div>
          <button
            onClick={handleCreateNew}
            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all active:scale-95"
          >
            <Plus size={18} />
            New Resume
          </button>
        </div>

        {/* Resumes Grid */}
        {resumes.length === 0 ? (
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-12 text-center border border-gray-200 dark:border-zinc-800 shadow-sm">
            <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 text-blue-500 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText size={32} />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No resumes yet</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm mx-auto">
              Create your first resume to land your dream job. It only takes a few minutes with our AI assistant.
            </p>
            <button
              onClick={handleCreateNew}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Get Started
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => (
              <div
                key={resume.id}
                onClick={() => handleOpenResume(resume)}
                className="group relative bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-gray-200 dark:border-zinc-800 hover:border-blue-500 dark:hover:border-blue-500 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col h-[220px]"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <FileText size={24} />
                  </div>
                  <button
                    onClick={(e) => handleDelete(e, resume.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                    title="Delete resume"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 line-clamp-1">
                  {resume.title || 'Untitled Resume'}
                </h3>
                
                <div className="mt-auto flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-500 dark:text-gray-400 gap-1.5">
                    <Clock size={14} />
                    {resume.lastUpdated ? (
                      <span>Updated {formatDistanceToNow(resume.lastUpdated.toDate(), { addSuffix: true })}</span>
                    ) : (
                      <span>Just now</span>
                    )}
                  </div>
                  
                  <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-zinc-800 flex items-center justify-center text-gray-400 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    <ChevronRight size={16} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
