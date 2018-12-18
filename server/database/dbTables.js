
/**
 * Create User Table
 */
export const userTableQuery = `CREATE TABLE IF NOT EXISTS
  users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(32) NOT NULL UNIQUE,
    email VARCHAR(64) NOT NULL UNIQUE,
    password VARCHAR(64) NOT NULL,
    registered TIMESTAMP,
    modifieddate TIMESTAMP,
    phonenumber VARCHAR(32),
    firstname VARCHAR(32),
    lastname VARCHAR(20),
    othernames VARCHAR(30),
    isadmin BOOLEAN DEFAULT false
  )`;

/**
 * Create incident Table
 */
export const incidentTableQuery = `CREATE TABLE IF NOT EXISTS
  incidents(
  id SERIAL PRIMARY KEY,
  createdon TIMESTAMP,
  createdby INT REFERENCES users (id) ON DELETE CASCADE,
  type VARCHAR(16) NOT NULL,
  location VARCHAR(48) NOT NULL,
  status VARCHAR(32) DEFAULT 'Draft',
  images text[][],
  videos text[][],
  comment VARCHAR(256),
  title VARCHAR(32))`;
