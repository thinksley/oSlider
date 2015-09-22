module.exports = function(grunt) {
    // 配置
    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
        
        uglify : {
            oslider : {
                files:{
                    'dist/js/oslider.min.js':['src/js/oslider.js']
                }
            }
        },
        cssmin: {
             oslider: {
                src:'src/css/oslider.css',
                dest:'dist/css/oslider.min.css'
            }

        },
        jshint: {
            all: ['src/js/oslider.js']
        }
          
    });
    
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-css');
    
    // 注册任务
    grunt.registerTask('default', ['uglify','cssmin','jshint']);

};