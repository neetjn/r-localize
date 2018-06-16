const MOCK = {
  localize: {
    options: {
      available: ['en-US', 'es-SP', {
        locale: 'ar-SA',
        'orientation': 'rtl',
        fontFamily: 'Arial, Helvetica, sans-serif'
      }],
      debug: true,
      default: 'en-US',
      fallback: '-'
    },
    localizations: {
      'en-US': {
        'header': 'international',
        'menu': {
          'help': 'Help'
        }
      },
      'es-SP': {
        'header': 'internacional',
        'menu': {
          'help': 'Ayuda'
        }
      },
      'ar-SA': {
        'header': 'ترجمه'
      }
    }
  },
  tags: {
    top: '<h1 data-is="localize" t="header" />',
    deep: '<h1 data-is="localize" t="menu.help" />',
    attribute: '<h1 data-is="localize" t="{{ i: \'header\', attr: \'title\' }}" />',
    change: '<h1 data-is="localize" t="header" />',
    locale: '<h1 data-is="localize" t="{{ i: \'header\', l: \'es-SP\' }}" />',
    fallbackContent: '<h1 data-is="localize" t="impossible">Hello World</h1>',
    options: '<h1 data-is="localize" t="{{ i: \'header\', l: \'ar-SA\' }}" />',
  }
}
