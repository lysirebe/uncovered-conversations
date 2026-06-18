interface HfImgProps {
  label?: string
  src?: string
  alt?: string
  style?: React.CSSProperties
  fit?: 'cover' | 'contain'
  pos?: string
}

export function HfImg({ label, src, alt, style = {}, fit = 'cover', pos = 'center' }: HfImgProps) {
  if (src) {
    return (
      <div className="hf-img" style={style}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt || label || ''}
          style={{ width: '100%', height: '100%', objectFit: fit, objectPosition: pos, display: 'block', position: 'absolute', inset: 0 }}
        />
      </div>
    )
  }
  return (
    <div className="hf-img" style={style}>
      {label && <span className="tag">{label}</span>}
    </div>
  )
}
