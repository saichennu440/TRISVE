# TRISVÉ React Website

A responsive Vite + React conversion of the supplied TRISVÉ HTML pages.

## Included routes

- `/` — Home
- `/about` — About
- `/services` — Services
- `/countries` — Countries
- `/contact` — Contact
- `/register` — Student registration wizard
- `/terms` — Terms and conditions

## Run locally

```bash
npm install
npm run dev
```

Open the local address shown by Vite (normally `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

## Notes

- The site uses a shared responsive navigation header with a full-screen mobile menu.
- All seven supplied pages and their source interactions are retained.
- Images and Google Fonts in the original designs are remotely hosted, so internet access is needed for those assets.
- Contact-form submission is demonstrated locally with an on-screen success message. Connect it to your preferred backend or CRM before production deployment.
