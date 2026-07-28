import HtmlPage from '../components/HtmlPage.jsx'
import html from '../content/registration.html?raw'
import css from '../content/registration.css?raw'
import script from '../content/registration.script.js.txt?raw'

export default function RegistrationPage() {
  return <HtmlPage html={html} css={css} script={script} title="Register | TRISVÉ  Global Education" bodyClass="bg-background text-on-background font-body-md overflow-x-hidden selection:bg-secondary selection:text-on-secondary" />
}
