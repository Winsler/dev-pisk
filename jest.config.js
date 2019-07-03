module.exports = {
  roots: [
    '<rootDir>/piskel-clone/',
  ],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.js$',
  moduleFileExtensions: [
    'js',
    'html',
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.html$': '<rootDir>/piskel-clone/tests/utils/htmlLoader.js',
  },
  moduleNameMapper: {
    '^.+\\.(css|sass)$': 'babel-jest',
  },
};
