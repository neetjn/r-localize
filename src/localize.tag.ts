export function Tag (opts : object) {
  const self = this
  self.opts = opts
  function localization () {
    const nodeContent = self.root.textContent || self.root.innerHTML
    // # fetch initial translation
    let translation = typeof self.opts.t === 'string' ? self.localize.translate(
      self.opts.t) : self.localize.translate(self.opts.t.i, self.opts.t.l)
    // # if fallbackContent toggled and translation is the provided fallback, try to use existing node content
    if (self.localize)
      if (self.localize.options.fallbackContent && translation === self.localize.options.fallback)
        translation = nodeContent
    // # scrape locale options
    const locale = self.localize.locale()
    const localeOptions = self.localize.options.available.find(
      l => typeof l === 'object' && l.locale === locale)

    if (localeOptions)
      if (localeOptions.orientation)
        self.root.setAttribute('dir', localeOptions.orientation)
      if (localeOptions.fontFamily)
        self.root.style.fontFamily = localeOptions.fontFamily

    if (typeof self.opts.t === 'string')
      self.root.innerHTML = translation
    else
      if (!self.opts.t.attr)
        self.root.innerHTML = translation
      else
        self.root.setAttribute(self.opts.t.attr, translation)
  }
  self.on('mount', localization)
  self.localize.on('updated', localization)
}
