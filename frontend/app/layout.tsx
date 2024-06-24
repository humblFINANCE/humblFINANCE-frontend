'use client'
import { Tooltip } from '@nextui-org/react'
import { Button } from '@nextui-org/react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Tooltip content="I am a tooltip">
          <Button>Hover me</Button>
        </Tooltip>
      </body>
    </html>
  )
}
