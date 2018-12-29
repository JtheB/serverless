'use strict';

const fse = require('./fse');
const utils = require('../../plugins/plugin/lib/utils.js');

function fileExistsSync(filePath) {
  let tmpFilePath = filePath;
  tmpFilePath = utils.getFilePathThroughPattern(tmpFilePath);

  try {
    const stats = fse.lstatSync(tmpFilePath);
    return stats.isFile();
  } catch (e) {
    return false;
  }
}

module.exports = fileExistsSync;
