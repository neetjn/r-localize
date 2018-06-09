describe('r-localize localize mixin', function() {

  beforeEach(function() {
    localize = new Localize(riot, MOCK.localize.options, MOCK.localize.localizations)
  })

  // it('will properly change and fetch locale', function() {
  //   expect(localize.locale()).toBe(MOCK.localize.options.default)
  //   localize.locale('es-SP')
  //   expect(localize.locale()).toBe('es-SP')
  // })

  // it('will properly translate items', function() {
  //   expect(localize.translate('header')).toBe(localize.localizations['en-US'].header)
  //   expect(localize.translate('header', 'es-SP')).toBe(localize.localizations['es-SP'].header)
  // })

  // it('will properly provide fallback if translation not found', function() {
  //   expect(localize.translate('impossible')).toBe(localize.options.fallback)
  // })

  // it('logger will properly store logs by type', function() {
  //   expect(localize.$logger).toBeDefined()
  //   expect(localize.options.debug).toBeTruthy()
  //   const message = new Date().getTime()
  //   const types = {
  //     log: 'general',
  //     warn: 'warning',
  //     error: 'critical'
  //   }
  //   for (type in types) {
  //     localize.$logger[type](message)
  //     expect(localize.$logger.$get(types[type]).splice(-1)[0].message).toBe(message)
  //   }
  //   expect(localize.$logger.$get().length).toBe(4)
  // })

})
