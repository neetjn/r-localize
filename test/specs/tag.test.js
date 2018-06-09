describe('r-localize localize tag', function() {

  beforeEach(function() {
    localize = new Localize(riot, MOCK.localize.options, MOCK.localize.localizations)
    const context = document.querySelector('tag')
    if (context)
      context._tag.unmount()
    document.body.appendChild(document.createElement('tag'))
  })

  // it('will properly localize top level item', function() {
  //   riot.tag('tag', MOCK.tags.top)
  //   riot.mount('tag')
  //   expect(document.querySelector('h1').textContent).toBe(localize.localizations['en-US'].header)
  // })

  // it('will properly localize multi level items', function() {
  //   riot.tag('tag', MOCK.tags.deep)
  //   riot.mount('tag')
  //   expect(document.querySelector('h1').textContent).toBe(localize.localizations['en-US'].menu.help)
  // })

  // it('will properly localize attributes', function() {
  //   riot.tag('tag', MOCK.tags.attribute)
  //   riot.mount('tag')
  //   expect(document.querySelector('h1').getAttribute('title')).toBe(localize.localizations['en-US'].header)
  // })

  // it('will properly localize items by locale', function() {
  //   riot.tag('tag', MOCK.tags.locale)
  //   riot.mount('tag')
  //   expect(document.querySelector('h1').textContent).toBe(localize.localizations['es-SP'].header)
  // })

  it('will properly update items', function(done) {
    riot.tag('tag', MOCK.tags.change)
    riot.mount('tag')
    localize.locale('es-SP')
    window.setInterval(function() {
      if(document.querySelector('h1').textContent == localize.localizations['es-SP'].header)
        done()
    }, 250)
  })

})
