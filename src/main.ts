import { Localize } from './localize'
import { Options } from './types'
import { Tag } from './localize.tag'

export function install (instance : any, options : Options, localizations : object) : void {
  instance.mixin({ localize: new Localize(options, localizations) })
  instance.tag('localize', false, false, false, Tag)
}
