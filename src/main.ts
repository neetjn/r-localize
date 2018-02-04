import { Localize } from './localize'
import { Options } from './types'

export function install (instance : any, options : Options, localizations : object) : void {
  instance.mixin({ localize: new Localize(options, localizations) })
  instance.tag('localize', false, false, false, function (opts : object) {
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
  })
}
