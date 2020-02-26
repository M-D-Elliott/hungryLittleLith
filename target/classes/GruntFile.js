'use strict';
module.exports = function(grunt) {
  grunt.initConfig({
    uglify: {
      build: {
        src: [
            '/static/js/game/constants.js',
            '/static/js/game/Environment.js',
            '/static/js/game/Listener.js',
            '/static/js/game/Clock.js',
            '/static/js/game/Lith.js',
            '/static/js/game/Celestial.js',
            '/static/js/ui/MainMenu.js',
            '/static/js/ui/RestartMenu.js',
            '/static/js/ui/Hint.js',
            '/static/js/ui/PauseMenu.js',
            '/static/js/game/game.js',
        ],
        dest: '/static/hungrylillith.min.js'
      }
    },
    watch: {
      js: {
        files: '<%= uglify.build.src %>',
        tasks: ['uglify']
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', [
    'uglify',
    ]);
  grunt.registerTask('dev', [
    'watch'
    ]);
};