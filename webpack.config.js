const configDevelopment = require('./webpack.config.development');
const configProduction = require('./webpack.config.production');

module.exports = (env, options) => {
  if (options.mode === 'development') {
    return configDevelopment;
  } else if (options.mode === 'production') {
    return configProduction;
  }

  // 모드 설정이 없을 때는 Production 옵션을 설정함
  return configProduction;
};
