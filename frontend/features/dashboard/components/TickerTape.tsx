import { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'

function TickerTape() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const loadWidget = () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
      }

      const script = document.createElement('script')
      script.src =
        'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js'
      script.async = true
      script.innerHTML = JSON.stringify({
        symbols: [
          { description: '', proName: 'NASDAQ:AAPL' },
          { description: '', proName: 'NASDAQ:NVDA' },
          { description: '', proName: 'NASDAQ:TSLA' },
          { description: '', proName: 'NASDAQ:AMZN' },
          { description: '', proName: 'NASDAQ:META' },
          { description: '', proName: 'NASDAQ:MSFT' },
          { description: '', proName: 'NASDAQ:GOOGL' },
          { description: '', proName: 'NASDAQ:AMD' },
          { description: '', proName: 'NYSE:SNAP' },
          { description: '', proName: 'NASDAQ:INTC' },
          { description: '', proName: 'NASDAQ:SMCI' },
          { description: '', proName: 'NYSE:TSM' },
          { description: '', proName: 'NYSE:XOM' },
          { description: '', proName: 'NYSE:DIS' },
          { description: '', proName: 'NASDAQ:PYPL' },
          { description: '', proName: 'NYSE:MMM' },
        ],
        showSymbolLogo: false,
        colorTheme: theme === 'dark' ? 'dark' : 'light',
        isTransparent: false,
        displayMode: 'compact',
        locale: 'en',
      })

      if (containerRef.current) {
        containerRef.current.appendChild(script)
      }
    }

    loadWidget()

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
      }
    }
  }, [theme])

  return (
    <div className="rounded-lg overflow-hidden">
      <div
        className="tradingview-widget-container !rounded-lg !border-none"
        ref={containerRef}
      />
    </div>
  )
}

export default TickerTape
