import { Fragment } from 'react'

interface MarqueeProps {
  items?: string[]
  repeat?: number
}

export function Marquee({ items = ['OPPORTUNITIES', 'RESOURCES', 'COLLABORATION'], repeat = 3 }: MarqueeProps) {
  return (
    <div className="hf-marquee">
      <div className="mq-track">
        {Array.from({ length: repeat }).map((_, k) => (
          <div className="item" key={k}>
            {items.map((it, i) => (
              <Fragment key={i}>
                <span>{it}</span>
                <span className="star">/</span>
              </Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
