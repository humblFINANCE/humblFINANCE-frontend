
export type RenderIfProps = {
    condition: Boolean
    children: React.ReactNode
}
export default function Component({ condition, children}: RenderIfProps) {
  if (!condition) {
    return null
  }

  return children
}
