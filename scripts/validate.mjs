import fs from 'node:fs'
import path from 'node:path'

const required = [
  'index.html', 'package.json', 'vite.config.js', 'tailwind.config.cjs',
  'src/main.jsx', 'src/App.jsx', 'src/index.css',
  'src/components/Navbar.jsx', 'src/components/HtmlPage.jsx',
  'src/pages/HomePage.jsx', 'src/pages/AboutPage.jsx', 'src/pages/ServicesPage.jsx',
  'src/pages/CountriesPage.jsx', 'src/pages/ContactPage.jsx',
  'src/pages/RegistrationPage.jsx', 'src/pages/TermsPage.jsx',
]

for (const file of required) {
  if (!fs.existsSync(path.resolve(file))) throw new Error(`Missing required file: ${file}`)
}

const slugs = ['home', 'about', 'services', 'countries', 'contact', 'registration', 'terms']
for (const slug of slugs) {
  for (const extension of ['html', 'css', 'script.js.txt']) {
    const file = path.resolve(`src/content/${slug}.${extension}`)
    if (!fs.existsSync(file) || fs.statSync(file).size === 0) {
      throw new Error(`Missing or empty page asset: ${file}`)
    }
  }
}

JSON.parse(fs.readFileSync('package.json', 'utf8'))
console.log('TRISVÉ project validation passed: 7 routes and all required assets are present.')
