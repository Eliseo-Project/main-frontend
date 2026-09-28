import { useRef } from 'react'
import { useTilt } from '../lib/useTilt'

// Wraps a photo and its offset decorative border so the two read as
// separate depth layers: the frame drifts further than the photo as the
// cursor moves across it, the classic parallax-layer illusion.
const DepthFrame = ({ frameClassName, className = '', children }) => {
  const ref = useRef(null)
  useTilt(ref)

  return (
    <div ref={ref} className={`relative ${className}`}>
      <div
        className={frameClassName}
        style={{
          transform:
            'translate(calc(var(--mx, 0) * 14px), calc(var(--my, 0) * 14px))',
        }}
      />
      {children}
    </div>
  )
}

export default DepthFrame
