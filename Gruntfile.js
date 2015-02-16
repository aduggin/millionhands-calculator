module.exports = function (grunt) {
  'use strict';

  // Load Grunt tasks declared in the package.json file
  require('load-grunt-tasks')(grunt, {
    pattern: ['grunt-*', '!grunt-template-jasmine-istanbul']
  });

  // Configure Grunt
  var sassFiles = [
    {
      expand: true,
      cwd: 'app/sass/',
      dest: '.tmp/styles/',
      src: '**/*.scss',
      ext: '.css'
    }
  ];

  grunt.initConfig({
    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      strict: {
        options: {
          import: 2
        },
        src: ['.tmp/styles/*.css']
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'app/js/**/*.js',
        '!app/js/vendor/**/*.js',
        'test/**/*.js',
        '!test/lib/*.js'
      ]
    },

    sass: {
      options: {
        cacheLocation: '.tmp/.sass-cache'
      },
      dev: {
        options: {
          style: 'expanded',
          lineComments: true
        },
        files: sassFiles
      },
      prod: {
        options: {
          style: 'compressed'
        },
        files: sassFiles
      }
    },

    autoprefixer: {

      options: {
        browsers: ['> 1%', 'last 2 versions', 'ff 17', 'opera 12.1']
      },
      no_dest: {
        src: '.tmp/styles/*.css'
      }
    },


    connect: {
      server: {
        options: {
          port: 9000,
          middleware: function (connect) {
            var path = require('path');
            return [
              connect.static(path.resolve('app')),
              connect.static(path.resolve('.tmp'))
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001
        }
      }
    },
    jasmine: {
      run: {
        src: ['app/js/**/*.js'],
        options: {
          vendor: [
            'app/vendor/js/jquery.js',
            'test/lib/jasmine-jquery.js'],
          specs: ['test/spec/*_spec.js'],
          outfile: 'test/index.html'
        }
      },
      coverage: {
        src: ['app/js/**/*.js'],
        options: {
          vendor: [
            'app/vendor/js/jquery.js',
            'test/lib/jasmine-jquery.js'],
          specs: ['test/spec/*_spec.js'],
          template: require('grunt-template-jasmine-istanbul'),
          templateOptions: {
            coverage: 'reports/coverage/coverage.json',
            report: [
              {
                type: 'lcov',
                options: {
                  dir: 'reports/coverage'
                }
              },
              {
                type: 'text-summary'
              }
            ]
          }
        }
      }
    },
    coveralls: {
      grunt_coveralls_real_coverage: {
        src: 'reports/coverage/lcov.info'
      }
    },
    plato: {
      all: {
        files: {
          'reports/plato': ['app/js/**/*.js']
        }
      }
    },
    dalek: {
      dist: {
        src: ['test/smoketests.js']
      }
    },

    watch: {
      html: {
        files: ['app/index.html'],
        options: {
          livereload: true
        }
      },
      sass: {
        files: ['app/sass/*.scss'],
        tasks: ['sass:dev', 'autoprefixer'],
        options: {
          livereload: true
        }
      },
      css: {
        files: ['.tmp/styles/*.css'],
        tasks: ['csslint']
      },
      js: {
        files: [
          'Gruntfile.js',
          'app/js/**/*.js',
          '!app/js/vendor/**/*.js',
          'test/**/*.js'
        ],
        tasks: ['jshint', 'jasmine:run'],
        options: {
          livereload: true
        }
      }
    },

    open: {
      server: {
        path: 'http://0.0.0.0:9000'
      },
      test: {
        path: 'http://0.0.0.0:9001/test'
      }
    },

    clean: {
      all: [
        '.tmp',
        '.grunt',
        'test/index.html',
        'dist'
      ]
    },

    copy: {
      release: {
        files: [
          {
            expand: true,
            cwd: 'app',
            dest: 'dist',
            src: ['README.md', '*.html', 'js/**/*', 'vendor/js/**/*']
          },
          {
            expand: true,
            cwd: '.tmp',
            dest: 'dist',
            src: ['styles/*']
          }
        ]
      }
    },
    build_gh_pages: {
      gh_pages: {}
    },
    tenon: {
      options: {
        apiKey: "3786b3b4504cc501066c48285f80fcd3",
        timeout: 240000,
        urls: [
          'http://aduggin.github.io/millionhands-calculator/'
        ]
      },
      local: {
      }
    }
  });

  grunt.registerTask('server', 'Run a server', [
    'csslint',
    'jshint',
    'sass:dev',
    'connect:server',
    'open:server',
    'watch'
  ]);

  grunt.registerTask('test', 'Run tests in the console', [
    'csslint',
    'jshint',
    'jasmine:run'
  ]);

  grunt.registerTask('travis', [
    'test'
  ]);

  grunt.registerTask('smoketests', [
    'connect:server',
    'open:server',
    'dalek'
  ]);

  grunt.registerTask('accessibility', [
    'tenon'
  ]);

  grunt.registerTask('test:browser', 'Run tests in a browser', [
    'csslint',
    'jshint',
    'jasmine:run:build',
    'connect:test',
    'open:test',
    'watch'
  ]);

  grunt.registerTask('release', 'Generate files, runs tests, build to dist and copy files to gh-pages branch', [
    'clean',
    'sass:prod',
    'autoprefixer',
    'test',
    'copy:release',
    'build_gh_pages:gh_pages'
  ]);

  grunt.registerTask('version', 'Shows version number', function () {
    var pkg = grunt.file.readJSON('package.json');
    console.log(pkg.name, pkg.version);
  });
};
