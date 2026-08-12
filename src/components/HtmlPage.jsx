import { useLayoutEffect, useMemo, useState } from 'react'

export default function HtmlPage({
  html,
  css,
  script,
  title,
  bodyClass = ''
}) {
  const [toast, setToast] = useState('')
  const [showFloatingCta, setShowFloatingCta] = useState(true)

  const styleId = useMemo(
    () =>
      `page-style-${title
        .replace(/[^a-z0-9]+/gi, '-')
        .toLowerCase()}`,
    [title]
  )

  useLayoutEffect(() => {
    window.scrollTo(0, 0)

    document.title = title

    document.documentElement.classList.add('dark')

    const previousClass = document.body.className
    document.body.className = bodyClass

    /* ---------------------------------------------
       Inject page-specific CSS
    --------------------------------------------- */

    const style = document.createElement('style')

    style.id = styleId
    style.textContent = css

    document.head.appendChild(style)

    /* ---------------------------------------------
       Floating CTA
       
       Home page:
       Hidden while hero is visible.
       Appears after hero section.
       
       Other pages:
       Always visible.
    --------------------------------------------- */

    const isHomePage =
      window.location.pathname === '/' ||
      window.location.pathname === ''

    let observer = null

    if (isHomePage) {
      setShowFloatingCta(false)

      /*
       * Add id="home-hero" to your homepage hero section.
       *
       * Example:
       * <section id="home-hero" ...>
       */

      const hero = document.getElementById('home-hero')

      if (hero) {
        observer = new IntersectionObserver(
          ([entry]) => {
            /*
             * When hero is visible:
             * hide CTA
             *
             * When hero leaves viewport:
             * show CTA
             */
            setShowFloatingCta(!entry.isIntersecting)
          },
          {
            threshold: 0.05
          }
        )

        observer.observe(hero)
      } else {
        /*
         * Fallback:
         * If hero ID isn't found, show the CTA.
         */
        setShowFloatingCta(true)
      }
    } else {
      /*
       * All other pages:
       * CTA is always visible.
       */
      setShowFloatingCta(true)
    }

    /* ---------------------------------------------
       Run page-specific JavaScript
    --------------------------------------------- */

    let error = null

    try {
      if (script.trim()) {
        const run = new Function(script)

        run()

        document.dispatchEvent(
          new Event('DOMContentLoaded')
        )
      }
    } catch (err) {
      error = err

      console.warn(
        'A source-page interaction could not be initialized:',
        err
      )
    }

    /* ---------------------------------------------
       Cleanup
    --------------------------------------------- */

    return () => {
      if (observer) {
        observer.disconnect()
      }

      document.getElementById(styleId)?.remove()

      document.body.className = previousClass

      if (error) {
        console.debug(error)
      }
    }
  }, [
    bodyClass,
    css,
    script,
    styleId,
    title
  ])

  /* ---------------------------------------------
     Route handling
  --------------------------------------------- */

  function handleClick(event) {
    const routeTarget =
      event.target.closest('[data-route]')

    if (routeTarget?.dataset.route) {
      event.preventDefault()

      window.location.href =
        routeTarget.dataset.route
    }
  }

  /* ---------------------------------------------
     Form handling
  --------------------------------------------- */

  function handleSubmit(event) {
    const form = event.target

    if (!(form instanceof HTMLFormElement)) {
      return
    }

    if (form.id === 'reg-form') {
      event.preventDefault()
      return
    }

    event.preventDefault()

    setToast(
      'Thank you. Your enquiry has been received; the TRISVÉ team can now follow up with you.'
    )

    form.reset()

    window.setTimeout(() => {
      setToast('')
    }, 4500)
  }

  return (
    <>
      {/* -----------------------------------------
          PAGE CONTENT
      ----------------------------------------- */}

      <div
        className="page-shell"
        onClick={handleClick}
        onSubmit={handleSubmit}
        dangerouslySetInnerHTML={{
          __html: html
        }}
      />

      {/* -----------------------------------------
          Floating Book Session CTA
      ----------------------------------------- */}

{showFloatingCta && (
  <a
    href="/register"
    className="floating-session-cta"
    aria-label="Book your first session"
  >
    {/* Notification message */}
    <span className="floating-session-message">
      Book your first session
    </span>

    {/* Notification badge */}
    <span
      className="floating-session-badge"
      aria-hidden="true"
    >
      !
    </span>

    {/* WhatsApp icon */}
    <span
      className="floating-session-icon"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
      >
        <path d="M21.11 17.42c-.27-.14-1.59-.78-1.84-.87-.25-.09-.43-.14-.61.14-.18.27-.7.87-.86 1.05-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.58-1.5-1.85-.16-.27-.02-.42.12-.56.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.26s.98 2.62 1.11 2.8c.14.18 1.93 2.95 4.68 4.13.65.28 1.16.45 1.56.58.66.21 1.26.18 1.73.11.53-.08 1.59-.65 1.81-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.32z" />

        <path d="M16.03 3C8.84 3 3 8.84 3 16.03c0 2.29.6 4.53 1.74 6.5L3 29l6.63-1.71a13 13 0 0 0 6.4 1.64h.01c7.18 0 13.02-5.84 13.02-13.02C29.06 8.84 23.22 3 16.03 3zm0 23.77h-.01a10.77 10.77 0 0 1-5.49-1.5l-.39-.23-3.93 1.02 1.05-3.83-.25-.4a10.74 10.74 0 1 1 9.02 4.94z" />
      </svg>
    </span>
  </a>
)}

      {/* -----------------------------------------
          Toast
      ----------------------------------------- */}

      {toast && (
        <div
          className="route-toast"
          role="status"
        >
          {toast}
        </div>
      )}
    </>
  )
}