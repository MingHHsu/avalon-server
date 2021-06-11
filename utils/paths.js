const fs = require('fs');
const path = require('path');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  nodeModulesPath: resolveApp('node_modules'),
  distPath: resolveApp('dist'),
  srcPath: resolveApp('src'),
  entryPath: resolveApp('src/server.js')
};
