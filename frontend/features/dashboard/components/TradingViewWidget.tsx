import { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'

function TradingViewWidget() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const loadWidget = () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
      }

      const script = document.createElement('script')
      script.src =
        'https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js'
      script.async = true
      script.innerHTML = JSON.stringify({
        symbols: [
          ['S&P500', 'SPY|1D'],
          ['Russell 2000', 'IWM|1D'],
          ['Dow Jones', 'DIA|1D'],
          ['NASDAQ 100', 'QQQ|1D'],
        ],
        chartOnly: false,
        width: '100%',
        height: '100%',
        locale: 'en',
        colorTheme: theme === 'dark' ? 'dark' : 'light',
        autosize: true,
        showVolume: false,
        showMA: false,
        hideDateRanges: false,
        hideMarketStatus: false,
        hideSymbolLogo: false,
        scalePosition: 'right',
        scaleMode: 'Normal',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif',
        fontSize: '10',
        noTimeScale: false,
        valuesTracking: '1',
        changeMode: 'price-and-percent',
        chartType: 'area',
        lineWidth: 2,
        lineType: 0,
        dateRanges: ['1d|1', '1m|30', '3m|60', '12m|1D', '60m|1W', 'all|1M'],
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
    <div
      className="relative w-full h-full rounded-lg overflow-hidden"
      style={{ maxHeight: '350px' }}
    >
      <div
        className="tradingview-widget-container absolute inset-0"
        ref={containerRef}
      />
    </div>
  )
}

export default TradingViewWidget
