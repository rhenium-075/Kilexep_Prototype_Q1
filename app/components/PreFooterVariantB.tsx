export default function PreFooterVariantB() {
  const stats = [
    ['Visibility Index', '—'],
    ['Citation Rate', '—'],
    ['Conversion Uplift', '—'],
    ['Learning Speed', '—'],
  ]
  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: '#0B0B0B' }}>
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -inset-40 bg-gradient-to-t from-[#FF7A18]/10 via-[#FF6A00]/6 to-transparent blur-2xl" />
      </div>
      <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-20 min-h-[360px] sm:min-h-[400px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map(([label, value]) => (
            <div key={label} className="rounded-2xl bg-white text-[#0B0B0B] shadow-sm border border-gray-200/60 p-6 flex flex-col items-start justify-between min-h-[200px]">
              <div className="h-1 w-full mb-4" style={{ background: 'linear-gradient(90deg, #FF7A18, #FF6A00)' }} />
              <div className="text-[11px] uppercase tracking-wide text-gray-600">{label}</div>
              <div className="mt-2 text-4xl font-extrabold">{value}</div>
              <div className="mt-auto text-[10px] text-gray-500">coming soon</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
