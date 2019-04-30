import 'babel-polyfill';
import moment from 'moment';
import bcrypt from 'bcrypt-nodejs';

import db from '../database/index';
import { user1Query, user2Query } from './testRecords';

const user1Values = [
  'testuser',
  'testuser@gmail.com',
  bcrypt.hashSync('12347162', bcrypt.genSaltSync(8)),
  moment(new Date()),
  moment(new Date())
];
const user2Values = [
  'admin',
  'admin@gmail.com',
  bcrypt.hashSync('12347162ytre', bcrypt.genSaltSync(8)),
  moment(new Date()),
  moment(new Date()),
  true
];

/**
 * Create test users and test incidents
 */
const createTestUsers = async () => {
  await db.query(user1Query, user1Values);
  await db.query(user2Query, user2Values);
  await db.endConnection();
  console.log('2 test users created');
  process.exit(0);
};

createTestUsers();
