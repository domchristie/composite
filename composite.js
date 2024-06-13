/**
 * Renders a template with given properties.
 *
 * @param {HTMLTemplateElement|string} template - The HTML template to be rendered.
 * @param {Object} props - An object containing properties to be interpolated into the template.
 * @returns {string} The rendered HTML string with properties interpolated.
 */
export function fill (template, props) {
  template = template instanceof HTMLElement
      ? template.innerHTML
      : String(template)
  return (new Function('html', 'raw', ...Object.keys(props),
    `return html\`${template}\``
  ))(html, raw, ...Object.values(props))
}

/**
 * A tag function for template literals that escapes HTML special characters in
 * values unless they are marked as raw.
 *
 * @param {TemplateStringsArray} strings - An array of string literals.
 * @param {...any} values - The values to be interpolated into the template.
 * @returns {string} The final string with values safely interpolated.
 */
function html (strings, ...values) {
  return strings.reduce((result, string, i) => {
    const value = values[i]
      ? values[i].raw ? values[i] : escape(values[i])
      : ''
    return result + string + value
  }, '')
}

function escape (string) {
  const div = document.createElement('div')
  div.appendChild(document.createTextNode(string))
  return div.innerHTML
}

function raw (html) {
  return new RawString(html)
}

class RawString extends String { raw = true }
