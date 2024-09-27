'use client'
import { Link } from '@nextui-org/react'

export default function LandingFooter() {
  return (
    <footer className="w-full flex items-center justify-center py-3 mt-auto">
      <Link
        isExternal
        className="flex items-center gap-1 text-current"
        href="https://humblfinance.github.io/humblDATA/"
        title="humblDATA homepage"
      >
        <span className="text-default-600">Powered by</span>
        <p className="text-primary">humblDATA</p>
      </Link>
    </footer>
  )
}
