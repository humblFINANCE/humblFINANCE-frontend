import React from 'react'
import type { SVGProps } from 'react'

export function HumblChannelLight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill="none" stroke="black" strokeWidth={1.5}>
        <path strokeLinecap="round" d="M22 3H2m20 18H2" opacity={0.5}></path>
        <path d="M20 12c0-1.886 0-2.828-.586-3.414S17.886 8 16 8H8c-1.886 0-2.828 0-3.414.586S4 10.114 4 12s0 2.828.586 3.414S6.114 16 8 16h8c1.886 0 2.828 0 3.414-.586S20 13.886 20 12Z"></path>
      </g>
    </svg>
  )
}

export function HumblChannelDark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill="none" stroke="white" strokeWidth={1.5}>
        <path strokeLinecap="round" d="M22 3H2m20 18H2" opacity={0.5}></path>
        <path d="M20 12c0-1.886 0-2.828-.586-3.414S17.886 8 16 8H8c-1.886 0-2.828 0-3.414.586S4 10.114 4 12s0 2.828.586 3.414S6.114 16 8 16h8c1.886 0 2.828 0 3.414-.586S20 13.886 20 12Z"></path>
      </g>
    </svg>
  )
}
