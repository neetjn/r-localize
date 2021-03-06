import * as Riot from 'riot-typescript'

import { Options } from './types'
import { Logger } from './logger'
import { Tag } from './localize.tag'

export default class Localize extends Riot.Observable {

  private $logger: Logger
  private options: Options
  private localizations: object
  private _locale: string

  /**
   * Localization mixin for i18n implementation.
   * @param {object} localizations - Dictionary of localizations.
   * @param {Options} options - Options for mixin.
   */
  constructor (instance: any, options: Options, localizations: object) {
    super()
    // # checks necessary for non ts use
    if (!options.default || !options.available)
      throw new Error(
        'Expected options to include a default locale and list of available locales')
    options.available.forEach(locale => {
      const current = typeof locale === 'object' ? locale.locale : locale
      if (!localizations[current])
        throw Error(`Locale "${current}" has no mappings available`)
    })
    // # set defaults
    options.debug = typeof(options.debug) === 'undefined' ? false : options.debug
    options.fallbackContent = options.fallbackContent || false
    options.fallback = options.fallback || '?'
    options.webStore = options.webStore || false
    this.options = options
    this.localizations = localizations
    // # server vs client
    if (this.webStore)
      this._locale = window.localStorage.getItem('localization') || this.options.default
    else
      this._locale = this.options.default

    this.$logger = new Logger(this.options.debug)
    this.$logger.log('Localize mixin instantiated.')

    instance.mixin({ localize: this })
    instance.tag('localize', false, false, false, Tag)
  }

  /**
   * Check whether or not web store is enabled and available.
   * @returns {boolean}
   */
  get webStore () : boolean {
    return this.options.webStore && typeof(window) !== 'undefined'
  }

  /**
   * Get or set current locale.
   * @param {string} locale - Locale to use.
   * @returns {string|void}
   */
  locale (locale = null) : string {
    const self = this
    if (locale) {
      if (!self.options.available.find(l => l === locale || l.locale === locale)) {
        self.$logger.error(`Locale "${ locale }" not recognized.`)
        return
      }
      self.trigger('update')
      if (self.webStore)
        window.localStorage.setItem('localization', locale)
      self._locale = locale
      self.$logger.log(`Locale changed to "${ locale }".`)
      self.trigger('updated')
    }
    return self._locale
  }

  /**
   * Find localized item.
   * @param {string} item - Item key to localize.
   * @param {string} locale - Optional locale, otherwise will use current.
   * @returns {string}
   */
  translate (item: string, locale = null) : string {
    const self = this
    let stub = self.localizations[locale || self._locale]
    if (locale && !self.options.available.find(l => l === locale || l.locale === locale)) {
      self.$logger.error(`Locale "${ locale }" not recognized.`)
      return self.options.fallback
    }
    const branches = item.split('.')
    // # split up to terminate in the event a branch is not found
    for (const b in branches) {
      const branch = branches[b]
      if (stub[branch])
        stub = stub[branch]
        else {
          self.$logger.error(`Provided item "${ item }" could not be localized in locale "${ locale || self._locale }".`)
          return self.options.fallback
        }
    }

    self.$logger.log(`Localized item "${ item }" retrieved for locale "${ locale || self._locale }".`)
    self.trigger('localize', { item, locale: locale || self._locale })
    return stub
  }

}
