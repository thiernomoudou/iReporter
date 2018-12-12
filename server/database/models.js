/* eslint-disable no-console */
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DEV_DATABASE_URL
});

pool.on('connect', () => {
  console.log('connected to the db');
});

/**
 * Create User Table
 */
const createUserTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
    users(
      id UUID PRIMARY KEY,
      username VARCHAR(32) NOT NULL UNIQUE,
      email VARCHAR(64) NOT NULL UNIQUE,
      password VARCHAR(64) NOT NULL,
      registered TIMESTAMP,
      modified_date TIMESTAMP,
      is_admin BOOLEAN DEFAULT false
    )`;
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * Create Incident Table
 */
const createIncidentTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
    incidents(
      id UUID PRIMARY KEY,
      created_on TIMESTAMP,
      created_by UUID REFERENCES users (id) ON DELETE CASCADE,
      type VARCHAR(16) NOT NULL,
      location VARCHAR(48) NOT NULL,
      status VARCHAR(32) DEFAULT 'draft',
      images BYTEA[],
      videos BYTEA[],
      comment VARCHAR(256),
      title VARCHAR(32))`;
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * Drop User Table
 */
const dropUserTable = () => {
  const queryText = 'DROP TABLE IF EXISTS users CASCADE';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * Drop Incidents Table
 */
const dropIncidentTable = () => {
  const queryText = 'DROP TABLE IF EXISTS incidents';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
    });
};
pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  createUserTable,
  createIncidentTable,
  dropUserTable,
  dropIncidentTable,
};

require('make-runnable');
