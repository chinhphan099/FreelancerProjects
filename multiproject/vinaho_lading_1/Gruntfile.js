module.exports = function(grunt) {
  'use strict';
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - built on <%= grunt.template.today("dd-mm-yyyy") %> */\n',
      views: 'app/views/',
      app: 'app/',
      build: 'public/',
      doc: 'document/'
    },
    jade: {
      compile: {
        options: {
          pretty: true
        },
        files: [{
          expand: true,
          cwd: '<%= meta.views %>',
          src: ['**/*.jade', '!layouts/**', '!pages/**','!modules/**', '!mixins/**', '!guide/**', '!sprite/**'],
          dest: '<%= meta.build %>',
          ext: '.html'
        },
        {
          expand: true,
          cwd: '<%= meta.views %>/pages',
          src: ['**/*.jade', '!layouts/**', '!pages/**','!modules/**', '!mixins/**', '!guide/**', '!sprite/**'],
          dest: '<%= meta.build %>',
          ext: '.html'
        }
        ]
      }
    },
    less: {
      build: {
        options: {
          compress: false
        },
        files: [{
          '<%= meta.build %>css/libs.css': '<%= meta.app %>less/libs.less',
          '<%= meta.build %>css/style-guide.css': '<%= meta.app %>less/style-guide.less',
          '<%= meta.build %>css/plugins.css': '<%= meta.app %>less/plugins.less',
          '<%= meta.build %>css/style.css': '<%= meta.app %>less/style.less'
        }]
      }
    },
    concat: {
      dist: {
        files: [{
          '<%= meta.build %>js/libs.js': ['<%= meta.app %>js/libs/jquery-2.1.3.js', '<%= meta.app %>js/libs/plugins/*.js'],
          '<%= meta.build %>js/style-guide.js': ['<%= meta.app %>js/guide/*.js'],
          '<%= meta.build %>js/script.js': ['<%= meta.app %>js/plugins/*.js']
        }]
      }
    },
    copy: {
      fonts: {
        files: [{
          expand: true,
          cwd: '<%= meta.app %>fonts/',
          src: '**',
          dest: '<%= meta.build %>fonts/'
        }]
      },
      icons: {
        files: [{
          expand: true,
          cwd: '<%= meta.app %>icons/',
          src: '**',
          dest: '<%= meta.build %>'
        }]
      },
      images: {
        files: [{
          expand: true,
          cwd: '<%= meta.app %>images/',
          src: '**',
          dest: '<%= meta.build %>images/'
        }]
      },
      htaccess: {
        files: [{
          expand: true,
          cwd: '<%= meta.app %>tmp/',
          src: '.htaccess',
          dest: '<%= meta.build %>'
        }]
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      files: ['<%= meta.app %>js/guide/*.js', '<%= meta.app %>js/plugins/*.js']
    },
    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      files: ['<%= meta.build %>css/style.css']
    },
    htmlhint: {
      options: {
        htmlhintrc: '.htmlhintrc'
      },
      files: ['<%= meta.build %>*.html']
    },
    watch: {
      options: {
        spawn: false,
        interrupt: false,
        livereload: true
      },
      js: {
        files: ['<%= meta.app %>js/guide/*.js', '<%= meta.app %>js/plugins/*.js'],
        tasks: ['jshint', 'concat']
      },
      jade: {
        files: ['<%= meta.views %>**/*.jade'],
        tasks: ['jade', 'htmlhint']
      },
      less: {
        files: ['<%= meta.app %>less/**/*.less'],
        tasks: ['less', 'autoprefixer', 'csslint'],
      },
      fonts: {
        files: ['<%= meta.app %>fonts/**'],
        tasks: ['copy:fonts']
      },
      icons: {
        files: ['<%= meta.app %>icons/**'],
        tasks: ['copy:icons']
      },
      images: {
        files: ['<%= meta.app %>images/**'],
        tasks: ['copy:images']
      }
    },
    imagemin: {
      dist: {
        options: {
          optimizationLevel: 3,
          progressive: true
        },
        files: [{
          expand: true,
          cwd: '<%= meta.build %>images/',
          src: '**/*.{png,jpg,gif}',
          dest: '<%= meta.build %>images/'
        }]
      }
    },
    cssmin: {
      options: {
        advanced: false,
        keepSpecialComments: false,
        compatibility: 'ie9'
      },
      compress: {
        files: [{
          '<%= meta.build %>css/libs.css': '<%= meta.build %>css/libs.css',
          '<%= meta.build %>css/style-guide.css': '<%= meta.build %>css/style-guide.css',
          '<%= meta.build %>css/plugins.css': '<%= meta.build %>css/plugins.css',
          '<%= meta.build %>css/style.css': '<%= meta.build %>css/style.css'
        }]
      }
    },
    uglify: {
      options: {
        banner: '<%= meta.banner %>',
        compress: true,
        beautify: false,
        preserveComments: false
      },
      dist: {
        files: [{
          '<%= meta.build %>js/libs.js': ['<%= meta.app %>js/libs/jquery-2.1.3.js'],
          '<%= meta.build %>js/style-guide.js': ['<%= meta.app %>js/guide/*.js'],
          '<%= meta.build %>js/script.js': ['<%= meta.app %>js/plugins/*.js']
        }]
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 3 versions']
      },
      files: {
        expand: true,
        src: '<%= meta.build %>css/*.css'
      }
    },
    nodemon: {
      dev: {
        options: {
          ignore: ['node_modules/**', '<%= meta.app %>js/**'],
          ext: 'js',
          cwd: __dirname,
          watch: ['server'],
          delay: 1
        },
        script: 'server.js'
      }
    },
    concurrent: {
      options: {
        limit: 2
      },
      dev: {
        options: {
          logConcurrentOutput: true
        },
        tasks: ['nodemon:dev', 'watch']
      }
    },
    clean: {
      options: {
        force: true
      },
      build: ['public']
    }
  });
  grunt.file.expand('../../node_modules/grunt-*/tasks').forEach(grunt.loadTasks);
  require('time-grunt')(grunt);
  grunt.registerTask('build', ['clean', 'concat', 'less', 'jade', 'copy', 'autoprefixer', 'htmlhint', 'jshint', 'csslint']);
  grunt.registerTask('server', ['concurrent:dev']);
  grunt.registerTask('default', ['build', 'server']);
  grunt.registerTask('doc', ['markdownpdf']);
  grunt.registerTask('make-sprite', ['sprite']);
  grunt.registerTask('release', ['build', 'uglify', 'cssmin', 'imagemin']);
};
