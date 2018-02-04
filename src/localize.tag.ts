export function Tag (opts : object) {
  const self = this
  self.opts = opts
  function localization () {
    if (!self.opts.attr)
      self.root.innerHTML = self.localize.translate(self.opts.item)
    else
      self.root.setAttribute(self.opts.attr, self.localize.translate(self.opts.item))
  }
  self.on('mount', localization)
  self.localize.on('updated', localization)
}
