module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      app: {
        files: {
          'app/assets/css/yogert.css': 'app/assets/scss/yogert.scss',
        }
      },
    },
    autoprefixer: {
      app: {
        files: {
          'app/assets/css/yogert.css': 'app/assets/css/yogert.css'
        }
      },
    },
    watch: {
      app: {
        files: [
          'app/assets/scss/*.scss',
        ],
        tasks: ['sass:app', 'autoprefixer:app'],
        options: {
          livereload: true,
          interrupt: true,
        }
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');

  grunt.registerTask('serve', ['devserver']);
  grunt.registerTask('default', ['watch']);

};
