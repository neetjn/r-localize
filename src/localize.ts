import { Options } from './types'
import { Logger } from './logger'
import * as Riot from 'riot-typescript'

class Localize extends Riot.Observable {

  private logger: Logger
  private options: Options
  private localizations: object
  private _locale: string

  /**
   * Localization mixin for i18n implementation.
   * @param {object} localizations - Dictionary of localizations.
   * @param {Options} options - Options for mixin.
   */
  constructor (options: Options, localizations: object) {
    super() // # initialize observable
    // # checks necessary for non ts use
    if (!options.default || !options.locales)
      throw new Error(
        'Expected options to include a default locale and list of available locales')
    options.locales.forEach(locale => {
      if (!localizations[locale])
        throw Error(`Locale "${locale}" has no mappings available`)
    })
    // # set defaults
    options.debugging = typeof(options.debugging) == 'undefined' ? false : options.debugging
    options.fallback = options.fallback || '?'
    options.webStore = options.webStore || false
    this.options = options
    this.localizations = localizations
    // # server vs client
    if (this.webStore)
      this._locale = window.localStorage.getItem('localization') || this.options.default
    else
      this.options.default

    this.logger = new Logger(this.options.debugging)
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
   * @returns {string}
   */
  locale (locale = null) : string {
    if (locale) {
      if (this.options.locales.find(l => l == locale))
        throw new Error(`Locale "${ locale }" not recognized`)
      this.trigger('update')
      if (this.webStore)
        window.localStorage.setItem('localization', locale)
      this._locale = locale
      this.trigger('updated')
    }

    return this._locale
  }

  /**
   * Find localized item.
   * @param {string} item - Item key to localize.
   * @param {string} locale - Optional locale, otherwise will use current.
   * @returns {string}
   */
  localize (item: string, locale = null) : string {
    const self = this
    let stub = self.localizations[locale || self._locale]
    if (locale && this.options.locales.find(l => l == locale))
      throw new Error(`Locale "${ locale }" not recognized`)
    item.split('.').forEach(key => {
      if (stub[key])
        stub = stub[key]
      else
        throw new Error(`Provided item "${ item }" could not be localized in locale "${ locale || self._locale }".`)
    })
    self.trigger('localize', { item, locale: locale || self._locale })
    return stub
  }

}
