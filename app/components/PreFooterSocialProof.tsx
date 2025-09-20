export default function PreFooterSocialProof() {
  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: "#0B0B0B" }}>
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -inset-40 bg-gradient-to-tr from-[#FF7A18]/10 via-[#FF6A00]/6 to-transparent blur-2xl" />
      </div>
      <div className="relative mx-auto max-w-6xl px-6 py-14 md:py-16">
        <h3 className="text-[18px] font-semibold text-white">Who it’s for—and why it works</h3>
        <div className="mt-5 flex flex-wrap gap-2">
          {['SaaS Launch','DTC / E‑commerce','B2B Services','Developer Tools','EdTech','Fintech'].map((label) => (
            <span key={label} className="rounded-full bg-white text-[#0B0B0B] px-3 py-1 text-[11px]">{label}</span>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {['Visibility Index','Citation Rate','Conversion Uplift','Learning Speed'].map((label) => (
            <span key={label} className="rounded-full border border-white/20 text-white px-3 py-1 text-[11px]">{label}</span>
          ))}
        </div>
        <div className="mt-3 text-[11px] text-gray-400">Public metrics roll out as Beta results finalize.</div>
      </div>
    </section>
  )
}
