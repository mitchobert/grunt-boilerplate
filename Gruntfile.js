module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {   
            dist: {
                src: [
                    'js/libs/*.js', // All JS in the libs folder
                    'js/*.js'  // This specific file
                ],
                dest: 'dist/js/production.js',
            }
        },
        uglify: {
            build: {
                src: 'dist/js/production.js',
                dest: 'dist/js/production.min.js'
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'dist/img'
                }]
            }
        },
        sass: {                                                 // tasks
            dist: {                                             // target
                options: {                                      // target options
                    style: 'expanded'
                },
                files: {                                        // Dictionary of files
                    'dist/css/global.css': 'scss/global.scss'   // 'destination': 'source'
                }
            } 
        },
        watch: {
            scripts: {
                files: ['js/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false,
                },
            },
            css: {
                files: ['css/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false,
                }
            } 
        }

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['concat', 'uglify', 'imagemin', 'sass', 'watch']);

};