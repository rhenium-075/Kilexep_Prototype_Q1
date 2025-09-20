import Link from 'next/link'

export default function PreFooterBottomCTA() {
  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: '#0B0B0B' }}>
      {/* Core orange glow + subtle grain */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 w-[1400px] h-[800px] rounded-full bg-[#FF6A00]/24 blur-[160px]" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_40%,rgba(255,122,24,0.10),rgba(11,11,11,1))] opacity-[0.9]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.4)_70%,rgba(0,0,0,0.8)_100%)]" />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-6 md:px-20 py-16 md:py-20 min-h-[520px] md:min-h-[600px]">
        {/* Copy */}
        <div className="text-center max-w-[70ch] mx-auto">
          <h3 className="text-white text-3xl md:text-[34px] font-extrabold">Ready to get started?</h3>
          <p className="mt-3 text-[15px] text-white/80">Automate SEO→GEO, test AI visibility, and keep what wins—on autopilot.</p>
          <div className="mt-6">
            <Link href="/dashboard" className="inline-flex items-center justify-center rounded-full bg-[#FF7A18] hover:bg-[#FF6A00] px-7 py-3.5 text-[14px] font-semibold text-white focus:outline-none focus:ring-2 focus:ring-[#FF7A18]/60">
              Get started
            </Link>
          </div>
          <div className="mt-3 text-[12px] text-white/70">Multi-strategy publishing · AI visibility checks · Self-learning loop</div>
        </div>

        {/* Large mockup with subtle parallax */}
        <div className="relative mt-12 md:mt-16 flex items-center justify-center">
          <div className="relative w-full max-w-[1100px] aspect-[16/10] rounded-[20px] border border-white/12 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm shadow-[0_16px_50px_rgba(0,0,0,0.45)]">
            <div className="absolute inset-0 rounded-[20px] bg-gradient-to-tr from-[#FF7A18]/10 via-transparent to-transparent" />
            <div className="absolute top-5 left-8 right-8 h-7 rounded-md bg-white/10" />
            <div className="absolute top-24 left-8 right-8 h-72 rounded-lg bg-white/6" />
            <div className="absolute bottom-6 left-8 right-8 h-12 rounded-md bg-white/10" />
          </div>
          {/* Optional phone overlay */}
          <div className="absolute right-[12%] bottom-[-6%] w-[180px] md:w-[220px] aspect-[9/18] rounded-[24px] border border-white/12 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm shadow-[0_10px_30px_rgba(0,0,0,0.45)]" />
        </div>
      </div>

      {/* Dark fade into footer */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-[linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,0.85))] pointer-events-none" aria-hidden />
    </section>
  )
}