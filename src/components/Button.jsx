import { Link } from 'react-router-dom'

const base =
  'inline-flex items-center justify-center gap-2 px-8 py-3.5 text-xs md:text-sm tracking-luxe uppercase font-sans transition-colors duration-300'

const variants = {
  primary: 'bg-brown text-cream-50 hover:bg-forest',
  outline: 'border border-brown text-brown hover:bg-brown hover:text-cream-50',
  light: 'bg-cream-50 text-brown hover:bg-cream',
  ghost: 'border border-cream-50/70 text-cream-50 hover:bg-cream-50 hover:text-brown',
}

const Button = ({ to, href, onClick, children, variant = 'primary', className = '', type = 'button' }) => {
  const classes = `${base} ${variants[variant]} ${className}`

  const content = <span className="inline-block">{children}</span>

  if (to) {
    return (
      <Link to={to} className={classes}>
        {content}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {content}
    </button>
  )
}

export default Button
