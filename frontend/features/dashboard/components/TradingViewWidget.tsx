import { useEffect, useRef } from 'react'

function TradingViewWidget() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
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
      colorTheme: 'dark',
      autosize: true,
      borderRadius: 0, // Remove the borderRadius from the widget config
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
      maLineColor: '#2962FF',
      maLineWidth: 1,
      maLength: 9,
      lineWidth: 2,
      lineType: 0,
      dateRanges: ['1d|1', '1m|30', '3m|60', '12m|1D', '60m|1W', 'all|1M'],
      backgroundColor: 'rgba(0, 0, 0, 1)',
    })

    if (containerRef.current) {
      containerRef.current.appendChild(script)
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(script)
      }
    }
  }, [])

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden">
      <div
        className="tradingview-widget-container absolute inset-0"
        ref={containerRef}
      />
    </div>
  )
}

export default TradingViewWidget
