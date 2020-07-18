const configDevelopment = require('./webpack.config.development');
const configProduction = require('./webpack.config.production');

module.exports = (env, options) => {
  if (options.mode === 'development') {
    return configDevelopment;
  } else if (options.mode === 'production') {
    return configProduction;
  }
};
