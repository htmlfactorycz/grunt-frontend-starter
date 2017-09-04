/*
 * Licensed under the MIT license.
 */


"use strict";

module.exports = function(grunt) {

  var config = {};

  config['project'] ={
    'name'    : 'fill me',//BEZ DIAKRITIKY A MEZER!!!!! + VŠECHNO MALÝMI
    'title'   : 'fill me',//titulek v html sablonach
    'for'     : 'htmlfactory',
    'author'  : 'Vitalij Petras',
  };

  config['bs'] = /*'projekty/nove/'+*/config['project']['name'];//url pro browsersynch

  config['path'] ={
    'root'    : 'dev/',
    'scss'    : 'dev/assets/sass/',
    'css'     : 'dev/assets/css/',
    'js'      : 'dev/assets/js/',
    'images'  : 'dev/images/svg/',
    'icons'   : 'dev/assets/icons/',
    'dist'    : 'dist/',
  };

  require('time-grunt')(grunt);
  require('jit-grunt')(grunt);

  grunt.initConfig({

    project : config,

    /* sass */
    sass: {                              // Task
      dev: {                            // Target
        options: {                       // Target options
          style: 'expanded',
          sourcemap:'none'
        },
        files:   [{  
          expand: true,   
          cwd: '<%= project.path.scss %>',
          src: ['*.scss', '!_*'],                  // Dictionary of files
          dest: '<%= project.path.css %>',
          ext: '.css'
        }]
      }
    },

    /* minifikace css souboru */
    cssmin: {
      dist: {
        options: {
          aggressiveMerging: false,
        },
        files: [{
          expand: true,
          cwd: '<%= project.path.dist %>',
          src: ['**/*.css', '!*.min.css'],
          dest: '<%= project.path.dist %>',
          //ext: '.css'
        }]
      }
    },

    px_to_rem: {
      dist: {
        options: {
          base: 16,
          fallback: false,
          fallback_existing_rem: false,
          ignore: [],
          map: false
        },
        files: {
          '<%= project.path.dist %>assets/css/global.css': ['<%= project.path.dist %>assets/css/global-rem-fallback.css']
        }
      }
    },

    /* watch */
    watch: {
      options: {
        livereload: true,
        spawn: false,
      },
      //styles
      css: {
        files: '<%= project.path.scss %>**/*.scss',
        tasks: ['sass:dev'],
        // pro nativni prevod do rem jednotek vymenit 'cssmin' za 'rem'
      },
      //png sprite
      pngSprite: {
        files: ['<%= project.path.sprites %>png-sprite/*.png'],
        tasks: ['sprite'],
      },
      //svg sprite
      svgSprite: {
        files: ['<%= project.path.icons %>**/*.svg'],
        tasks: ['svg'],
      },
      //concated js
      concatedScripts: {
        files: ['<%= project.path.js %>concated/*.js'],
        tasks: ['concat:basic', 'uglify:all'],
      },
      //all scripts
      allScripts: {
        files: ['<%= project.path.js %>*.js'],
        tasks: ['uglify:all'],
      },
      //html and php 
      htmlFiles:{
        files: ['<%= project.path.root %>**/*.{php,html}'],
      },

      configFiles: {
        files: [ 'gruntfile.js', 'package.json' ],
        options: {
          reload: true
        }
      }
      
    },

    /* minifikace javascriptu */
    uglify: {
      /*basic: {
        files: [{
          //  config['project']['name']'/js/all.min.js': ['<%= config.project.name %>/js/all.js']
          expand: true,   
          cwd: '<%= project.path.js %>',
          src: ['all.js'],                  // Dictionary of files
          dest: '<%= project.path.js %>',
          ext: '.min.js'
        }]
      },*/
      all: {
        files: [{
          expand: true,
          cwd: '<%= project.path.js %>',
          src: ['*.js', '!*.min.js'],
          dest: '<%= project.path.js %>',
          ext: '.min.js'
        }]
      }
    },

    /* sjednoceni vsech .js souboru do jednoho */
    concat: {
      basic: {
        src: '<%= project.path.js %>concated/*.js', //vstupni slozka
        dest: '<%= project.path.js %>all.js',  //vystupni slozka
      },
    },

    svgmin: {
      dist: {
          options: {
              plugins: [
                  // Don't remove XML declaration (needed to avoid errors creating PNG on Win 7) 
                  { removeXMLProcInst: false }
              ]
          },
          files: [{
              expand: true,
              cwd: '<%= project.path.sprites %>svg-sprite/',
              src: ['*.svg', '*.png'],
              dest: "<%= project.path.icons %>svg"
          }]
      }
    },

    svgstore: {
      options: {
        prefix : 'icon-', // This will prefix each ID
      },
      all: {
        files: {
          '<%= project.path.images %>/all.svg': ['<%= project.path.icons %>all/*.svg']
        },
      },
    },


    copy: {
      templatePHP: {
        options: {
          process: function(content, path) {
            return grunt.template.process(content);
          }
        },
        src: '<%= project.path.root %>homepage.php.tpl',
        dest: '<%= project.path.root %>homepage.php', 
      },
      templateREM: {
        options: {
          process: function(content, path) {
            return grunt.template.process(content);
          }
        },
        src: '<%= project.path.js %>load-css.js',
        dest: '<%= project.path.js %>load-css.js', 
      },
      templateCSS: {
        options: {
          process: function(content, path) {
            return grunt.template.process(content);
          }
        },
        src: '<%= project.path.scss %>global.scss.tpl',
        dest: '<%= project.path.scss %>global.scss', 
      },
      remFallback:{
        src: ['<%= project.path.dist %>assets/css/global.css'], 
        dest: '<%= project.path.dist %>assets/css/global-rem-fallback.css'
      },
      htaccess:{
        src: ['<%= project.path.dist %>_htaccess'], 
        dest: '<%= project.path.dist %>.htaccess'
      }
    },

    sync: {
      dist: {
        files: [
          {
            cwd: '<%= project.path.root %>', 
            src: ['**', '!**/*.php', '!page-components', '!page_components', '!assets/images/sprites/**'], 
            dest: '<%= project.path.dist %>'
          }, // makes all src relative to cwd 
        ],
        verbose: false, // Default: false 
        pretend: false, // Don't do any disk operations - just write log. Default: false 
        failOnError: false, // Fail the task when copying is not possible. Default: false 
        ignoreInDest: ["data.zip", '**/*.php', 'page-components', 'page_components', '.htaccess'], // Never remove js files from destination. Default: none 
        updateAndDelete: true, // Remove all files from dest that are not found in src. Default: false 
        compareUsing: "mtime" // compares via md5 hash of file contents, instead of file modification time. Default: "mtime" 
      }
    },

    clean: {
      templatePHP: [
        '<%= project.path.root %>homepage.php.tpl'
      ],
      templateCSS: [
        '<%= project.path.scss %>global.scss.tpl'
      ],
      dist: [
        '<%= project.path.dist %>data.zip', 
      ],
      distFiles: {
        files:   [{  
          expand: true,   
          cwd: '<%= project.path.dist %>',
          src: [
                'assets/sass', 
                'assets/images/sprites',
                'assets/js/concated',
                'assets/js/critical.js',
                'assets/js/critical.min.js',
                'assets/js/not-used-scripts',
                'assets/js/*.js', '!assets/js/*.min.js',
          ],                  // Dictionary of files
          dest: '<%= project.path.dist %>',
        }]
      },
      gruntIconLoader: [
        '<%= project.path.icons %>grunticon.loader.js'
      ],
      htaccess: [
        '<%= project.path.dist %>_htaccess'
      ],
    },

    compress: {
      dist: {
        options: {
          archive: '<%= project.path.dist %>data.zip'
        },
        files: [
          {expand: true, cwd: '<%= project.path.dist %>', src: ['**'], dest:'<%= project.project.name %>'}
        ]
      }
    },

    autoprefixer: {
      options: {
        browsers: [
          'last 3 versions', 
          'ie >= 10', 
          '> 1%'
        ]
      },
      dist: {  
        // expand:true,
        src: '<%= project.path.dist %>assets/css/global.css',
        dest: '<%= project.path.dist %>assets/css/global.css'
      }
    },

    file_append: {
      gruntIcon: {
        files: [
          {
            append: 'grunticon(["assets/icons/icons.data.svg.css?v="+version+"", "assets/icons/icons.data.png.css?v="+version+"", "assets/icons/icons.fallback.css?v="+version+""], grunticon.svgLoadedCallback );',
            input: '<%= project.path.icons %>grunticon.loader.js',
            output: '<%= project.path.js %>concated/z-grunticon.loader.js'
          }
        ]
      }
    },

    browserSync: {
        dev: {
            bsFiles: {
                src : [
                    '<%= project.path.css %>*.css',
                    '<%= project.path.js %>*.js',
                    '<%= project.path.root %>**/*.html',
                    '<%= project.path.root %>**/*.php'
                ]
            },
            options: {
                proxy: 'localhost:80/<%= project.bs %>/<%= project.path.root %>', //our PHP server
                port: 8080, // our new port
                open: true,
                watchTask: true
            }
        }
    },

    php: {
        dev: {
            options: {
                port: 80,
                base: '<%= project.path.root %>'
            }
        }
    },

    tinyimg: {
      all: {
        files: [{
          expand: true,                  // Enable dynamic expansion
          cwd: '<%= project.path.dist %>',                   // Src matches are relative to this path
          src: ['**/*.svg'],  //{png,jpg,svg} // Actual patterns to match
          dest: '<%= project.path.dist %>'                  // Destination path prefix
        }]
      },
    },

    tinypng: {
      options: {
          apiKey: "G6YNiVTmdOqImIT8wzpFlb1ZrDA5gtoS",
          sigFile: '.tinypng.json',
          checkSigs: true,
          summarize: true,
          showProgress: true,
          stopOnImageError: true
      },
      compress: {
          files: [{
            expand: true,                  // Enable dynamic expansion
            cwd: '<%= project.path.dist %>',                   // Src matches are relative to this path
            src: ['**/*.{png,jpg}', '!assets/icons/**', '!assets/favicons/**'],   // Actual patterns to match
            dest: '<%= project.path.dist %>'                  // Destination path prefix
          }]
      },
    },

    php2html: {
      dist: {
        options: {
          processLinks: true,// relative links should be renamed from .php to .html 
          htmlhint: false,
        },
        files: [
          {
            expand: true, 
            cwd: '<%= project.path.root %>', 
            src: ['*.php', '!checklist.php'], 
            dest: '<%= project.path.dist %>', 
            ext: '.html' 
          }
        ]
      }
    },

    'ftp-deploy': {
      htmlfactory: {
        auth: {
          host   : "170632.w32.wedos.net",
          port   : "21",
          authKey: '<%= project.project.for %>'
        },
        dot: true,
        src: '<%= project.path.dist %>',         // local path
        dest: '<%= project.project.name %>', //path on ftp
      },
      honza: {
        auth: {
          host    : "127799.w99.wedos.net",
          port    : 21,
          authKey: '<%= project.project.for %>'
        },
        dot: true,
        src: '<%= project.path.dist %>',         // local path
        dest: '<%= project.project.name %>', //path on ftp
        //http://www.praguecoding.eu/projects2/
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-ftp-deploy');
  grunt.loadNpmTasks('grunt-px-to-rem');
  grunt.loadNpmTasks('grunt-grunticon');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-tinyimg');
  grunt.loadNpmTasks('grunt-php2html');
  grunt.loadNpmTasks('grunt-tinypng');
  grunt.loadNpmTasks('grunt-sync');
  grunt.loadNpmTasks('grunt-svg-sprite');
  grunt.loadNpmTasks('grunt-svgstore');

  /* 
  tasks 
  */

  grunt.registerTask('svg', ['svgstore']);

  grunt.registerTask('png', ['sprite', 'sass:dev']);

  grunt.registerTask('default', ['php', 'browserSync', 'watch']);

  grunt.registerTask('rem', ['copy:remFallback', 'px_to_rem']);

  grunt.registerTask('oimages', ['tinyimg', 'tinypng']);

  grunt.registerTask('convert2html', ['php2html']);

  grunt.registerTask('template', [
    'copy:templateREM',                            //css a rem fallback
    'copy:templateCSS', 'clean:templateCSS',       //prejmenovat globalni CSS a odstranit template
    'copy:templatePHP', 'clean:templatePHP',       //doplnit cesty na homepage a odstranit template
  ]);

  grunt.registerTask('update', ['concat:basic', 'svg', 'sass:dev']);

  grunt.registerTask('build', [
    'update',
    'clean:dist', 'sync:dist',  
    'copy:htaccess', 'clean:htaccess',
    'convert2html', 
    'clean:distFiles', 
    'autoprefixer:dist', 'cssmin:dist', 'rem',
    'oimages'
  ]);// 'ftp-deploy:'+config['project']['for']


  grunt.registerTask('send', ['build', 'compress', 'ftp-deploy:'+config['project']['for']]);

  grunt.registerTask('ftp', ['compress', 'ftp-deploy:'+config['project']['for']]);

  grunt.registerTask('default', ['update', 'php', 'browserSync', 'watch']);
};

