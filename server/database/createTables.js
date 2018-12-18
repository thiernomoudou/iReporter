import 'babel-polyfill';

import db from './index';
import { incidentTableQuery, userTableQuery } from './dbTables';

/**
 * Create incidents and user Tables
 */
const createTables = async () => {
  await db.query(userTableQuery);
  await db.query(incidentTableQuery);
  await db.endConnection();
  console.log('tables created');
  process.exit(0);
};

createTables();
