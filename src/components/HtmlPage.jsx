// #Htmlpage.jsx
import { useLayoutEffect, useMemo, useState } from 'react'

import * as maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

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

const mapElement = document.querySelector("#globalMap");
let map = null;

if (mapElement) {

    map = new maplibregl.Map({

        container: mapElement,


        style: "https://api.maptiler.com/maps/dataviz-dark/style.json?key=8lgb8aINX1ww91syPCpP",
        
        center: [20, 28],

        zoom: 1.4,

        attributionControl: false

    });

  map.dragRotate.disable();
map.touchZoomRotate.disableRotation();
map.scrollZoom.disable();
map.doubleClickZoom.disable();


    const countries = [

        {
            name: "United States",
            lng: -98.5795,
            lat: 39.8283
        },

        {
            name: "United Kingdom",
            lng: -0.1276,
            lat: 51.5072
        },

        {
            name: "Ireland",
            lng: -6.2603,
            lat: 53.3498
        },

        {
            name: "Germany",
            lng: 13.4050,
            lat: 52.5200
        },

        {
            name: "France",
            lng: 2.3522,
            lat: 48.8566
        },

        {
            name: "Spain",
            lng: -3.7038,
            lat: 40.4168
        },

        {
            name: "Italy",
            lng: 12.4964,
            lat: 41.9028
        },

        {
            name: "Poland",
            lng: 21.0122,
            lat: 52.2297
        },

        {
            name: "Dubai",
            lng: 55.2708,
            lat: 25.2048
        },

        {
            name: "Australia",
            lng: 151.2093,
            lat: -33.8688
        }

    ];

    countries.forEach(country => {

        const marker = document.createElement("div");

        marker.style.width = "16px";
        marker.style.height = "16px";
        marker.style.borderRadius = "50%";
        marker.style.background = "#f5bd5c";
        marker.style.border = "4px solid rgba(245,189,92,.35)";
        marker.style.boxShadow = "0 0 18px rgba(245,189,92,.7)";
        marker.style.cursor = "pointer";

        new maplibregl.Marker(marker)
            .setLngLat([country.lng, country.lat])
            .setPopup(
                new maplibregl.Popup({
                    offset: 20
                }).setHTML(`
                    <div style="
                        background:#131315;
                        color:white;
                        padding:4px;
                        min-width:170px;
                    ">
                        <strong style="
                            color:#f5bd5c;
                            font-size:16px;
                        ">
                            ${country.name}
                        </strong>
                        <br>
                        <span style="
                            color:#b8b8b8;
                            font-size:13px;
                        ">
                            Study Destination
                        </span>
                    </div>
                `)
            )
            .addTo(map);

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
    map = null;
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
