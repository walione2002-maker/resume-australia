'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Wand2, Target, PenTool, LayoutTemplate, Sparkles, Briefcase, GraduationCap, LifeBuoy, FileText, Info, CreditCard, Users, MessageSquare, User, LogOut, Settings } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthContext';

const navigation = [
  {
    name: 'AI Creation Suites',
    items: [
      { name: 'AI Resume Builder', href: '/resume-builder', icon: Wand2, description: 'Build a premium resume instantly' },
      { name: 'ATS Scorer', href: '/ats-scorer', icon: Target, description: 'Score and optimize against job descriptions' },
      { name: 'Cover Letter Builder', href: '/cover-letter-builder', icon: PenTool, description: 'Generate matching cover letters' },
    ],
  },
  {
    name: 'Inspiration & Design',
    items: [
      { name: 'Resume Examples', href: '/examples', icon: FileText, description: 'Real-world industry presets' },
      { name: 'Resume Templates', href: '/templates', icon: LayoutTemplate, description: 'Minimalist, Creative, and ATS layouts' },
      { name: 'Cover Letter Examples', href: '/examples#cover-letters', icon: Sparkles, description: 'Proven cover letter strategies' },
      { name: 'Cover Letter Templates', href: '/cover-letter-builder', icon: PenTool, description: 'Stand out from the crowd' },
    ],
  },
  {
    name: 'Career Accelerator',
    items: [
      { name: 'Job Interview Prep', href: '/interview-prep', icon: GraduationCap, description: 'Interactive behavioral flashcards' },
      { name: 'Career Advice Hub', href: '/blog#career', icon: FileText, description: 'Expert insights and guides' },
      { name: 'Resume Help Docs', href: '/support', icon: LifeBuoy, description: 'Troubleshooting and FAQs' },
    ],
  },
  {
    name: 'Corporate & Support',
    items: [
      { name: 'About Us', href: '/about', icon: Info, description: 'Our vision and tech stack' },
      { name: 'Pricing Matrix', href: '/pricing', icon: CreditCard, description: '100% Free Lifetime Enterprise Plan' },
      { name: 'FAQ', href: '/support#faq', icon: MessageSquare, description: 'Quick answers' },
      { name: 'Contact Support', href: '/support#contact', icon: Users, description: 'Get in touch with the team' },
      { name: 'Settings', href: '/settings', icon: Settings, description: 'Theme & display preferences' },
    ],
  },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpandedCategory, setMobileExpandedCategory] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { user, logout, openLoginModal } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
    setMobileExpandedCategory(null);
  }, [pathname]);

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 z-50">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-sm font-bold text-white shadow-lg shadow-blue-500/25">
            RA
          </div>
          <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100 hidden sm:block whitespace-nowrap">
            Resume <span className="text-blue-500">Australia</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center h-full gap-2">
          {navigation.map((category) => (
            <div
              key={category.name}
              className="relative flex items-center h-full"
              onMouseEnter={() => setActiveDropdown(category.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-semibold transition-colors ${
                  activeDropdown === category.name
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                    : 'text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                {category.name}
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${activeDropdown === category.name ? 'rotate-180' : ''}`} />
              </button>

              {/* Mega Menu Dropdown */}
              <AnimatePresence>
                {activeDropdown === category.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-16 left-1/2 -translate-x-1/2 w-[400px] bg-white dark:bg-zinc-900 rounded-xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden"
                  >
                    <div className="p-4 grid gap-2">
                      {category.items.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="flex items-start gap-4 p-3 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors group"
                        >
                          <div className="flex-shrink-0 mt-0.5 w-8 h-8 rounded-md bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors">
                            <item.icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {item.name}
                            </div>
                            <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                              {item.description}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* CTA & Theme Toggle */}
        <div className="flex items-center gap-3">
          {/* User Profile / Sign In */}
          {user ? (
            <div className="relative group hidden sm:block">
              <button className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 rounded-full pl-2 pr-4 py-1.5 transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-700">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="Profile" className="w-6 h-6 rounded-full" />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-xs text-white">
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200 max-w-[100px] truncate">
                  {user.displayName || user.email}
                </span>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                <button
                  onClick={logout}
                  className="flex w-full items-center gap-2 px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={openLoginModal}
              className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-transparent border border-zinc-300 dark:border-zinc-700 px-4 py-2 text-sm font-bold text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors whitespace-nowrap"
            >
              Sign In
            </button>
          )}

          {user && (
            <Link
              href="/dashboard"
              className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 px-4 py-2.5 text-sm font-bold text-zinc-900 dark:text-zinc-100 transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-700"
            >
              Dashboard
            </Link>
          )}

          <Link
            href="/resume-builder"
            className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-500 hover:shadow-blue-500/30 active:scale-95"
          >
            Create My Resume
          </Link>

          {/* Mobile Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-lg p-2 text-zinc-600 dark:text-zinc-400 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-x-0 top-16 bottom-0 z-40 bg-white dark:bg-zinc-950 overflow-y-auto border-t border-zinc-200 dark:border-zinc-800 lg:hidden"
          >
            <div className="px-4 py-6 space-y-2">
              {navigation.map((category) => (
                <div key={category.name} className="border-b border-zinc-200 dark:border-zinc-800 last:border-0">
                  <button 
                    onClick={() => setMobileExpandedCategory(mobileExpandedCategory === category.name ? null : category.name)}
                    className="w-full flex items-center justify-between py-4 text-left"
                  >
                    <span className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                      {category.name}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform duration-200 ${mobileExpandedCategory === category.name ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {mobileExpandedCategory === category.name && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="grid gap-2 pb-4">
                          {category.items.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                            >
                              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                <item.icon className="w-4 h-4" />
                              </div>
                              <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                {item.name}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              
              <div className="pt-6 pb-20 border-t border-zinc-200 dark:border-zinc-800 space-y-3">
                {user && (
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 px-4 py-4 text-sm font-bold text-zinc-900 dark:text-zinc-100 transition-all hover:bg-zinc-200 dark:hover:bg-zinc-700"
                  >
                    Dashboard
                  </Link>
                )}
                <Link
                  href="/resume-builder"
                  onClick={() => setMobileOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-4 text-sm font-bold text-white shadow-lg transition-all hover:bg-blue-500"
                >
                  Create My Resume
                </Link>
                {!user ? (
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      openLoginModal();
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-300 dark:border-zinc-700 mt-3 px-4 py-4 text-sm font-bold text-zinc-700 dark:text-zinc-200 transition-all hover:bg-zinc-50 dark:hover:bg-zinc-900"
                  >
                    Sign In
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      logout();
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 mt-3 px-4 py-4 text-sm font-bold transition-all"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
