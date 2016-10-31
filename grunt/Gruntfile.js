module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                //对当前日期进行格式化 
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            my_target: {
                files: [
                    {
                        expand: true,
                        //相对路径
                        cwd: 'js/',
                        src: '*.js',
                        dest: 'build/',
                        rename: function (dest, src) {
                            var folder = src.substring(0, src.lastIndexOf('/'));
                            var filename = src.substring(src.lastIndexOf('/'), src.length);
                            filename = filename.substring(0, filename.lastIndexOf('.'));
                            var fileresult = dest + folder + filename + '.min.js';
                            grunt.log.writeln("现处理文件：" + src + "  处理后文件：" + fileresult);
                            return fileresult;
                        }
                    }
                ]
            }
        },
        concat: {
            bar: {
                src: ['build/*.js'],
                dest: 'dest/all.min.js'
            }
        },
        watch: {
            files: ['js/*.js'],
            tasks: ['uglify', 'concat']
        },
        less: {
            design: {
                files: {
                    'build/css/design.css': 'public/css/design.less'
                }
            },
            explicit: {
                files: {
                    'build/css/explicit.css': [
                        'public/css/classes.less',
                        'public/css/design.less'
                    ]
                }
            },
            compile: {
                files: {
                    'build/css/compiled.css': 'public/css/**/*.less'
                }
            }
        },
        sprite: {
            icons: {
                src: 'public/img/icons/*.png',
                destImg: 'build/img/icons.png',
                destCSS: 'build/css/icons.css'
            }
        },
        clean:{
            js:'build/*.js',
            css:'build/css'
        },
        jshint: {
            files: 'js/*.js'
        }
    });
    // 加载包含“uglify”任务的插件
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-spritesmith');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    // 默认被执行的任务列表
    grunt.registerTask('default', ['uglify', 'concat', 'watch', 'less','sprite','clean','jshint']);
    
}