import createDOMPurify from 'dompurify'
import { JSDOM } from 'jsdom'
import { marked } from 'marked'

marked.setOptions({
  breaks: true,
  gfm: true,
  smartypants: true,
  tables: false,
})

const window = new JSDOM('').window
const DOMPurify = createDOMPurify(window)

export function renderMarkdown(str) {
  return DOMPurify.sanitize(marked.parse(str))
}
