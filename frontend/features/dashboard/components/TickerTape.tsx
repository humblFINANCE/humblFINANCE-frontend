import { useEffect, useRef } from 'react';

function TickerTape() {
    const containerRef: any = useRef(null);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
        script.async = true;
        script.innerHTML = JSON.stringify({
            symbols: [
                { description: "", proName: "TURQUOISE:SHELL" },
                { description: "", proName: "TURQUOISE:BARCL" },
                { description: "", proName: "TURQUOISE:RRL" },
                { description: "", proName: "TURQUOISE:BPL" },
                { description: "", proName: "TURQUOISE:BTL" },
                { description: "", proName: "TURQUOISE:TSCOL" },
                { description: "", proName: "TURQUOISE:BATSL" },
                { description: "", proName: "TURQUOISE:ULVRL" }
            ],
            showSymbolLogo: false,
            colorTheme: "dark",
            isTransparent: false,
            displayMode: "compact",
            locale: "en"
        });

        if (containerRef.current) {
            containerRef.current.appendChild(script);
        }

        return () => {
            if (containerRef.current) {
                containerRef.current.removeChild(script);
            }
        };
    }, []);

    return (
        <div className="tradingview-widget-container" ref={containerRef} />
    );
}

export default TickerTape;
