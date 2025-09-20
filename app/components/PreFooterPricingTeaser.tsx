import Link from 'next/link'

export default function PreFooterPricingTeaser() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -inset-24 bg-gradient-to-bl from-orange-500/10 via-orange-500/4 to-transparent blur-xl" />
      </div>
      <div className="mx-auto max-w-6xl px-6 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <h3 className="text-base font-semibold">Pricing that scales with you</h3>
          <div className="flex flex-wrap gap-2 text-[11px] text-gray-200">
            <span className="rounded-full border border-white/10 bg_white/5 px-2.5 py-1">Free — Try essentials</span>
            <span className="rounded-full border border-white/10 bg_white/5 px-2.5 py-1">Pro $20 — Grow with insights</span>
            <span className="rounded-full border border-white/10 bg_white/5 px-2.5 py-1">Scale $200 — Serious volume</span>
          </div>
          <Link href="/pricing" className="inline-flex items-center justify-center rounded-md border border-white/15 bg-white/5 px-3.5 py-2 text-[11px] font-semibold text-white hover:bg-white/10">See Pricing</Link>
        </div>
        <div className="mt-1.5 text-[11px] text-gray-400">Deep Marketing Analysis & monthly content limits increase by tier.</div>
      </div>
    </section>
  )
}
