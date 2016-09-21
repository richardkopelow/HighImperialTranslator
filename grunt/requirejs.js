module.exports =  {
  compile: {
    options: {
      optimize: 'uglify2',
      uglify2: {
        mangler: {
          toplevel: true
        }
      },
      baseUrl: '<%= config.app %>/js',
      mainConfigFile: '<%= config.app %>/js/requireConfig.js',
      name: 'almond',
      include: 'main',
      insertRequire: ['main'],
      out: '<%= config.dist %>/js/main.js',
      wrap: true
    }
  }
};
