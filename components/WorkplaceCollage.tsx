import type { GalleryItem } from '@/data/cohort'

interface Props { items: GalleryItem[] }

// Collage layout (slot-mapped):
// ┌─────────┬───────┬─────────┐
// │         │  [1]  │         │
// │   [0]   ├───────┤   [3]   │
// │         │  [2]  │         │
// └─────────┴───────┴─────────┘
export function WorkplaceCollage({ items }: Props) {
  const sorted = [...items].sort((a, b) => a.slot - b.slot)

  return (
    <div className="wc-collage">
      {sorted.map((item, i) => (
        <div key={i} className={`wc-tile wc-tile--${item.slot}`}>
          {item.type === 'video' ? (
            <video
              src={item.src}
              autoPlay
              muted
              playsInline
              loop
              className="wc-media"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={item.src} alt="" className="wc-media" />
          )}
        </div>
      ))}
    </div>
  )
}
