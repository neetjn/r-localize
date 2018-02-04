module.exports = function(config) {
  config.set({
    logLevel: config.LOG_INFO,
    colors: true,
    autoWatch: true,
    singleRun: true,
    browsers: ['Electron'],
    frameworks: ['jasmine', 'riot'],
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
    files: [
      '../dist/r-localize.js',
      'mock.js',
      'specs/**.test.js'
    ]
  })
}
