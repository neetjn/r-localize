# **r-localize**

[![build](https://travis-ci.org/neetjn/r-localize.svg?branch=master)](https://travis-ci.org/neetjn/r-localize/)
[![npm version](https://badge.fury.io/js/r-localize.svg)](https://badge.fury.io/js/r-localize)
[![npm](https://img.shields.io/npm/dm/r-localize.svg)](https://www.npmjs.com/package/r-localize)

[![NPM](https://nodei.co/npm/r-localize.png)](https://nodei.co/npm/r-localize/)

### About

**r-localize** is a localization plugin for Riot.js based off of Vue.js v-localize project.

### Support

| Chome  | Edge | Firefox | Opera    | Safari |
|--------|------|---------|----------|--------|
| 5.0+ ✔ |  ✔   | 4.0+ ✔  | 11.50+ ✔ | 5.0+ ✔ |

This project was developed using Riot.js 3, support for previous versions is not available.

### Usage

To install via NPM, simply do the following:
```sh
npm install r-localize
```
For a quick start using jsdelivr:
```html
<script src="https://cdn.jsdelivr.net/npm/r-localize/dist/r-localize.js"></script>
```
Using the plugin is then as simple as:

```js
import riot from 'riot'
import Localize from 'r-localize'

const options = {
  debug: true,
  default: 'en-US',
  fallback: '-',  
  available: ['en-US', 'es-SP']
}

const localizations = {
  'en-US': {
    'header': 'international',
    'menu': {
      'help': 'Help'
    }
  },
  'es-SP': {
    'header': 'internacional',
    'menu': {
      'help': 'Ayuda'
    }
  }
}

localize = new Localize(riot, options, localizations)
```

Once your Riot app has been mounted, the language can be changed by calling `localize.locale(args*)` from your component.

```html
<component>
  <select change={ locale }>
    <option value="en-US">English</option>
    <option value="es-SP">Spanish</option>
  </select>
  <script>
    locale(e) {
      this.localize.locale(e.target.value)
    }
  </script>
</component>
```

You can specify your localizations like so:

```html
<!-- add a localized title to this element targeting en-US -->
<h1 data-is="localize" t={{ i: 'header', attr: 'title' }} />
<!-- replace this element's text with localized item -->
<h1 data-is="localize" t="menu.help">
```

Alternatively, you can fetch your current localization by calling `locale` without any arguments.

```html
<h1>Current Locale: { localize.locale() }</h1>
```

For fetching a specific locale item programatically within a component method:

```js
<h1>Translated Item: { localize.translate('header', 'es-SP') }</h1>
```

### Configuration

The plugin takes 5 options,

> **`*available`**: List of available localizations.

> **`*debug`**: Spit info, warnings and errors to console.

> **`*default`**: Default locale key to target.

> **`*fallback`**: Default text to show if localization for current language not found.

> **`webStore`**: If the mixin is accessed within a web context and option `webStore` is enabled, mixin will store the locale in local storage for the next visit.

### Contributors

* **John Nolette** (john@neetgroup.net)

Contributing guidelines can be found [here](https://github.com/neetjn/r-localize/blob/master/CONTRIBUTING.md).

---

Copyright (c) 2017 John Nolette Licensed under the MIT license.
