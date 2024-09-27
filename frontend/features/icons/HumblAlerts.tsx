import React from 'react'
import type { SVGProps } from 'react'

export function HumblAlertsLight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill="none" stroke="black" strokeWidth={1.5}>
        <path d="M18.75 9.71v-.705C18.75 5.136 15.726 2 12 2S5.25 5.136 5.25 9.005v.705a4.4 4.4 0 0 1-.692 2.375L3.45 13.81c-1.011 1.575-.239 3.716 1.52 4.214a25.8 25.8 0 0 0 14.06 0c1.759-.498 2.531-2.639 1.52-4.213l-1.108-1.725a4.4 4.4 0 0 1-.693-2.375Z"></path>
        <path
          strokeLinecap="round"
          d="M7.5 19c.655 1.748 2.422 3 4.5 3s3.845-1.252 4.5-3"
          opacity={0.5}
        ></path>
      </g>
    </svg>
  )
}

export function HumblAlertsDark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill="none" stroke="white" strokeWidth={1.5}>
        <path d="M18.75 9.71v-.705C18.75 5.136 15.726 2 12 2S5.25 5.136 5.25 9.005v.705a4.4 4.4 0 0 1-.692 2.375L3.45 13.81c-1.011 1.575-.239 3.716 1.52 4.214a25.8 25.8 0 0 0 14.06 0c1.759-.498 2.531-2.639 1.52-4.213l-1.108-1.725a4.4 4.4 0 0 1-.693-2.375Z"></path>
        <path
          strokeLinecap="round"
          d="M7.5 19c.655 1.748 2.422 3 4.5 3s3.845-1.252 4.5-3"
          opacity={0.5}
        ></path>
      </g>
    </svg>
  )
}
