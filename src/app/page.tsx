import Link from 'next/link';
import { Sparkles, ShieldCheck, Palette, ArrowRight, CheckCircle2 } from 'lucide-react';
import { HeroResumeRotator } from '@/components/home/HeroResumeRotator';

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900  text-zinc-600 dark:text-zinc-400  font-sans selection:bg-blue-500/30 selection:text-zinc-900 dark:text-zinc-100 ">

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden px-6">
        {/* Abstract background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none opacity-50" />
        
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-8 items-center relative z-10 w-full">
          {/* Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
              <Sparkles size={14} />
              <span>Resume Australia 2.0 is live</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight leading-[1.1] mb-6">
              Build your perfect resume. <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                100% Free.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 mb-10 max-w-2xl leading-relaxed">
              The most powerful resume builder in Australia. AI-powered bullet writing, instant ATS scoring, and pixel-perfect templates that get you hired.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link 
                href="/resume-builder" 
                className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-lg flex items-center justify-center gap-2 group transition-all duration-150 shadow-[0_6px_0_rgb(29,78,216)] hover:shadow-[0_8px_0_rgb(29,78,216)] hover:-translate-y-0.5 active:shadow-[0_0px_0_rgb(29,78,216)] active:translate-y-1.5"
              >
                Create My Resume
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/tracker" 
                className="w-full sm:w-auto px-8 py-4 bg-zinc-50 dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold rounded-xl text-lg flex items-center justify-center transition-all duration-150 shadow-[0_6px_0_rgb(228,228,231)] dark:shadow-[0_6px_0_rgb(39,39,42)] hover:shadow-[0_8px_0_rgb(228,228,231)] dark:hover:shadow-[0_8px_0_rgb(39,39,42)] hover:-translate-y-0.5 active:shadow-[0_0px_0_rgb(228,228,231)] dark:active:shadow-[0_0px_0_rgb(39,39,42)] active:translate-y-1.5"
              >
                Try Job Tracker
              </Link>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-sm text-zinc-500 dark:text-zinc-400 font-medium">
              <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-green-500" /> No credit card required</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-green-500" /> No paywalls</span>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="w-full lg:w-1/2 relative mx-auto max-w-lg lg:max-w-none h-full">
            <div className="relative w-full h-full aspect-[3/4] rounded-2xl bg-white shadow-2xl overflow-hidden border border-zinc-200 flex flex-col">
              <HeroResumeRotator />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-zinc-200 dark:border-zinc-800  bg-zinc-50 dark:bg-zinc-950  py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center md:justify-between items-center gap-8 text-center">
          <div>
            <div className="text-3xl font-black text-zinc-900 dark:text-zinc-100 ">50,000+</div>
            <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mt-1">Resumes Created</div>
          </div>
          <div>
            <div className="text-3xl font-black text-zinc-900 dark:text-zinc-100 ">50+</div>
            <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mt-1">Pro Templates</div>
          </div>
          <div>
            <div className="text-3xl font-black text-zinc-900 dark:text-zinc-100 ">0</div>
            <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mt-1">Hidden Paywalls</div>
          </div>
          <div>
            <div className="text-3xl font-black text-zinc-900 dark:text-zinc-100 ">100%</div>
            <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mt-1">ATS Friendly</div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-100  tracking-tight mb-4">Everything you need to get hired.</h2>
            <p className="text-xl text-zinc-500 dark:text-zinc-400 ">Stop fighting with Word documents and let our tools do the heavy lifting.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/resume-builder" className="block text-left bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-8 rounded-3xl hover:border-blue-500/30 transition-colors group cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900">
              <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors">
                <Sparkles className="text-blue-500" size={28} />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">AI-Powered Writing</h3>
              <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Connect your Google Gemini API key to automatically generate highly quantifiable, ATS-friendly bullet points tailored to your exact target job.
              </p>
            </Link>

            <Link href="/ats-scorer" className="block text-left bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-8 rounded-3xl hover:border-green-500/30 transition-colors group cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900">
              <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-500/20 transition-colors">
                <ShieldCheck className="text-green-500" size={28} />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">Instant ATS Scoring</h3>
              <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Paste the job description and our live scanner will calculate your match score, find missing keywords, and banish weak action verbs from your resume.
              </p>
            </Link>

            <Link href="/templates" className="block text-left bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-8 rounded-3xl hover:border-purple-500/30 transition-colors group cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900">
              <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-500/20 transition-colors">
                <Palette className="text-purple-500" size={28} />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">Beautiful Templates</h3>
              <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Choose from 5 premium, pixel-perfect templates ranging from Corporate to Creative. Fully customizable colors and typography with flawless PDF exports.
              </p>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

