import HtmlPage from '../components/HtmlPage.jsx'
import html from '../content/terms.html?raw'
import css from '../content/terms.css?raw'
import script from '../content/terms.script.js.txt?raw'

export default function TermsPage() {
  return <HtmlPage html={html} css={css} script={script} title="Terms & Conditions | TRISVÉ " bodyClass="font-body-md text-on-background selection:bg-secondary selection:text-on-secondary" />
}
