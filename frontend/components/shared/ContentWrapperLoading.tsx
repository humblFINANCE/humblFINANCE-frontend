import { cn } from '@/utils/cn'
import { Skeleton } from '@nextui-org/react'

export interface ContentLoadingProps
  extends React.HTMLAttributes<HTMLDivElement> {
  isLoading: boolean
}

export function ContentWrapperLoading({
  className,
  isLoading,
  children,
  ...props
}: Readonly<ContentLoadingProps>) {
  if (!isLoading) return <div className={className}>{children}</div>

  return (
    <Skeleton
      className={cn(
        'animate-pulse rounded-lg bg-primary-foreground/15',
        className
      )}
      {...props}
    />
  )
}
