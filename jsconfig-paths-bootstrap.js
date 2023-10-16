const tsConfigPaths = require('tsconfig-paths');
const jsConfig = require('./jsconfig.json');

const baseUrl = './build';
const cleanup = tsConfigPaths.register({
  baseUrl,
  paths: jsConfig.compilerOptions.paths,
});

module.exports = cleanup;
// // When path registration is no longer needed
// cleanup();
