const Eyebrow = ({ children, light = false, gold = false, center = false, className = '' }) => (
  <div
    className={`flex items-center gap-3 ${center ? 'justify-center' : ''} mb-4 ${className}`}
  >
    <span className={`h-px w-10 ${gold ? 'bg-gold' : light ? 'bg-cream/60' : 'bg-rose-dark'}`} />
    <span
      className={`font-sans text-xs md:text-sm tracking-luxe uppercase ${
        gold ? 'text-gold' : light ? 'text-cream/80' : 'text-mauve'
      }`}
    >
      {children}
    </span>
    {center && (
      <span className={`h-px w-10 ${gold ? 'bg-gold' : light ? 'bg-cream/60' : 'bg-rose-dark'}`} />
    )}
  </div>
)

export default Eyebrow
