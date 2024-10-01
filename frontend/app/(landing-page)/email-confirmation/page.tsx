'use client'

import { useCallback, useEffect } from 'react'
import confetti from 'canvas-confetti'

export default function EmailConfirmationPage() {
  const fireConfetti = useCallback(() => {
    const duration = 5 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min

    const interval: NodeJS.Timeout = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    }, 250)
  }, [])

  // Fire confetti on initial page load
  useEffect(() => {
    fireConfetti()
  }, [fireConfetti])

  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-24">
      <h1
        className="text-6xl font-bold mb-6 cursor-default transition-colors duration-300 text-hfinance-gradient leading-tight"
        onMouseEnter={fireConfetti}
      >
        Congratulations!
      </h1>
      <h3 className="text-2xl font-thin mb-8 text-center text-hfinance-gradient">
        We appreciate you joining! Let&apos;s build the path towards financial
        freedom together.
      </h3>
      <div className="mt-8 p-6 bg-purple-400/20 dark:bg-purple-400/20 rounded-lg shadow-md">
        <p className="text-xl text-gray-800 dark:text-gray-200 text-center max-w-md">
          Please check your email to find the link to confirm your email.
        </p>
      </div>
    </div>
  )
}
