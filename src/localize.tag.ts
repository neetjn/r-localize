export function Tag (opts : object) {
  const self = this
  self.opts = opts
  function localization () {
    if (typeof self.opts.t == 'string')
      self.root.innerHTML = self.localize.translate(self.opts.t)
    else
      if (!self.opts.t.attr)
        self.root.innerHTML = self.localize.translate(self.opts.t.i, self.opts.t.l)
      else
        self.root.setAttribute(
          self.opts.t.attr, self.localize.translate(self.opts.t.i, self.opts.t.l))
  }
  self.on('mount', localization)
  self.localize.on('updated', localization)
}
