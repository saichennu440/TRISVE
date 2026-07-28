import { useEffect, useState } from 'react'

const items = [
  ['About', '/about'],
  ['Services', '/services'],
  ['Countries', '/countries'],
  ['Contact', '/contact'],
]

function isActive(path, href) {
  return path === href || (href !== '/' && path.startsWith(href))
}

export default function Navbar({ path }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <header className="site-navbar">
        <div className="site-navbar__inner">
          <a href="/">
          <img className="site-logo" src="/Trisve_Logo.png" alt="Trisve Logo" /></a>
          <nav className="site-navlinks" aria-label="Primary navigation">
            {items.map(([label, href]) => (
              <a key={href} className="site-navlink" href={href} aria-current={isActive(path, href) ? 'page' : undefined}>{label}</a>
            ))}
          </nav>
          <a className="site-cta site-cta--desktop" href="/register">Book Free Session</a>
          <button className="site-menu-btn" type="button" onClick={() => setOpen(v => !v)} aria-expanded={open} aria-label={open ? 'Close navigation' : 'Open navigation'}>
            <span className="material-symbols-outlined" aria-hidden="true">{open ? 'close' : 'menu'}</span>
          </button>
        </div>
      </header>
      {open && (
        <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Mobile navigation">
          <nav className="mobile-menu__links">
            <a href="/" aria-current={path === '/' ? 'page' : undefined}>Home</a>
            {items.map(([label, href]) => (
              <a key={href} href={href} aria-current={isActive(path, href) ? 'page' : undefined}>{label}</a>
            ))}
            <a href="/terms" aria-current={isActive(path, '/terms') ? 'page' : undefined}>Terms</a>
          </nav>
          <a className="site-cta mobile-menu__cta" href="/register">Book Free Session</a>
        </div>
      )}
    </>
  )
}
