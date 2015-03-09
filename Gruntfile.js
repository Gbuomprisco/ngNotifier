module.exports = function(grunt) {
    "use strict";

    grunt.initConfig({
        uglify: {
            js: {
                files: [{
                    expand: true,
                    cwd: 'app/dist/js',
                    src: '*.js',
                    dest: 'app/dist/js'
                }]
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['app/src/js/*.js', 'app/src/js/**/*.js'],
                dest: 'app/dist/js/ngNotifier.js'
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'app/dist/css/style.css': 'app/src/sass/notification.sass'
                }
            }
        }
    });


    grunt.registerTask('test', function () {
        var options = {
            cmd: "karma",
            grunt: false,
            args: ["start"]
        },
            done = this.async();

        grunt.util.spawn(options, function (error, result) {
            console.log(result);
            done();
        }).stdout.on('data', function(buf) {
            console.log(String(buf));
        });
    });

    grunt.registerTask('run', function () {
        var port = 7080,
            done = this.async(),
            createServerOptions;

        var run = function (port) {
            createServerOptions = {
                cmd: "http-server",
                grunt: false,
                args: ["./", "-p", port, "-o"]
            };

            grunt.util.spawn(createServerOptions, function (error, result) {
                if (error) {
                    console.log("Port " + port  + " might be busy, trying with " + (port + 1));
                    run(port + 1);
                } else {
                    console.log(result);
                    done();
                }
            });
        };

        run(port);
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.registerTask('build', ["sass", "concat", "uglify"]);
    grunt.registerTask('default', ["build", "run"]);
};
