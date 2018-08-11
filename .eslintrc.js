module.exports = {
  extends: 'eslint-config-egg',
  // for experimental features support
  parser: 'babel-eslint',
  rules: {
    // see https://github.com/eslint/eslint/issues/6274
    'generator-star-spacing': 'off',
    'babel/generator-star-spacing': 'off',
  }
};