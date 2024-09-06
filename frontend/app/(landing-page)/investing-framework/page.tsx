import { title } from '@/components/Primitives'
import { cn } from '@/utils/cn'

export default function InvestingFrameworkPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <h1 className={cn(title(), 'text-center my-8')}>Investing Framework</h1>
      {/* Add your investing framework content here */}
    </div>
  )
}
