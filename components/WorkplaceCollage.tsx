import type { GalleryItem } from '@/data/cohort'

interface Props {
  items: GalleryItem[]
}

// Static mixed-size collage. Videos autoplay muted + looping.
export function WorkplaceCollage({ items }: Props) {
  return (
    <div className="wc-collage">
      {items.map((item, i) => (
        <div key={i} className={`wc-tile wc-tile--${i}`}>
          {item.type === 'video' ? (
            <video
              src={item.src}
              autoPlay
              muted
              playsInline
              loop
              className="wc-media"
              aria-label={item.caption}
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={item.src} alt={item.caption} className="wc-media" />
          )}
        </div>
      ))}
    </div>
  )
}
