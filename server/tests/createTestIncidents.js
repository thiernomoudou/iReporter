import 'babel-polyfill';

import db from '../database/index';
import { incident1Query, incident2Query } from './testRecords';

// selecting all users to assign user ids to incients
const usersQuery = 'SELECT * FROM users';

const incident1Values = [
  'Intervention',
  '25 Ikorodu road, Lagos',
  'Bad road'
];

const incident2Values = [
  'Red-flag',
  '26 Idu Motta road, Lagos',
  'Police bribery'
];

/**
 * Create test users and test incidents
 */
const createTestIncidents = async () => {
  const { rows } = await db.query(usersQuery);
  incident1Values.splice(2, 0, rows[0].id);
  incident2Values.splice(2, 0, rows[1].id);
  await db.query(incident1Query, incident1Values);
  await db.query(incident2Query, incident2Values);
  await db.endConnection();
  console.log('2 test incidents created');
  process.exit(0);
};

createTestIncidents();
