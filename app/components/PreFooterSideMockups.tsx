import Link from 'next/link'

function Panel({ eyebrow, title, body, button, href, imageLeft }: { eyebrow: string; title: string; body: string; button: string; href: string; imageLeft: boolean }) {
  return (
    <div className="relative overflow-hidden min-h-[320px] md:min-h-[560px]">
      <div className="grid grid-cols-1 md:grid-cols-12 items-center md:gap-14">
        {/* Mockup side (≈66.7%) */}
        <div className={`${imageLeft ? 'md:col-span-8' : 'md:order-2 md:col-span-8'} relative p-6 md:p-14 flex items-center justify-center`}>
          <div className="absolute inset-0 pointer-events-none" aria-hidden>
            <div className="absolute -inset-28 bg-gradient-to-tr from-[#FF7A18]/8 via-transparent to-transparent" />
          </div>
          <div className="relative w-full aspect-[16/9] rounded-[20px] border border-white/12 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm shadow_[0_18px_60px_rgba(0,0,0,0.35)]">
            <div className="absolute inset-0 rounded-[20px] bg-gradient-to-tr from-[#FF7A18]/10 via-transparent to-transparent" />
            <div className="absolute top-5 left-8 right-8 h-7 rounded-md bg-white/10" />
            <div className="absolute top-28 left-8 right-8 h-64 rounded-lg bg-white/6" />
            <div className="absolute bottom-6 left-8 right-8 h-12 rounded-md bg-white/10" />
          </div>
        </div>
        {/* Text side (≈33.3%) */}
        <div className={`${imageLeft ? 'md:col-span-4' : 'md:col-span-4 md:order-1'} relative p-6 md:p-14 flex flex-col justify-center`}>
          <div className="text-[11px] uppercase tracking-wide text-white/70">
            <span className="align-middle">{eyebrow}</span>
            <span className="ml-2 inline-block align-middle h-[2px] w-14 bg-gradient-to-r from-[#FF7A18] to-transparent rounded-full" />
          </div>
          <h3 className="mt-3 text-[28px] font-extrabold text-white max-w-[38ch] leading-tight">{title}</h3>
          <p className="mt-3 text-[15px] text-white/80 max-w-[60ch] leading-relaxed">{body}</p>
          <div className="mt-8">
            <Link href={href} className="inline-flex items-center justify-center rounded-md bg-[#FF7A18] hover:bg-[#FF6A00] px-7 py-3.5 text-[13px] font-semibold text-black focus:outline-none focus:ring-2 focus:ring-[#FF7A18]/60">
              {button}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PreFooterSideMockups() {
  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: '#111315' }}>
      {/* Orange accent glows */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute left-[12%] top-[28%] w-[520px] h-[520px] rounded-full bg-[#FF7A18]/14 blur-[140px]" />
        <div className="absolute right-[8%] top-[58%] w-[460px] h-[460px] rounded-full bg-[#FF6A00]/12 blur-[130px]" />
        <div className="absolute -inset-40 bg-[linear-gradient(120deg,rgba(255,106,0,0.08),transparent_30%)]" />
      </div>
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-28 pt-10 pb-24 md:pt-16 md:pb-28">
        <div className="space-y-24 md:space-y-28">
          <Panel
            eyebrow="1 — Explore"
            title="Automated GEO features, ready to ship."
            body="Generate trend-aligned SEO, transform to multi-strategy GEO, and keep what wins—on autopilot."
            button="Explore Features →"
            href="/features"
            imageLeft={true}
          />
          <Panel
            eyebrow="2 — See the loop"
            title="From onboarding to outcomes."
            body="Six steps: Onboard, Find Trends, Draft SEO, Transform to GEO, Publish, Test & Re-Optimize."
            button="See How It Works →"
            href="/how-it-works"
            imageLeft={false}
          />
          <Panel
            eyebrow="3 — Stories"
            title="Real teams, real content."
            body="Browse anonymized showcases and how GEO variations improved visibility and citations."
            button="View Stories →"
            href="/built-with"
            imageLeft={true}
          />
        </div>
      </div>
    </section>
  )
}
