'use client';

import { useState, useEffect } from 'react';

import { FormPanel } from '@/components/editor/FormPanel';
import { PreviewPanel } from '@/components/editor/PreviewPanel';
import { ATSPanel } from '@/components/ats/ATSPanel';
import { BulletGenerator } from '@/components/ai/BulletGenerator';
import { PhraseSearch } from '@/components/ai/PhraseSearch';
import { ExportModal } from '@/components/export/ExportModal';
import { ResumeWizard } from '@/components/editor/wizard/ResumeWizard';
import { useTemplateStore } from '@/stores/template-store';
import { useResumeStore } from '@/stores/resume-store';
import { Download, LayoutTemplate, Palette, Sparkles, Target, Type, X, Wand2, Cloud, LogOut } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '@/components/auth/AuthContext';
import { saveResumeToCloud, fetchUserResumes } from '@/lib/db';

type ActiveTab = 'form' | 'ats' | 'ai' | 'phrases';

export default function EditorPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('form');
  const [mobileView, setMobileView] = useState<'edit' | 'preview'>('edit');
  const [showExport, setShowExport] = useState(false);
  const [showTemplateSettings, setShowTemplateSettings] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showWizard, setShowWizard] = useState(true);

  const { activeTemplateId, customPrimaryColor, templates, setTemplate, setCustomColor, getEffectiveConfig } = useTemplateStore();
  const resumeState = useResumeStore();
  const { loadFromCloud } = resumeState;
  const config = getEffectiveConfig();
  const { user, logout, openLoginModal } = useAuth();

  useEffect(() => {
    const loadData = async () => {
      if (user) {
        try {
          const resumes = await fetchUserResumes(user.uid);
          if (resumes && resumes.length > 0) {
            // Load the most recently updated resume
            loadFromCloud(resumes[0].resumeData);
            resumeState.setResumeId(resumes[0].id);
            if (resumes[0].templateConfig) {
              setTemplate(resumes[0].templateConfig.templateId as any);
              setCustomColor(resumes[0].templateConfig.customColor);
            }
          }
        } catch (error) {
          console.error("Failed to load resume from cloud:", error);
        }
      }
    };
    loadData();
  }, [user, loadFromCloud]);

  const handleSaveToCloud = async () => {
    if (!user) {
      openLoginModal();
      return;
    }
    setIsSaving(true);
    try {
      const resumeId = resumeState.resumeId || `res_${Date.now()}`;
      const title = resumeState.personalInfo.firstName ? `${resumeState.personalInfo.firstName}'s Resume` : 'Untitled Resume';
      
      await saveResumeToCloud(
        user.uid,
        resumeId,
        title,
        {
          personalInfo: resumeState.personalInfo,
          experience: resumeState.experience,
          education: resumeState.education,
          skills: resumeState.skills,
          languages: resumeState.languages,
          projects: resumeState.projects,
          certifications: resumeState.certifications,
          customSections: resumeState.customSections,
          sections: resumeState.sections,
        },
        {
          templateId: activeTemplateId,
          customColor: customPrimaryColor || config.primaryColor,
        }
      );
      resumeState.setResumeId(resumeId);
      // Optionally show a success toast here
    } catch (error) {
      console.error("Failed to save to cloud", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col h-[100dvh] bg-white dark:bg-zinc-900 overflow-hidden font-sans">
      {/* Top Bar */}
      <div className="h-16 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6 shrink-0 z-20">
        <div className="flex items-center gap-4">
          <div className="lg:hidden flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setMobileView('edit')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${mobileView === 'edit' ? 'bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100 shadow-sm' : 'text-gray-500'}`}
            >
              Edit
            </button>
            <button
              onClick={() => setMobileView('preview')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${mobileView === 'preview' ? 'bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100 shadow-sm' : 'text-gray-500'}`}
            >
              Preview
            </button>
          </div>
          <button 
            onClick={() => setShowTemplateSettings(!showTemplateSettings)}
            className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-gray-900 dark:text-gray-100 text-sm font-medium rounded-lg transition-colors border border-gray-200 dark:border-zinc-700"
          >
            <LayoutTemplate size={16} />
            <span className="hidden sm:inline">Theme: {config.name}</span>
          </button>
        </div>

        <div className="flex-1 flex justify-center hidden md:flex">
          <h1 className="text-gray-900 dark:text-gray-100 font-semibold text-lg truncate px-2">Untitled Resume</h1>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 ml-auto md:ml-0">
          {user ? (
            <button
              onClick={logout}
              className="flex items-center gap-2 px-2 sm:px-3 py-2 hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-600 dark:text-gray-400 text-xs font-semibold rounded-lg transition-colors"
              title="Sign Out"
            >
              <img src={user.photoURL || ''} alt="Avatar" className="w-5 h-5 rounded-full" />
              <span className="hidden sm:inline">Log out</span>
            </button>
          ) : (
            <button
              onClick={openLoginModal}
              className="flex items-center gap-2 px-2 sm:px-3 py-2 hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-600 dark:text-gray-400 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap"
            >
              <span className="hidden sm:inline">Sign In</span>
              <span className="sm:hidden">Login</span>
            </button>
          )}

          <button
            onClick={() => setShowWizard(true)}
            className="hidden lg:flex items-center gap-2 px-4 py-2 bg-purple-100 hover:bg-purple-200 dark:bg-purple-900/30 dark:hover:bg-purple-900/50 text-purple-700 dark:text-purple-300 text-sm font-semibold rounded-lg transition-colors"
          >
            <Wand2 size={16} />
            <span>Edit Data</span>
          </button>
          
          <button
            onClick={handleSaveToCloud}
            disabled={isSaving}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-gray-800 dark:text-gray-200 text-sm font-semibold rounded-lg transition-colors disabled:opacity-50"
          >
            <Cloud size={16} />
            <span className="hidden sm:inline">{isSaving ? 'Saving...' : 'Save to Cloud'}</span>
          </button>

          <button
            onClick={() => setShowExport(true)}
            className="flex items-center gap-2 px-3 sm:px-6 py-2 bg-[#1a9ceb] hover:bg-[#1588cf] text-white text-sm font-bold rounded-lg transition-colors"
          >
            <Download size={16} />
            <span className="hidden sm:inline">Download</span>
          </button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Left Side: Editor/Tools */}
        <div className={`w-full lg:w-1/2 flex flex-col h-full bg-[#f9fafd] dark:bg-zinc-950 border-r border-gray-200 dark:border-gray-800 z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full lg:translate-x-0 hidden lg:flex' : 'flex'}`}>
          
          {/* Tabs */}
          <div className="flex bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-gray-800 px-6 pt-2 shrink-0 overflow-x-auto scrollbar-hide">
            <TabButton active={activeTab === 'form'} onClick={() => setActiveTab('form')} icon={<Type size={16}/>} label="Content" />
            <TabButton active={activeTab === 'ats'} onClick={() => setActiveTab('ats')} icon={<Target size={16}/>} label="ATS Score" />
            <TabButton active={activeTab === 'ai'} onClick={() => setActiveTab('ai')} icon={<Sparkles size={16}/>} label="AI Writer" />
            <TabButton active={activeTab === 'phrases'} onClick={() => setActiveTab('phrases')} icon={<Palette size={16}/>} label="Phrases" />
          </div>

          {/* Active Tool Content */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            {activeTab === 'form' && (
              <FormPanel onOpenWizard={() => setShowWizard(true)} />
            )}
            {activeTab === 'ats' && <ATSPanel />}
            {activeTab === 'ai' && <div className="p-6 max-w-2xl mx-auto"><BulletGenerator /></div>}
            {activeTab === 'phrases' && <div className="p-6 max-w-2xl mx-auto"><PhraseSearch /></div>}
          </div>
        </div>

        {/* Right Side: Live Preview */}
        <div className={`w-full lg:w-1/2 h-full bg-gray-600 relative ${mobileView === 'edit' ? 'hidden lg:block' : 'block'}`}>
          <PreviewPanel />
        </div>

      </div>

      {/* Template Settings Slide-over */}
      <AnimatePresence>
        {showTemplateSettings && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute top-16 left-0 bottom-0 w-80 bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-gray-800 z-30 shadow-2xl p-6 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2"><LayoutTemplate size={18}/> Templates</h3>
              <button onClick={() => setShowTemplateSettings(false)} className="p-1 text-gray-500 hover:text-gray-900 dark:text-gray-100 rounded-md hover:bg-gray-100"><X size={18}/></button>
            </div>
            
            <div className="space-y-6 mb-8">
              {['Technology', 'Finance', 'Healthcare', 'Creative', 'Academic'].map(industry => {
                const industryTemplates = templates.filter(t => t.industry === industry);
                if (industryTemplates.length === 0) return null;
                
                return (
                  <div key={industry}>
                    <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3 border-b border-gray-200 dark:border-gray-800 pb-1">
                      {industry}
                    </h4>
                    <div className="space-y-3">
                      {industryTemplates.map(t => (
                        <button
                          key={t.id}
                          onClick={() => setTemplate(t.id as any)}
                          className={`w-full text-left p-3 rounded-xl border transition-all ${activeTemplateId === t.id ? 'border-[#1a9ceb] bg-[#1a9ceb]/10' : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-zinc-900 hover:border-gray-400'}`}
                        >
                          <h4 className="text-gray-900 dark:text-gray-100 font-bold text-sm mb-0.5">{t.name}</h4>
                          <p className="text-[10px] text-gray-500 leading-relaxed line-clamp-2">{t.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
              <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-4 uppercase tracking-wider flex items-center gap-2"><Palette size={14}/> Custom Colors</h3>
              <div className="flex flex-wrap gap-3">
                {['#1e3a5f', '#6c3fc5', '#2d3436', '#0f172a', '#1a1a2e', '#2563eb', '#16a34a', '#dc2626', '#d97706', '#9333ea'].map(color => (
                  <button
                    key={color}
                    onClick={() => setCustomColor(color)}
                    className="w-8 h-8 rounded-full border-2 border-gray-200 dark:border-gray-800 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Export Modal */}
      <AnimatePresence>
        {showExport && <ExportModal onClose={() => setShowExport(false)} />}
      </AnimatePresence>
      
      {/* Onboarding Wizard */}
      <ResumeWizard isOpen={showWizard} onClose={() => setShowWizard(false)} />
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-3 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
        active 
          ? 'border-[#1a9ceb] text-[#1a9ceb]' 
          : 'border-transparent text-gray-500 hover:text-gray-800'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

