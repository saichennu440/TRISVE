import HomePage from './pages/HomePage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ServicesPage from './pages/ServicesPage.jsx'
import CountriesPage from './pages/CountriesPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import RegistrationPage from './pages/RegistrationPage.jsx'
import TermsPage from './pages/TermsPage.jsx'


import Navbar from './components/Navbar.jsx'

function normalizePath(pathname) {
  const clean = pathname.replace(/\/+$/, '') || '/'
  if (clean === '/registration') return '/register'
  if (clean === '/terms-and-conditions') return '/terms'
  return clean
}

export default function App() {
  const path = normalizePath(window.location.pathname)
  let Page
  if (path === "/") Page = HomePage
  if (path === "/about") Page = AboutPage
  if (path === "/services") Page = ServicesPage
  if (path === "/countries") Page = CountriesPage
  if (path === "/contact") Page = ContactPage
  if (path === "/register") Page = RegistrationPage
  if (path === "/terms") Page = TermsPage

  if (!Page) Page = HomePage

  return (
    <>
      <Navbar path={path} />
      <Page />
    </>
  )
}
