# 🦷 Composite

A hybrid client-side/server-side approach to generating dynamic HTML.

Compose your HTML in `<template>` elements. Use placeholders (`${…}`) to mark dynamic content. Call `fill` to generate a new HTML string which interpolates the template's content with given properties.

## Usage

```html
/* rendered somewhere in the DOM */
<template id="hello">
  <h1>${greeting}, ${name}!</h1>
</template>
```

```js
import { fill } from '@domchristie/composite'
const Hello = document.getElementById('hello')
fill(Hello, { greeting: 'Hello', name: 'World' }) // '<h1>Hello, World!</h1>'
```

## Escaping HTML and Unescaping with `raw`

Template placeholders are automatically HTML-escaped to prevent cross-site scripting (XSS) attacks. To output content without escaping, use `raw`:

```html
<template id="hello">
  <h1>${raw(greeting)}, ${name}!</h1>
</template>
```

## License

Copyright © 2024+ Dom Christie and released under the MIT license.
