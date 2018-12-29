'use strict';

const fse = require('./fse');
const getFilePathThroughPattern = require('./getFilePathThroughPattern');

function fileExistsSync(filePath) {
  let tmpFilePath = filePath;
  tmpFilePath = getFilePathThroughPattern(tmpFilePath);

  try {
    const stats = fse.lstatSync(tmpFilePath);
    return stats.isFile();
  } catch (e) {
    return false;
  }
}

module.exports = fileExistsSync;
