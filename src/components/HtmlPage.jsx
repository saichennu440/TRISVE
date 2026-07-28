import { useLayoutEffect, useMemo, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet/dist/images/marker-icon.png'
import 'leaflet/dist/images/marker-shadow.png'
export default function HtmlPage({ html, css, script, title, bodyClass = '' }) {
  const [toast, setToast] = useState('')
  const styleId = useMemo(() => `page-style-${title.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`, [title])

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
    document.title = title
    document.documentElement.classList.add('dark')
    const previousClass = document.body.className
    document.body.className = bodyClass

    const style = document.createElement('style')
    style.id = styleId
    style.textContent = css
    document.head.appendChild(style)

    const mapElement = document.getElementById("globalMap");

let map = null;

if (mapElement) {

  map = L.map(mapElement).setView([28, 15], 2);

  L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      attribution: "&copy; OpenStreetMap contributors",
    }
  ).addTo(map);

  const locations = [
    ["USA", 38.8977, -77.0365],
    ["United Kingdom", 51.5072, -0.1276],
    ["Ireland", 53.3498, -6.2603],
    ["Germany", 52.52, 13.405],
    ["France", 48.8566, 2.3522],
    ["Spain", 40.4168, -3.7038],
    ["Italy", 41.9028, 12.4964],
    ["Poland", 52.2297, 21.0122],
    ["Dubai", 25.2048, 55.2708],
    ["Australia", -33.8688, 151.2093],
  ];

  locations.forEach(([name, lat, lng]) => {
    L.marker([lat, lng])
      .addTo(map)
      .bindPopup(`<b>${name}</b>`);
  });

}

    let error = null
    try {
      if (script.trim()) {
        // Source interactions are isolated to the currently mounted route.
        const run = new Function(script)
        run()
        document.dispatchEvent(new Event('DOMContentLoaded'))
      }
    } catch (err) {
      error = err
      console.warn('A source-page interaction could not be initialized:', err)
    }

    return () => {
      if (map) {
    map.remove();
}
      document.getElementById(styleId)?.remove()
      document.body.className = previousClass
      if (error) console.debug(error)
    }
  }, [bodyClass, css, script, styleId, title])

  function handleClick(event) {
    const routeTarget = event.target.closest('[data-route]')
    if (routeTarget?.dataset.route) {
      event.preventDefault()
      window.location.href = routeTarget.dataset.route
    }
  }

  function handleSubmit(event) {
    const form = event.target
    if (!(form instanceof HTMLFormElement)) return
    if (form.id === 'reg-form') {
      event.preventDefault()
      return
    }
    event.preventDefault()
    setToast('Thank you. Your enquiry has been received; the TRISVÉ team can now follow up with you.')
    form.reset()
    window.setTimeout(() => setToast(''), 4500)
  }

  return (
    <>
      <div className="page-shell" onClick={handleClick} onSubmit={handleSubmit} dangerouslySetInnerHTML={{ __html: html }} />
      {toast && <div className="route-toast" role="status">{toast}</div>}
    </>
  )
}
