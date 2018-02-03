import * as Riot from 'riot-typescript'
import { Localize } from './localize'


export class Tag extends Riot.Element {

  private localize : Localize

  constructor (opts) {
    super()
    this.on('mount', this.localization)
    this.localize.on('updated', this.localization)
  }

  localization () {
    if (!this.opts.attr)
      this.root.innerHTML = this.localize.translate(this.opts.item)
    else
      this.root.setAttribute(this.opts.attr, this.localize.translate(this.opts.item))
  }

}
