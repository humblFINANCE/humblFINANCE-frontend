import React from 'react'
import type { SVGProps } from 'react'

export function StockDataChart(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill="none" fillRule="evenodd">
        <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
        <path
          fill="black"
          d="M8 2a1 1 0 0 1 .993.883L9 3v2a3 3 0 0 1 2.995 2.824L12 8v6a3 3 0 0 1-2.824 2.995L9 17v4a1 1 0 0 1-1.993.117L7 21v-4a3 3 0 0 1-2.995-2.824L4 14V8a3 3 0 0 1 2.824-2.995L7 5V3a1 1 0 0 1 1-1m9 0a1 1 0 0 1 .993.883L18 3v4a3 3 0 0 1 2.995 2.824L21 10v6a3 3 0 0 1-2.824 2.995L18 19v2a1 1 0 0 1-1.993.117L16 21v-2a3 3 0 0 1-2.995-2.824L13 16v-6a3 3 0 0 1 2.824-2.995L16 7V3a1 1 0 0 1 1-1m1 7h-2a1 1 0 0 0-.993.883L15 10v6a1 1 0 0 0 .883.993L16 17h2a1 1 0 0 0 .993-.883L19 16v-6a1 1 0 0 0-.883-.993zM9 7H7a1 1 0 0 0-.993.883L6 8v6a1 1 0 0 0 .883.993L7 15h2a1 1 0 0 0 .993-.883L10 14V8a1 1 0 0 0-.883-.993z"
        ></path>
      </g>
    </svg>
  )
}
