export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section className="w-full min-h-screen">{children}</section>
}
