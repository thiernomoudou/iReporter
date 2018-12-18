
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
    modified_date TIMESTAMP,
    phone_number VARCHAR(32),
    first_name VARCHAR(32),
    last_name VARCHAR(20),
    other_names VARCHAR(30),
    is_admin BOOLEAN DEFAULT false
  )`;

/**
 * Create incident Table
 */
export const incidentTableQuery = `CREATE TABLE IF NOT EXISTS
  incidents(
  id SERIAL PRIMARY KEY,
  created_on TIMESTAMP,
  created_by INT REFERENCES users (id) ON DELETE CASCADE,
  type VARCHAR(16) NOT NULL,
  location VARCHAR(48) NOT NULL,
  status VARCHAR(32) DEFAULT 'Draft',
  images text[][],
  videos text[][],
  comment VARCHAR(256),
  title VARCHAR(32))`;
