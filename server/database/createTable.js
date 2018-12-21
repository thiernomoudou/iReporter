import 'babel-polyfill';
import { createIncidentTable, createUserTable } from './models';

const createTables = async () => {
  await createUserTable();
  await createIncidentTable();
};

createTables();
