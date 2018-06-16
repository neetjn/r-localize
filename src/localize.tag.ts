export function Tag (opts : object) {
  const self = this
  self.opts = opts
  function localization () {
    const nodeContent = self.root.textContent || self.root.innerHTML
    // # fetch initial translation
    let translation = typeof self.opts.t == 'string' ? self.localize.translate(
      self.opts.t) : self.localize.translate(self.opts.t.i, self.opts.t.l)
    // # if fallbackContent toggled and translation is the provided fallback, try to use existing node content
    if (this.localize)
      if (this.localize.options.fallbackContent && translation == this.localize.options.fallback)
        translation = nodeContent

    const localeOptions = this.localize.options.available.filter(
      l => typeof l === 'object' && l.locale == this.localize.locale)

    if (localeOptions)
        if (localeOptions.orientation)
          self.root.setAttribute('dir', localeOptions.orientation)
        if (localeOptions.fontFamily)
          self.root.style.fontFamily = localeOptions.fontFamily

    if (typeof self.opts.t == 'string')
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
