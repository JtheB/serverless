'use strict';

const testUtils = require('../../../tests/utils');
const chai = require('chai');
const getOneFilePathThroughPattern = require('./getOneFilePathThroughPattern');
const writeFile = require('./writeFile');
const path = require('path');
const readFile = require('./readFile');
const fileExists = require('./fileExists');

// Configure chai
chai.use(require('chai-as-promised'));
chai.use(require('sinon-chai'));
const expect = require('chai').expect;

// TODO: Fix errors in tests!
describe('#getOneFilePathThroughPattern()', () => {
  it('should get the alphabetically superior one', () => {
    const tmpDirPath = testUtils.getTmpDirPath();
    const tmpFilePath1 = path.join(tmpDirPath, 'testfile-1.zip');
    const tmpFilePath2 = path.join(tmpDirPath, 'testfile-2.zip');
    const tmpFilePathPattern = path.join(tmpDirPath, 'testfile-*.zip');
    console.log(`${getOneFilePathThroughPattern(tmpFilePathPattern)} <- with pattern`);
    writeFile(tmpFilePath1);
    return writeFile(tmpFilePath2)
      .then(() => expect(getOneFilePathThroughPattern(tmpFilePathPattern)))
        .to.equal(tmpFilePath2);
  });

  it('should return a string', () => {
    const tmpDirPath = testUtils.getTmpDirPath();
    const tmpFilePath = path.join(tmpDirPath, 'testfile.zip');
    const tmpFilePathPattern = path.join(tmpDirPath, '*.zip');
    return writeFile(tmpFilePath).then(() => {
      expect((typeof getOneFilePathThroughPattern(tmpFilePathPattern)).to.equal(String));
    });
  });

  it('should get the one without version number', () => {
    const tmpDirPath = testUtils.getTmpDirPath();
    const tmpFilePath1 = path.join(tmpDirPath, 'testfile-1.zip');
    const tmpFilePath2 = path.join(tmpDirPath, 'testfile.zip');
    const tmpFilePathPattern = path.join(tmpDirPath, 'testfile*.zip');

    writeFile(tmpFilePath1);
    return writeFile(tmpFilePath2)
      .then(() => expect(getOneFilePathThroughPattern(tmpFilePathPattern)))
      .to.equal(tmpFilePath2);
  });
});
