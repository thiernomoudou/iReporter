import 'babel-polyfill';

import db from './index';

/**
 * drop incidents and user Tables
 */
const dropTables = async () => {
  await db.query('DROP TABLE IF EXISTS incidents');
  await db.query('DROP TABLE IF EXISTS users');
  await db.endConnection();
  console.log('tables dropped');
  process.exit(0);
};

dropTables();
