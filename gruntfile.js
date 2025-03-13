module.exports = (grunt) => {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development: {
                files: {
                    "dev/styles/main.css": "src/styles/main.less"
                },
            },
            production: {
                options: {
                    compress: true,
                },
                files: {
                    "dist/styles/main.min.css": "src/styles/main.less"
                },
            },
        },
        watch: {
            less: {
                files: ['src/styles/**/*.less'],
                tasks: ['less:development'],
            },
            html: {
                files: ['src/*.html'],
                tasks: ['copy:html', 'replace:dev'],
            },
        },
        replace: {
            dev: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: './styles/main.css',
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: '../src/scripts/main.js',
                        },
                        {
                            match: /(src|href)="images\//g,
                            replacement: '$1="images/'
                        }
                    ],
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/*.html'],
                        dest: 'dev/',
                    },
                ],
            },
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: './styles/main.min.css',
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: './src/scripts/main.min.js',
                        },
                    ],
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/*.html'],
                        dest: 'dist/',
                    },
                ],
            },
        },
        copy: {
            images: {
                expand: true,
                cwd: 'src/',
                src: 'images/**/*',
                dest: 'dist/'
            },
            html: {
                expand: true,
                cwd: 'src/',
                src: '*.html',
                dest: 'dist/'
            },
            html_dist: {
                expand: true,
                cwd: 'src/',
                src: '*.html',
                dest: 'dist/'
            }
        },
        htmlmin: {
                dist: {
                options: {
                    removeComents: true,
                    collapseWhitespace: true,
                },
                files: {
                    "prebuild/index.html": "src/index.html",
                },
            },
        },
        clean: ["prebuild"],
        uglify: {
            target :{
                files: {
                    "dist/scripts/main.min.js": "src/scripts/main.js",
                },
            },
        },
    });

grunt.loadNpmTasks("grunt-contrib-less");
grunt.loadNpmTasks("grunt-contrib-watch");
grunt.loadNpmTasks("grunt-replace");
grunt.loadNpmTasks("grunt-contrib-htmlmin");
grunt.loadNpmTasks("grunt-contrib-clean");
grunt.loadNpmTasks("grunt-contrib-uglify");
grunt.loadNpmTasks('grunt-contrib-copy');

grunt.registerTask("default", ['copy:images', 'copy:html', 'replace:dev', "watch"]);

grunt.registerTask("build", ["copy:html_dist","less:production", "htmlmin:dist", "replace:dist", "clean", "uglify"])
};