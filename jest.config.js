module.exports = {
  roots: [
    '<rootDir>/animation-player/',
  ],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.js$',
  moduleFileExtensions: [
    'js',
    'html',
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.html$': '<rootDir>/animation-player/tests/utils/htmlLoader.js',
  },
  moduleNameMapper: {
    '^.+\\.(css|sass)$': 'babel-jest',
  },
};
