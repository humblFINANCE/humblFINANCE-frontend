export default function InvestingFrameworkLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-3">
      <div className="w-full max-w-7xl">{children}</div>
    </section>
  )
}
