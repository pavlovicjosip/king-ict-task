module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ],
};