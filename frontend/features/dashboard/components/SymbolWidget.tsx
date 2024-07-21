"use client";

import {useLayoutEffect, useRef} from 'react';

function SymbolWidget() {
    const container: any = useRef(null);
    const container2nd: any = useRef(null);

    // TODO there is unknown bug (?) why this component loaded twice and make the dashboard UI double rendered :(

    useLayoutEffect(() => {
        let isMounted = true;

        if (isMounted) {
            const script = document.createElement("script");
            script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
            script.type = "text/javascript";
            script.async = true;

            const script2nd = document.createElement("script");
            script2nd.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
            script2nd.type = "text/javascript";
            script2nd.async = true;

            script.innerHTML = `
      {
        "symbols": [
          [
            "Apple",
            "AAPL|1D"
          ],
          [
            "Google",
            "GOOGL|1D"
          ],
          [
            "Microsoft",
            "MSFT|1D"
          ]
        ],
        "chartOnly": false,
        "width": "100%",
        "height": "100%",
        "locale": "en",
        "colorTheme": "dark",
        "autosize": true,
        "showVolume": false,
        "showMA": false,
        "hideDateRanges": false,
        "hideMarketStatus": false,
        "hideSymbolLogo": false,
        "scalePosition": "right",
        "scaleMode": "Normal",
        "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
        "fontSize": "10",
        "noTimeScale": false,
        "valuesTracking": "1",
        "changeMode": "price-and-percent",
        "chartType": "area",
        "maLineColor": "#2962FF",
        "maLineWidth": 1,
        "maLength": 9,
        "lineWidth": 2,
        "lineType": 0,
        "dateRanges": [
          "1d|1",
          "1m|30",
          "3m|60",
          "12m|1D",
          "60m|1W",
          "all|1M"
        ]
      }`;
            container.current.appendChild(script);

            script2nd.innerHTML = `
      {
            "symbols": [
              {
                "description": "",
                "proName": "TURQUOISE:SHELL"
              },
              {
                "description": "",
                "proName": "TURQUOISE:BARCL"
              },
              {
                "description": "",
                "proName": "TURQUOISE:RRL"
              },
              {
                "description": "",
                "proName": "TURQUOISE:BPL"
              },
              {
                "description": "",
                "proName": "TURQUOISE:BTL"
              },
              {
                "description": "",
                "proName": "TURQUOISE:TSCOL"
              },
              {
                "description": "",
                "proName": "TURQUOISE:BATSL"
              },
              {
                "description": "",
                "proName": "TURQUOISE:ULVRL"
              }
            ],
            "showSymbolLogo": true,
            "colorTheme": "dark",
            "isTransparent": false,
            "displayMode": "regular",
            "locale": "en"
          }`;
            container2nd.current.appendChild(script2nd);
        }

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <>
            <div className="tradingview-widget-container" ref={container2nd}>
                <div className="tradingview-widget-container__widget"></div>
                <div className="tradingview-widget-copyright">
                    <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
                        <span className="blue-text">Ticker Tape at the top</span>
                    </a>
                </div>
            </div>


            <div className="tradingview-widget-container" ref={container}>
                <div className="tradingview-widget-container__widget"></div>
                <div className="tradingview-widget-copyright">
                    <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
                        <span className="blue-text">TradingView Widget for SPX</span>
                    </a>
                </div>
            </div>
        </>
    );
}

export default SymbolWidget;