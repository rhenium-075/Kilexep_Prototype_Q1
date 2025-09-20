export default function PreFooterVariantC() {
  const frames = [
    ['Onboard'],
    ['GEO Variations'],
    ['Visibility Check'],
  ]
  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: '#111315' }}>
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -inset-40 bg-gradient-to-b from-[#FF7A18]/10 via-[#FF6A00]/6 to-transparent blur-2xl" />
      </div>
      <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-20 min-h-[360px] sm:min-h-[400px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {frames.map(([caption]) => (
            <div key={caption} className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm p-4 min-h-[220px] shadow-[0_10px_30px_rgba(0,0,0,0.35)] relative">
              <div className="absolute top-3 left-3 right-3 h-5 rounded-md bg-white/10" />
              <div className="absolute top-12 left-3 right-3 h-28 rounded-lg bg_white/10" />
              <div className="absolute bottom-4 left-3 right-3 h-8 rounded-md bg-white/10" />
              <div className="absolute -inset-0.5 rounded-2xl pointer-events-none" />
              <div className="absolute bottom-2 left-4 text-[11px] text-gray-300">{caption}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
