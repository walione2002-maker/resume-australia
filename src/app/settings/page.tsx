'use client';

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { Monitor, Sun, Moon, Settings, ChevronDown, Shield, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const themeOptions = [
  { value: 'system', label: 'Default (Windows)', description: 'Follows your operating system theme', icon: Monitor },
  { value: 'light', label: 'Light', description: 'Always use light mode', icon: Sun },
  { value: 'dark', label: 'Dark', description: 'Always use dark mode', icon: Moon },
];

interface PrivacyPreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  personalization: boolean;
}

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);
  const [isAppearanceOpen, setIsAppearanceOpen] = useState(true);
  
  // Privacy State
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [preferences, setPreferences] = useState<PrivacyPreferences>({
    essential: true,
    analytics: false,
    marketing: false,
    personalization: false,
  });
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success">("idle");

  useEffect(() => {
    setMounted(true);
    const storedPrefs = localStorage.getItem("privacy_preferences");
    if (storedPrefs) {
      try {
        const parsed = JSON.parse(storedPrefs);
        setPreferences({
          ...parsed,
          essential: true,
        });
      } catch (e) {
        console.error("Failed to parse privacy preferences", e);
      }
    }
  }, []);

  const handleTogglePrivacy = (key: keyof PrivacyPreferences) => {
    if (key === "essential") return;
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSavePrivacy = () => {
    setSaveStatus("saving");
    setTimeout(() => {
      localStorage.setItem("privacy_preferences", JSON.stringify(preferences));
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 3000);
    }, 600);
  };

  const currentTheme = themeOptions.find(t => t.value === theme) || themeOptions[0];

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <div className="max-w-2xl mx-auto px-6 py-20 space-y-8">
        {/* Page Header */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-zinc-100 dark:bg-zinc-900 rounded-xl flex items-center justify-center">
              <Settings className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
            </div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">Settings</h1>
          </div>
          <p className="text-zinc-500 dark:text-zinc-400 ml-[52px]">Manage your preferences and tracking choices.</p>
        </div>

        {/* Theme Section */}
        <div className={`border border-zinc-200 dark:border-zinc-800 rounded-2xl ${isThemeDropdownOpen ? '' : 'overflow-hidden'}`}>
          <button
            onClick={() => setIsAppearanceOpen(!isAppearanceOpen)}
            className="w-full flex items-center justify-between px-6 py-5 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors"
          >
            <div className="flex items-center gap-3">
              <h2 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">Appearance</h2>
            </div>
            <ChevronDown className={`w-5 h-5 text-zinc-400 transition-transform duration-300 ${isAppearanceOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isAppearanceOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className={`border-t border-zinc-200 dark:border-zinc-800 ${isThemeDropdownOpen ? 'overflow-visible' : 'overflow-hidden'}`}
              >
                <div className="p-6 bg-white dark:bg-zinc-950">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-base font-semibold text-zinc-900 dark:text-white">Theme</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">Choose how Resume Australia looks for you.</p>
              </div>

              {mounted && (
                <div className="relative">
                  <button
                    onClick={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)}
                    className="flex items-center justify-between gap-3 px-4 py-2.5 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-xl transition-colors min-w-[200px]"
                  >
                    <div className="flex items-center gap-2">
                      <currentTheme.icon className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                      <span className="text-sm font-medium text-zinc-900 dark:text-white">{currentTheme.label}</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${isThemeDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isThemeDropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setIsThemeDropdownOpen(false)} />
                      <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl z-20 overflow-hidden">
                        {themeOptions.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => {
                              setTheme(option.value);
                              setIsThemeDropdownOpen(false);
                            }}
                            className={`w-full flex items-start gap-3 px-4 py-3.5 transition-colors text-left ${
                              theme === option.value ? 'bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-zinc-50 dark:hover:bg-zinc-800'
                            }`}
                          >
                            <option.icon className={`w-5 h-5 mt-0.5 ${theme === option.value ? 'text-blue-600 dark:text-blue-400' : 'text-zinc-400'}`} />
                            <div>
                              <div className={`text-sm font-semibold ${theme === option.value ? 'text-blue-600 dark:text-blue-400' : 'text-zinc-900 dark:text-white'}`}>
                                {option.label}
                              </div>
                              <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{option.description}</div>
                            </div>
                            {theme === option.value && (
                              <div className="ml-auto mt-0.5">
                                <div className="w-2 h-2 bg-blue-600 rounded-full" />
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
              </div>
            </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Privacy Section */}
        <div className="border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden">
          <button
            onClick={() => setIsPrivacyOpen(!isPrivacyOpen)}
            className="w-full flex items-center justify-between px-6 py-5 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
              <h2 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">Privacy & Tracking Choices</h2>
            </div>
            <ChevronDown className={`w-5 h-5 text-zinc-400 transition-transform duration-300 ${isPrivacyOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isPrivacyOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 relative"
              >
                {/* Toast Notification for Privacy Settings */}
                <AnimatePresence>
                  {saveStatus === "success" && (
                    <motion.div
                      initial={{ y: -50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -50, opacity: 0 }}
                      className="absolute top-0 left-0 w-full bg-emerald-500 text-white p-3 text-center font-medium flex items-center justify-center gap-2 z-10"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      Preferences saved successfully
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="p-6 space-y-8">
                  <div className="space-y-6">
                    {/* Essential */}
                    <PrivacyToggle
                      title="Essential Cookies"
                      description="Necessary for the website to function. Cannot be switched off."
                      checked={preferences.essential}
                      disabled={true}
                      onChange={() => {}}
                    />
                    {/* Analytics */}
                    <PrivacyToggle
                      title="Analytics & Performance"
                      description="Allows us to count visits and traffic sources to measure and improve performance."
                      checked={preferences.analytics}
                      onChange={() => handleTogglePrivacy("analytics")}
                    />
                    {/* Marketing */}
                    <PrivacyToggle
                      title="Marketing & Targeting"
                      description="Used by our advertising partners to show you relevant adverts on other sites."
                      checked={preferences.marketing}
                      onChange={() => handleTogglePrivacy("marketing")}
                    />
                    {/* Personalization */}
                    <PrivacyToggle
                      title="Functional & Personalization"
                      description="Enables enhanced functionality and personalization across the site."
                      checked={preferences.personalization}
                      onChange={() => handleTogglePrivacy("personalization")}
                    />
                  </div>

                  <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 flex justify-end">
                    <button
                      onClick={handleSavePrivacy}
                      disabled={saveStatus === "saving"}
                      className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:ring-4 focus:ring-blue-500/20 disabled:opacity-70 flex items-center gap-2"
                    >
                      {saveStatus === "saving" ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Saving...
                        </>
                      ) : (
                        "Save Preferences"
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function PrivacyToggle({ title, description, checked, disabled = false, onChange }: { title: string, description: string, checked: boolean, disabled?: boolean, onChange: () => void }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h3 className="text-base font-semibold text-zinc-900 dark:text-white">{title}</h3>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{description}</p>
      </div>
      <div className="flex-shrink-0 pt-1">
        <button
          type="button"
          disabled={disabled}
          onClick={onChange}
          className={`relative inline-flex h-6 w-11 flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 ${
            disabled ? 'cursor-not-allowed opacity-50 bg-blue-600' : checked ? 'cursor-pointer bg-blue-600' : 'cursor-pointer bg-zinc-300 dark:bg-zinc-700'
          }`}
          role="switch"
          aria-checked={checked}
        >
          <span
            className={`${
              checked ? "translate-x-5" : "translate-x-0"
            } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
          />
        </button>
      </div>
    </div>
  );
}
