import { title } from '@/components/Primitives'
import { cn } from '@/utils/cn'

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <h1 className={cn(title(), 'text-center my-8')}>About Us</h1>
      {/* Add your about us content here */}
    </div>
  )
}
