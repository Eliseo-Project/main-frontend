const Flourish = ({ light = false, className = '' }) => {
  const line = light ? 'bg-gold/50' : 'bg-gold'
  const dot = light ? 'text-gold' : 'text-gold'

  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <span className={`h-px w-14 md:w-20 ${line}`} />
      <span className={`text-sm ${dot} rotate-45`}>&#9670;</span>
      <span className={`h-px w-14 md:w-20 ${line}`} />
    </div>
  )
}

export default Flourish
