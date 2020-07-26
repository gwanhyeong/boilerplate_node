// This is a template for a jsconfig.json file which will be
// generated when starting the dev server or a build.

module.exports = {
  include: ['src/**/*'],
  compilerOptions: {
    baseUrl: '.',
    target: 'es6',
    module: 'commonjs',
    // `paths` will be automatically generated using aliases.config.js
  },
};
