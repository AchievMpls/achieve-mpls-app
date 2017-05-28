module.exports = function(grunt){
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      html: {
        expand: true,
        cwd: 'client/views',
        src: ['index.html',
              '**/*.html'],
        dest: 'server/public/views/'
      },
      css: {
        expand: true,
        cwd: 'client/styles',
        src: ['style.css'],
        dest: 'server/public/styles/'
      },
      scripts: {
        expand: true,
        cwd: 'client/scripts',
        src: ['*.js',
             '**/*.js'],
        dest: 'server/public/scripts/'
      },
      bootstrap: {
        expand: true,
        cwd: 'node_modules/bootstrap/dist/',
        src: ['css/bootstrap.css',
              'js/bootstrap.js'],
        dest: 'server/public/vendors/bootstrap/'
      },
      angular: {
        expand: true,
        cwd: 'node_modules/angular/',
        src: ['angular.js',
              'angular.min.js',
              'angular.min.js.map'],
        dest: 'server/public/vendors/angular/'
      },
      angularRoute: {
        expand: true,
        cwd: 'node_modules/angular-route/',
        src: ['angular-route.js',
              'angular-route.min.js',
              'angular-route.min.js.map'],
        dest: 'server/public/vendors/angular-route/'
      },
      angularMaterial: {
        expand: true,
        cwd: 'node_modules/angular-material/',
        src: ['**/*'],
        dest: 'server/public/vendors/angular-material'
      },
      angularAria: {
        expand: true,
        cwd: 'node_modules/angular-aria/',
        src: ['**/*'],
        dest: 'server/public/vendors/angular-aria'
      },
      angularAnimate: {
        expand: true,
        cwd: 'node_modules/angular-animate/',
        src: ['**/*'],
        dest: 'server/public/vendors/angular-animate'
      },
      angularMessages: {
        expand: true,
        cwd: 'node_modules/angular-messages/',
        src: ['**/*'],
        dest: 'server/public/vendors/angular-messages'
      },
      angularDataTables: {
        expand: true,
        cwd: 'node_modules/angular-material-data-table/dist',
        src: ['**/*'],
        dest: 'server/public/vendors/angular-material-data-table'
      },
      angularMoment: {
        expand: true,
        cwd: 'node_modules/angular-moment/',
        src: ['angular-moment.js'],
        dest: 'server/public/vendors/angular-moment'
      },
      moment: {
        expand: true,
        cwd: 'node_modules/moment',
        src: ['moment.js'],
        dest: 'server/public/vendors/moment'
      },

      javascript: {
        expand: true,
        cwd: 'client/scripts/',
        src: ['client.js',
              '**/*.js'],
        dest: 'server/public/scripts'
      },
      images: {
        expand: true,
        cwd: 'client/views/images/',
        src: ['**/*.png',
              '**/*.jpg'],
        dest: 'server/public/views/images/'
      }
    },

    watch: {
      files: [
        'client/**/*.*',
        'client/**/**/*.*'
      ],
      tasks: ['copy']
    }

  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['copy', 'watch']);
};
