import HtmlPage from '../components/HtmlPage.jsx'
import html from '../content/about.html?raw'
import css from '../content/about.css?raw'
import script from '../content/about.script.js.txt?raw'

export default function AboutPage() {
  return <HtmlPage html={html} css={css} script={script} title="About TRISVÉ  | Global Education Consultants" bodyClass="antialiased" />
}
