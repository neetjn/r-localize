import { Options } from './types'
import * as Riot from 'riot-typescript'

export default class Localize extends Riot.Observable {

  public options: Options
  public localizations: object
  private _locale: string

  /**
   * Localization mixin for i18n implementation.
   * @param {riot} instance - Riot reference.
   * @param {Object} localizations - Dictionary of localizations.
   * @param {Options} options - Options for mixin.
   */
  constructor (options: Options, localizations: object) {
    super()
    this.options = options
    this.localizations = localizations
    if (!this.options.default || !this.options.locales)
      throw new Error(
        'Expected options to include a default locale and list of available locales')
    this.options.fallback = this.options.fallback || '-'
    this._locale = window.localStorage.getItem('localization') || this.options.default
  }

  /**
   * Get or set current locale.
   * @param {String} locale - Locale to use.
   * @returns {String}
   */
  locale (locale = null) {
    if (locale) {
      if (this.options.locales.find(l => l == locale))
        throw new Error(`Locale "${ locale }" not recognized`)
      this.trigger('update')
      window.localStorage.setItem('localization', locale)
      this._locale = locale
      this.trigger('updated')
    }

    return this._locale
  }

  /**
   * Find localized item.
   * @param {String} item - Item key to localize.
   * @param {String} locale - Optional locale, otherwise will use current.
   */
  localize (item: string, locale = null) {
    const self = this
    let stub = self.localizations[locale || self._locale]
    if (locale && this.options.locales.find(l => l == locale))
      throw new Error(`Locale "${ locale }" not recognized`)
    item.split('.').forEach(key => {
      if (stub[key])
        stub = stub[key]
      else
        throw new Error(
          `Provided item "${ item }" could not be localized in locale "${ locale || self._locale }".`)
    })
    self.trigger('localize', { item, locale: locale || self._locale })
    return stub
  }

}
