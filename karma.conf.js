// Karma configuration

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: [
            'jspm',
            'mocha',
            'chai'
        ],


        // list of files / patterns to load in the browser
         files: ['src/js/og.core/webrtc.polyfill.js'],

        // configuration for karma-jspm
        jspm: {
            useBundles: true,
            config: 'src/config.js',
            loadFiles: ['src/test/**/*.js'],
            serveFiles: ['src/js/**/*.js'],
            packages: 'src/lib'
        },

        proxies: {
            '/base/lib/': '/base/src/lib/'
        },

        // list of files to exclude
        exclude: [
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
        },

        growlerReporter: {
            types: [
                'error',
                //'success',
                'disconnected',
                'failed'
            ]
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['mocha', 'growler'],

        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_ERROR,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: [
            'Chrome'
            //'Firefox'
        ],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true
    });
};
