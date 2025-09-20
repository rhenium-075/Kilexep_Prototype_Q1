import Link from 'next/link'

export default function PreFooter() {
  return (
    <section className="relative overflow-hidden">
      {/* Sleek gradient aura */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -inset-32 bg-gradient-to-br from-orange-500/14 via-orange-500/6 to-transparent blur-2xl" />
      </div>

      <div className="mx-auto max-w-6xl px-6 py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Value Block */}
          <div>
            <h2 className="text-[22px] sm:text-[26px] font-extrabold tracking-tight">Start the GEO flywheel.</h2>
            <p className="mt-3 max-w-xl text-[13px] sm:text-[14px] text-gray-300 leading-relaxed">
              Turn onboarding insights into trend-aligned SEO, transform into multi-strategy GEO, check real AI visibility, and keep what wins.
            </p>
            <div className="mt-5 flex flex-wrap gap-2 text-[11px] text-gray-200">
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">AI Engine Optimization</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">Multi-Strategy Publishing</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">Self-Learning Loop</span>
            </div>
          </div>

          {/* Primary Actions */}
          <div className="md:justify-self-end">
            <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
              <a className="inline-flex items-center justify-center rounded-md bg-orange-500/90 px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-orange-500 transition-colors" href="#">Request Demo</a>
              <a className="inline-flex items-center justify-center rounded-md border border-white/15 bg-white/5 px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-white/10 transition-colors" href="#">Join the Beta</a>
            </div>
            <div className="mt-2 text-[10px] text-gray-400 text-right">No card required on Free.</div>
          </div>
        </div>
      </div>
    </section>
  )
}
