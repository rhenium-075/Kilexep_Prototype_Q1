export default function PreFooterWhiteBand() {
  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: '#FFFFFF' }}>
      {/* Subtle top orange feather (kept minimal) */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[1200px] h-10 bg-[radial-gradient(80%_40%_at_50%_100%,rgba(255,106,0,0.08),transparent_70%)] pointer-events-none" aria-hidden />
      {/* Long, soft bottom feather that STARTS lower (delay fade), blending to exact charcoal */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-[linear-gradient(to_bottom,rgba(255,255,255,0)_0%,rgba(255,255,255,0)_55%,rgba(17,19,21,0.15)_70%,rgba(17,19,21,0.45)_85%,rgba(17,19,21,1)_100%)] pointer-events-none" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-24 md:pt-28 md:pb-40">
        <div className="mb-4 md:mb-6 text-center">
          <p className="text-[13px] text-gray-600">예시 목업 영역입니다. 실제 화면은 변경될 수 있습니다.</p>
        </div>
        <div className="flex items-center justify-center">
          <div className="relative w-full max-w-5xl rounded-2xl border border-gray-200/70 bg-gradient-to-br from-gray-50 to-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] min-h-[260px] sm:min-h-[300px]">
            <div className="absolute top-5 left-6 right-6 h-6 rounded-md bg-gray-200/50" />
            <div className="absolute top-16 left-6 right-6 h-44 rounded-lg bg-gray-100" />
            <div className="absolute bottom-6 left-6 right-6 h-10 rounded-md bg-gray-200/60" />
          </div>
        </div>
      </div>
    </section>
  )
}
