module.exports = function(config) {
  config.set({
    logLevel: config.LOG_INFO,
    colors: true,
    browsers: ['Electron'],
    frameworks: ['jasmine', 'riot', 'electron'],
    reporters: ['progress', 'coverage'],
    preprocessors: {
      '../dist/r-localize.js': ['coverage']
    },
    coverageReporter: {
      reporters: [
        {type : 'html', dir : '../coverage/'},
        {type:'lcovonly', dir : '../coverage/'},
        {type:'json', dir : '../coverage/'}
      ]
    },
    plugins: [
      'karma-electron',
      'karma-riot'
    ],
    files: [
      '../dist/r-localize.js',
      'mock.js',
      'specs/**.test.js'
    ]
  })
}
