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
  tags:{
    top: {
      name: 'top',
      template: '<h1 data-is="localize" item="header" />'
    },
    deep: {
      name: 'deep',
      template: '<h1 data-is="localize" item="menu.help" />'
    },
    attribute: {
      name: 'attribute',
      template: '<h1 data-is="localize" item="menu.help" attr="title" />'
    },
    change: {
      name: 'change',
      template: '<h1 data-is="localize" item="header" /><br/><button click={ localize.locale("es-SP") }>Spanish</button>'
    }
  }
}
