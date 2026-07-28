import HtmlPage from '../components/HtmlPage.jsx'
import html from '../content/countries.html?raw'
import css from '../content/countries.css?raw'
import script from '../content/countries.script.js.txt?raw'

export default function CountriesPage() {
  return <HtmlPage html={html} css={css} script={script} title="TRISVÉ  | Global Destinations" bodyClass="selection:bg-secondary selection:text-on-secondary" />
}
