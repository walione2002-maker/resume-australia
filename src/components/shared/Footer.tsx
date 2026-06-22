import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full bg-[#0b1120] text-zinc-400 py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12 text-sm">
        
        {/* Column 1: Brand */}
        <div className="flex flex-col gap-2">
          <Link href="/" className="flex items-center gap-2.5 z-50">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-sm font-bold text-white shadow-lg shadow-blue-500/25">
              RA
            </div>
            <span className="text-lg font-bold text-white whitespace-nowrap">
              Resume <span className="text-blue-500">Australia</span>
            </span>
          </Link>
        </div>

        {/* Column 2: Resume & Cover Letter */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-bold text-zinc-500 tracking-wider uppercase mb-1">Resume</h3>
            <Link href="/resume-builder" className="hover:text-white transition-colors font-semibold text-zinc-200">AI Resume Builder</Link>
            <Link href="/ats-scorer" className="hover:text-white transition-colors font-semibold text-zinc-200">ATS Scorer</Link>
            <Link href="/examples" className="hover:text-white transition-colors font-semibold text-zinc-200">Resume Examples</Link>
            <Link href="/templates" className="hover:text-white transition-colors font-semibold text-zinc-200">Resume Templates</Link>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-bold text-zinc-500 tracking-wider uppercase mb-1">Cover Letter</h3>
            <Link href="/examples#cover-letters" className="hover:text-white transition-colors font-semibold text-zinc-200">Cover Letter Examples</Link>
            <Link href="/cover-letter-builder" className="hover:text-white transition-colors font-semibold text-zinc-200">Cover Letter Templates</Link>
          </div>
        </div>

        {/* Column 3: Job Seekers & Resources */}
        <div className="flex flex-col gap-8">

          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-bold text-zinc-500 tracking-wider uppercase mb-1">Resources</h3>
            <Link href="/blog" className="hover:text-white transition-colors font-semibold text-zinc-200">Blog</Link>
            <Link href="/support" className="hover:text-white transition-colors font-semibold text-zinc-200">Resume Help</Link>
            <Link href="/interview-prep" className="hover:text-white transition-colors font-semibold text-zinc-200">Job Interview</Link>
            <Link href="/blog#career" className="hover:text-white transition-colors font-semibold text-zinc-200">Career</Link>
            <Link href="/blog/writing-resume" className="hover:text-white transition-colors font-semibold text-zinc-200">Writing A Resume</Link>
            <Link href="/blog/writing-cover-letter" className="hover:text-white transition-colors font-semibold text-zinc-200">Writing A Cover Letter</Link>
          </div>
        </div>

        {/* Column 4: Our Company */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-bold text-zinc-500 tracking-wider uppercase mb-1">Our Company</h3>
          <Link href="/about" className="hover:text-white transition-colors font-semibold text-zinc-200">About Us</Link>
          <Link href="/pricing" className="hover:text-white transition-colors font-semibold text-zinc-200">Pricing</Link>
          <Link href="/network" className="hover:text-white transition-colors font-semibold text-zinc-200">Updates</Link>
          <Link href="/network#sponsorship" className="hover:text-white transition-colors font-semibold text-zinc-200">Sponsorship Program</Link>
          <Link href="/about#media" className="hover:text-white transition-colors font-semibold text-zinc-200">Media Kit</Link>
          <Link href="/network#affiliates" className="hover:text-white transition-colors font-semibold text-zinc-200">Affiliates</Link>
        </div>

        {/* Column 5: Support */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-bold text-zinc-500 tracking-wider uppercase mb-1">Support</h3>
          <Link href="/support#faq" className="hover:text-white transition-colors font-semibold text-zinc-200">FAQ</Link>
          <Link href="/support#contact" className="hover:text-white transition-colors font-semibold text-zinc-200">Contact Us</Link>
          <Link href="/legal#tos" className="hover:text-white transition-colors font-semibold text-zinc-200">Terms Of Service</Link>
          <Link href="/legal#privacy" className="hover:text-white transition-colors font-semibold text-zinc-200">Privacy</Link>
          <Link href="/settings" className="hover:text-white transition-colors font-semibold text-zinc-200">Settings</Link>
          <Link href="/legal#withdrawal" className="hover:text-white transition-colors font-semibold text-zinc-200">Right Of Withdrawal</Link>
        </div>

      </div>
    </footer>
  );
}
