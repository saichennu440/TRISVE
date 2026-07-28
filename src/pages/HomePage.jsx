import HtmlPage from '../components/HtmlPage.jsx'
import html from '../content/home.html?raw'
import css from '../content/home.css?raw'
import script from '../content/home.script.js.txt?raw'

export default function HomePage() {
  return <HtmlPage html={html} css={css} script={script} title="TRISVÉ  | Global Education Consultants" bodyClass="bg-background text-on-background selection:bg-secondary selection:text-on-secondary font-body-md overflow-x-hidden" />
}
