'use client'

import { useState, useEffect } from 'react'
import HumblFinanceHeading from '@/components/(landing-page)/HumblFinanceHeading'
import { title } from '@/components/Primitives'

export default function HomePage() {
  const [apiMessage, setApiMessage] = useState('')

  useEffect(() => {
    const fetchApiMessage = async () => {
      try {
        const response = await fetch('/api/python')
        const data = await response.json()
        setApiMessage(data.message)
      } catch (error) {
        console.error('Error fetching API message:', error)
        setApiMessage('Failed to fetch API message')
      }
    }

    fetchApiMessage()
  }, [])

  return (
    <section className="flex flex-col items-center justify-center gap-1">
      <HumblFinanceHeading />
      <br />
      <div className="inline-block w-full text-center">
        <h2 className={title({ size: 'xs' })}>
          a modern investing framework built for everyone
        </h2>
      </div>
      <div className="mt-4">
        <p>API Message: {apiMessage}</p>
      </div>
    </section>
  )
}
