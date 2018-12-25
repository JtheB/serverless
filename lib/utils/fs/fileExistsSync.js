'use strict';

const fse = require('./fse');
const globby = require('globby');

function fileExistsSync(filePath) {
  let tmpFilePath = filePath;
  // tests for a pattern in the provided filpath
  if (globby.hasMagic(tmpFilePath)) {
    tmpFilePath = globby.sync(tmpFilePath);

    // If there are multiple files to one pattern,
    // it should return the alphabetically superior one
    // or in case of one with and one without the version number
    // the one without (e.g. artifact.js > artifact-1a.js
    if (tmpFilePath.length !== 1) {
      tmpFilePath = tmpFilePath[tmpFilePath.length - 1].toString();
    } else {
      tmpFilePath = tmpFilePath[0].toString();
    }
  }
  try {
    const stats = fse.lstatSync(tmpFilePath);
    return stats.isFile();
  } catch (e) {
    return false;
  }
}

module.exports = fileExistsSync;
