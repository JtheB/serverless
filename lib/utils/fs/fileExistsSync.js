'use strict';

const fse = require('./fse');
const getOneFilePathThroughPattern = require('./getOneFilePathThroughPattern');

function fileExistsSync(filePath) {
  let tmpFilePath = filePath;
  tmpFilePath = getOneFilePathThroughPattern(tmpFilePath);

  try {
    const stats = fse.lstatSync(tmpFilePath);
    return stats.isFile();
  } catch (e) {
    return false;
  }
}

module.exports = fileExistsSync;
