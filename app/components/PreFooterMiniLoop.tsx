export default function PreFooterMiniLoop() {
  const steps = [
    'Onboard','Find Trends','Draft SEO','Transform to GEO','Publish Multi-Strategy','Test & Re-Optimize'
  ]
  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: '#111315' }}>
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -inset-40 bg-gradient-to-t from-[#FF7A18]/10 via-[#FF6A00]/6 to-transparent blur-2xl" />
      </div>
      <div className="relative mx-auto max-w-6xl px-6 py-14 md:py-16">
        <h3 className="text-[18px] font-semibold text-white">How it works—at a glance</h3>
        <div className="mt-1 h-[2px] w-20 bg-gradient-to-r from-[#FF7A18] to-transparent rounded-full" />
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {steps.map((title) => (
            <div key={title} className="rounded-xl border border-white/15 bg-transparent p-4">
              <div className="text-[13px] font-semibold text-white">{title}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 text-[11px] text-gray-400">Repeat the cycle to compound performance.</div>
      </div>
    </section>
  )
}
