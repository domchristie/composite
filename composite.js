/**
 * Renders a template with given properties.
 *
 * @param {HTMLTemplateElement|string} template - The HTML template to be rendered.
 * @param {Object} props - An object containing properties to be interpolated into the template.
 * @returns {string} The rendered HTML string with properties interpolated.
 */
export function fill (template, props) {
  template = template instanceof HTMLElement
      ? unescape(template.innerHTML)
      : String(template)
  return (new Function(...Object.keys(exports), ...Object.keys(props),
    `return html\`${template}\``
  ))(...Object.values(exports), ...Object.values(props))
}

/**
 * A tag function for template literals that escapes HTML special characters in
 * values unless they are marked as raw.
 *
 * @param {TemplateStringsArray} strings - An array of string literals.
 * @param {...any} values - The values to be interpolated into the template.
 * @returns {string} The final string with values safely interpolated.
 */
export function html (strings, ...values) {
  return strings.reduce((result, string, i) => {
    const value = values[i] != null
      ? values[i].raw ? values[i] : escape(values[i])
      : ''
    return result + string + value
  }, '')
}

/**
 * Escapes special characters in a string for use in HTML.
 * The characters escaped are: & < > " ' ` = /
 *
 * @param {string} string - The input string to escape.
 * @returns {string} - The escaped string.
 */
export function escape (string) {
  return String(string).replace(/[&<>"'`=\/]/g, (s) => entities[s])
}
const entities = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;'
}

/**
 * Unescapes a given HTML-encoded string.
 *
 * @param {string} string - The HTML-encoded string to unescape.
 * @returns {string} - The unescaped string.
 */
export function unescape (string) {
  textarea = textarea || document.createElement('textarea')
  textarea.innerHTML = string
  return textarea.value
}
let textarea

/**
 * Marks a string as raw HTML to prevent escaping of special characters.
 *
 * @param {string} html - The HTML string to wrap.
 * @returns {RawString} - The wrapped HTML string as a RawString object.
 */
export function raw (html) {
  return new RawString(html)
}

class RawString extends String { raw = true }

const exports = { fill, html, escape, unescape, raw }
