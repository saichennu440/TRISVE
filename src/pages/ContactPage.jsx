import HtmlPage from '../components/HtmlPage.jsx'
import html from '../content/contact.html?raw'
import css from '../content/contact.css?raw'
import script from '../content/contact.script.js.txt?raw'

export default function ContactPage() {
  return <HtmlPage html={html} css={css} script={script} title="Contact | TRISVÉ  Global Education Consultants" bodyClass="bg-background text-on-background font-body-md overflow-x-hidden" />
}
