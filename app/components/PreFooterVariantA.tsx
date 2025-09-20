export default function PreFooterVariantA() {
  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: '#111315' }}>
      {/* feathered orange glow blending into hero */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -top-1/3 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] rounded-full bg-[#FF6A00]/20 blur-[140px]" />
        <div className="absolute -inset-40 bg-gradient-to-b from-transparent via-[#FF7A18]/10 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-20 min-h-[380px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: text */}
          <div>
            <h2 className="text-[28px] font-extrabold tracking-tight text-white">Start the GEO flywheel.</h2>
            <p className="mt-3 text-[14px] text-white/80 max-w-xl">Turn onboarding insights into trend-aligned SEO, transform into multi-strategy GEO, check AI visibility, and keep what wins.</p>
            <div className="mt-6 flex flex-wrap gap-2 text-[11px] text-white">
              <span className="rounded-full border border-white/20 bg-transparent px-3 py-1">AI Engine Optimization</span>
              <span className="rounded-full border border-white/20 bg-transparent px-3 py-1">Multi-Strategy Publishing</span>
              <span className="rounded-full border border-white/20 bg-transparent px-3 py-1">Self-Learning Loop</span>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center">
              <a className="inline-flex items-center justify-center rounded-md bg-[#FF7A18] hover:bg-[#FF6A00] px-5 py-3 text-[13px] font-semibold text-black" href="#">Request Demo</a>
              <a className="inline-flex items-center justify-center rounded-md border border-white/20 bg-transparent px-5 py-3 text-[13px] font-semibold text-white hover:bg-white/10" href="#">Join the Beta</a>
            </div>
            <div className="mt-2 text-[10px] text-white/60">No card required on Free.</div>
          </div>

          {/* Right: product visual frame with glass border */}
          <div className="w-full md:justify-self-end">
            <div className="relative rounded-2xl border border-white/12 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm min-h-[260px] lg:min-h-[320px] shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#FF7A18]/12 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 right-4 h-6 rounded-md bg-white/10" />
              <div className="absolute top-16 left-4 right-4 h-40 rounded-lg bg-white/5" />
              <div className="absolute bottom-6 left-4 right-4 h-10 rounded-md bg-white/10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
