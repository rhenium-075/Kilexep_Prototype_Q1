import Link from 'next/link'

function Card({ title }: { title: string }) {
  return (
    <div className="shrink-0 w-[600px] h-[340px] rounded-[20px] border border-white/12 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm shadow-[0_14px_40px_rgba(0,0,0,0.35)] relative overflow-hidden mx-3 md:mx-4">
      <div className="absolute inset-0 rounded-[20px] bg-gradient-to-tr from-[#FF7A18]/8 via-transparent to-transparent" />
      {/* Frame UI placeholders */}
      <div className="absolute top-4 left-6 right-6 h-6 rounded-md bg-white/10" />
      <div className="absolute top-16 left-6 right-6 h-40 rounded-lg bg-white/6" />
      <div className="absolute bottom-5 left-6 right-6 h-10 rounded-md bg-white/10" />
      <div className="absolute bottom-2 left-6 right-6 flex items-center justify-between text-[11px] text-white/70">
        <span>{title}</span>
        <span className="text-white/70">See more →</span>
      </div>
    </div>
  )
}

export default function PreFooterMockupStrip() {
  const cards = [
    'GEO Variations Console',
    'AI Visibility Check',
    'Trend Cluster Builder',
    'Publishing Timeline',
    'Citations & Sources',
    'Winning Strategy Summary',
    'GEO Variations Console',
  ]
  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: '#0B0B0B' }}>
      {/* Orange accent glows */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute left-[6%] top-[30%] w-[420px] h-[420px] rounded-full bg-[#FF7A18]/12 blur-[120px]" />
        <div className="absolute right-[4%] top-[62%] w-[380px] h-[380px] rounded-full bg-[#FF6A00]/10 blur-[110px]" />
      </div>
      <div className="relative mx-auto max-w-[1280px] px-6 md:px-20 py-16 md:py-20">
        {/* Section A — Header */}
        <div className="text-center">
          <h3 className="text-white text-2xl md:text-[28px] font-extrabold">Connect your growth stack.</h3>
          <p className="mt-2 text-[14px] text-white/80">Plug Kilexep into your content and analytics tools to accelerate GEO performance.</p>
          <Link href="#" className="mt-3 inline-block text-[12px] text-white/90 focus:outline-none focus:ring-2 focus:ring-[#FF7A18]/60">
            <span className="underline underline-offset-4 decoration-[#FF7A18]">Explore integrations →</span>
          </Link>
        </div>
      </div>

      {/* Section B — Full-width auto-scrolling strip */}
      <div className="relative w-screen left-1/2 -translate-x-1/2 overflow-hidden py-10">
        {/* Edge fades */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0B0B0B] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0B0B0B] to-transparent" />

        <div className="marquee-track flex">
          {[...cards, ...cards].map((t, i) => (
            <Card key={i} title={t} />
          ))}
        </div>

        <style jsx>{`
          .marquee-track {
            width: max-content;
            animation: marquee 80s linear infinite;
          }
          @keyframes marquee {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
        `}</style>
      </div>

      {/* Section C — Teaser */}
      <div className="relative mx-auto max-w-[1280px] px-6 md:px-20 pb-6 md:pb-8">
        <div className="mt-6 text-center">
          <h4 className="text-white text-xl font-semibold">Built with Kilexep</h4>
          <p className="mt-2 text-[14px] text-white/80">See how teams use GEO variations to improve visibility and citations.</p>
          <Link href="#" className="mt-2 inline-block text-[12px] text-white/90 focus:outline-none focus:ring-2 focus:ring-[#FF7A18]/60">
            <span className="underline underline-offset-4 decoration-[#FF7A18]">Explore the presentation gallery →</span>
          </Link>
        </div>
      </div>

      {/* Added — Full-width auto-scrolling strip under the teaser */}
      <div className="relative w-screen left-1/2 -translate-x-1/2 overflow-hidden py-10">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0B0B0B] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0B0B0B] to-transparent" />

        <div className="marquee-track-2 flex">
          {[...cards, ...cards].map((t, i) => (
            <Card key={`b-${i}`} title={t} />
          ))}
        </div>

        <style jsx>{`
          .marquee-track-2 {
            width: max-content;
            animation: marquee2 90s linear infinite;
          }
          @keyframes marquee2 {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>
    </section>
  )
}
