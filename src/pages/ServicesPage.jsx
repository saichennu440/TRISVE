import HtmlPage from '../components/HtmlPage.jsx'
import html from '../content/services.html?raw'
import css from '../content/services.css?raw'
import script from '../content/services.script.js.txt?raw'

export default function ServicesPage() {
  return <HtmlPage html={html} css={css} script={script} title="Services | TRISVÉ  Global Education Consultants" bodyClass="bg-background text-on-background font-body-md overflow-x-hidden" />
}
