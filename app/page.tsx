import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Rough Cut BBQ — The Pitmaster\'s Calculator & Forum',
  description:
    'The ultimate companion app for low & slow BBQ. Calculate precise cook times, rest periods, and temperatures. Share before/after cook pictures in our anonymous community forum.',
  openGraph: {
    title: 'Rough Cut BBQ — The Pitmaster\'s Calculator & Forum',
    description:
      'The ultimate companion app for low & slow BBQ. Precise cook times and temperatures, offline saves, and a photo-sharing forum.',
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-brand-dark overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 border-b border-brand-muted/10 bg-gradient-to-b from-brand-surface/30 to-brand-dark">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          {/* Hero Content */}
          <div className="md:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-secondary/10 border border-brand-secondary/20 text-brand-secondary text-xs font-black tracking-wide uppercase">
              🔥 Now Available on Android
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-brand-text leading-tight font-display italic">
              Master the Pit.<br/>
              <span className="text-brand-secondary not-italic">Every Single Time.</span>
            </h1>
            
            <p className="text-brand-muted text-base sm:text-lg leading-relaxed max-w-xl">
              Rough Cut BBQ is the ultimate pocket companion for pitmasters. Calculate exact cook times, navigate the stall, plan rests, and share your smoke logs anonymously with the community.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                href="/calculator"
                className="inline-flex items-center justify-center bg-brand-secondary hover:bg-brand-secondary/90 transition-all text-white font-black text-base px-8 py-4 rounded-2xl tracking-wide shadow-lg shadow-brand-secondary/20 hover:scale-[1.02] cursor-pointer"
              >
                🔥 Launch Smart Calculator
              </Link>
              <a
                href="/rough-cut-bbq-debug.apk"
                download
                className="inline-flex items-center justify-center bg-brand-surface hover:bg-brand-surface/80 border border-brand-muted/20 hover:border-brand-muted/40 transition-all text-brand-text font-black text-base px-8 py-4 rounded-2xl tracking-wide hover:scale-[1.02]"
              >
                🤖 Download for Android (APK)
              </a>
            </div>
            
            <div className="flex items-center gap-6 pt-4 text-xs text-brand-muted/70">
              <div className="flex items-center gap-1.5">
                <span className="text-emerald-500">✓</span> No Account Required
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-emerald-500">✓</span> 100% Free
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-emerald-500">✓</span> Metric Focus (kg & °C)
              </div>
            </div>
          </div>
          
          {/* Hero Image / Mockup */}
          <div className="md:col-span-5 flex justify-center relative">
            <div className="relative w-full max-w-[340px] md:max-w-full aspect-[4/5] rounded-3xl overflow-hidden border border-brand-muted/20 shadow-2xl shadow-black/60 group">
              <Image
                src="/images/rough_cut_bbq_hero.png"
                alt="Rough Cut BBQ App Mockup"
                fill
                priority
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-40"></div>
            </div>
            {/* Absolute badge */}
            <div className="absolute -bottom-4 -right-4 bg-brand-primary text-white font-bold text-xs px-4 py-2.5 rounded-2xl border border-brand-primary/20 shadow-lg rotate-3 hidden sm:block">
              🥩 Metric-First App
            </div>
          </div>
          
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="py-20 bg-brand-dark/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-black text-brand-text font-display italic">
              Built for Pitmasters by Pitmasters
            </h2>
            <p className="text-brand-muted text-sm sm:text-base">
              Everything you need to step up your low & slow game, pack your smoker, and serve legendary cooks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Feature 1 */}
            <div className="bg-brand-surface/40 border border-brand-muted/10 rounded-3xl p-8 hover:border-brand-muted/30 transition-all group hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-brand-secondary/10 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                ⏱️
              </div>
              <h3 className="text-xl font-bold text-brand-text mb-3">Precision Cook Calculator</h3>
              <p className="text-brand-muted text-sm leading-relaxed">
                Enter your cut, cooking method, and weight. Get a precise, custom-timed checklist mapping out prep, smoking, wrapping milestones, and critical rest periods.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-brand-surface/40 border border-brand-muted/10 rounded-3xl p-8 hover:border-brand-muted/30 transition-all group hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                📸
              </div>
              <h3 className="text-xl font-bold text-brand-text mb-3">Anonymous BBQ Forum</h3>
              <p className="text-brand-muted text-sm leading-relaxed">
                Share before and after images of your bark and smoke rings! The forum keeps you anonymous under fun aliases like <em>Smoky Pitmaster #5</em> to focus purely on the cook quality.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-brand-surface/40 border border-brand-muted/10 rounded-3xl p-8 hover:border-brand-muted/30 transition-all group hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-brand-muted/10 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                💾
              </div>
              <h3 className="text-xl font-bold text-brand-text mb-3">Saves Log & Cloud Sync</h3>
              <p className="text-brand-muted text-sm leading-relaxed">
                Log and look back at your history of cooks. Logs are stored offline in your device by default, with one-click cloud synchronization whenever you decide to sign up.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Community / Forum Showcase */}
      <section className="py-20 border-t border-brand-muted/10 bg-brand-surface/20">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          {/* Forum Image */}
          <div className="md:col-span-5 order-2 md:order-1 flex justify-center">
            <div className="relative w-full max-w-[340px] md:max-w-full aspect-[4/5] rounded-3xl overflow-hidden border border-brand-muted/20 shadow-2xl shadow-black/60 group">
              <Image
                src="/images/rough_cut_bbq_forum.png"
                alt="Rough Cut BBQ Forum Showcase"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-40"></div>
            </div>
          </div>

          {/* Forum Content */}
          <div className="md:col-span-7 order-1 md:order-2 space-y-6 text-left">
            <h2 className="text-3xl sm:text-4xl font-black text-brand-text font-display italic">
              Share Your Cook.<br/>
              <span className="text-brand-secondary not-italic">Keep Your Privacy.</span>
            </h2>
            <p className="text-brand-muted text-base leading-relaxed">
              We built an easy-to-use forum specifically for BBQ enthusiasts. No social media tracking, no credentials leaks. Log in, share your cook, star logs from other pitmasters, and review details in the comments.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-brand-secondary font-black text-lg">🍔</span>
                <div>
                  <h4 className="font-bold text-brand-text text-sm">Deterministic Aliases</h4>
                  <p className="text-brand-muted text-xs">Your username is hashed into fun combinations of meats and methods to preserve anonymity.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-brand-secondary font-black text-lg">⭐</span>
                <div>
                  <h4 className="font-bold text-brand-text text-sm">Star System</h4>
                  <p className="text-brand-muted text-xs">Let other pitmasters know they nailed the cook by starring their post card.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-brand-secondary font-black text-lg">💬</span>
                <div>
                  <h4 className="font-bold text-brand-text text-sm">Threaded Discussion</h4>
                  <p className="text-brand-muted text-xs">Ask and answer questions about wood pairings, wrapping temperature, and rubs in clean drawers.</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/gallery"
                className="inline-flex items-center justify-center bg-brand-surface hover:bg-brand-surface/80 border border-brand-muted/20 hover:border-brand-muted/40 transition-all text-brand-text font-black text-sm px-6 py-3.5 rounded-xl cursor-pointer"
              >
                📸 Explore the Cook Forum
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Guides, Rubs, Wood Pairing Cards */}
      <section className="py-20 bg-brand-dark">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-black text-brand-text font-display italic">
              Master the Craft
            </h2>
            <p className="text-brand-muted text-sm sm:text-base">
              Explore charts, pairings, and comprehensive text resources to boost your pitmaster skills.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            {/* Guide Card */}
            <Link
              href="/guides"
              className="bg-brand-surface/30 border border-brand-muted/10 rounded-2xl p-6 hover:border-brand-secondary/30 transition-all group flex flex-col justify-between min-h-[160px]"
            >
              <div>
                <span className="text-2xl block mb-3">📖</span>
                <h4 className="font-bold text-brand-text text-lg mb-1 group-hover:text-brand-secondary transition-colors">Pitmaster Guides</h4>
                <p className="text-brand-muted text-xs leading-normal">Trim tips, handling the stall, wrapping styles, and rest timing guidelines.</p>
              </div>
              <span className="text-brand-secondary font-bold text-xs mt-4 block group-hover:translate-x-1 transition-transform">Read Guides →</span>
            </Link>

            {/* Rubs Card */}
            <Link
              href="/rubs"
              className="bg-brand-surface/30 border border-brand-muted/10 rounded-2xl p-6 hover:border-brand-secondary/30 transition-all group flex flex-col justify-between min-h-[160px]"
            >
              <div>
                <span className="text-2xl block mb-3">🌶️</span>
                <h4 className="font-bold text-brand-text text-lg mb-1 group-hover:text-brand-secondary transition-colors">Spices &amp; Rubs</h4>
                <p className="text-brand-muted text-xs leading-normal">Traditional recipes for brisket rubs, pork shoulder seasonings, and poultry glazes.</p>
              </div>
              <span className="text-brand-secondary font-bold text-xs mt-4 block group-hover:translate-x-1 transition-transform">Explore Rubs →</span>
            </Link>

            {/* Wood Card */}
            <Link
              href="/wood-chart"
              className="bg-brand-surface/30 border border-brand-muted/10 rounded-2xl p-6 hover:border-brand-secondary/30 transition-all group flex flex-col justify-between min-h-[160px]"
            >
              <div>
                <span className="text-2xl block mb-3">🌳</span>
                <h4 className="font-bold text-brand-text text-lg mb-1 group-hover:text-brand-secondary transition-colors">Wood pairing Chart</h4>
                <p className="text-brand-muted text-xs leading-normal">Complete matrix matching hardwoods, fruitwoods, and nutwoods to meats.</p>
              </div>
              <span className="text-brand-secondary font-bold text-xs mt-4 block group-hover:translate-x-1 transition-transform">View Pairings →</span>
            </Link>

          </div>
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="py-16 md:py-24 border-t border-brand-muted/10 bg-gradient-to-t from-brand-surface/20 to-brand-dark">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl md:text-5xl font-black text-brand-text font-display italic leading-tight">
            Ready to Cook?
          </h2>
          <p className="text-brand-muted text-sm md:text-base max-w-lg mx-auto">
            Get your timing, temperatures, and milestones immediately. Keep your BBQ plan organized and review before and after image feeds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href="/calculator"
              className="bg-brand-secondary hover:bg-brand-secondary/90 transition-colors text-white font-black text-base px-8 py-4 rounded-xl cursor-pointer"
            >
              🔥 Launch Web Calculator
            </Link>
            <a
              href="/rough-cut-bbq-debug.apk"
              download
              className="bg-brand-surface hover:bg-brand-surface/80 border border-brand-muted/20 transition-colors text-brand-text font-black text-base px-8 py-4 rounded-xl"
            >
              🤖 Get Android App (APK)
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
