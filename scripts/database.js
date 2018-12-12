const { execSync } = require('child_process');


const createDb = () => {
  execSync('createdb ireportertestdb --owner ireportertest');
  console.log('db created');
};

const dropDb = () => {
  execSync('dropdb ireportertestdb');
  console.log('db dropped');
};

module.exports = { createDb, dropDb };
