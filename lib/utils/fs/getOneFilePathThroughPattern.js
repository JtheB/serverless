'use strict';

const globby = require('globby');

function getOneFilePathThroughPattern(filePath) {
  let tmpFilePath = filePath;
  if (globby.hasMagic(tmpFilePath)) {
    tmpFilePath = globby.sync(tmpFilePath);

    // If there are multiple files to one pattern,
    // it should only return the alphabetically superior one
    // or in case of one with and one without the version number
    // the one without (e.g. artifact.js > artifact-1a.js)
    if (tmpFilePath.length !== 1) {
      tmpFilePath = tmpFilePath[tmpFilePath.length - 1].toString();
    } else if (tmpFilePath[0] === undefined) {
      return '';
    } else {
      tmpFilePath = tmpFilePath[0].toString();
    }
  }
  return tmpFilePath;
}

module.exports = getOneFilePathThroughPattern;
