export type RenderIfProps = {
  condition: Boolean
  children: React.ReactNode
}
export function RenderIf({ condition, children }: RenderIfProps) {
  if (!condition) {
    return null
  }

  return children
}

export default RenderIf
