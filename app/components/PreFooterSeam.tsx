export default function PreFooterSeam() {
  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: '#111315' }}>
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -top-1/3 left-1/2 -translate-x-1/2 w-[1400px] h-[640px] rounded-full bg-[#FF6A00]/22 blur-[160px]" />
        <div className="absolute inset-0 bg-[radial-gradient(80%_40%_at_50%_-10%,rgba(255,106,0,0.18),transparent_70%)]" />
      </div>
      <div className="relative mx-auto max-w-6xl px-6 py-12 md:py-16" />
    </section>
  )
}
