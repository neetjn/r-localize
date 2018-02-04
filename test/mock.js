const MOCK = {
  localize: {
    options: {
      available: ['en-US', 'es-SP'],
      debugging: true,
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
      }
    }
  },
  tags: {
    top: '<h1 data-is="localize" item="header" />',
    deep: '<h1 data-is="localize" item="menu.help" />',
    attribute: '<h1 data-is="localize" item="header" attr="title" />',
    change: '<h1 data-is="localize" item="header" />'
  }
}
