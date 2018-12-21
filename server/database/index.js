import { Pool } from 'pg';
import dotenv from 'dotenv';

import dbConfig from '../configurations/db';

// Loading environment variables
dotenv.config();

const env = process.env.NODE_ENV || 'development';
const config = dbConfig[env];

let pool;

if (config.connection_uri) {
  pool = new Pool({ connectionString: config.connection_uri });
} else {
  pool = new Pool({
    database: config.database,
    username: config.username,
    password: config.password,
    host: config.host,
    port: config.port
  });
}


const db = {
  /**
   * DB Query
   * @param {string} text
   * @param {Array} params
   * @returns {object} object
   */
  query(text, params) {
    return new Promise((resolve, reject) => {
      pool.query(text, params)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  endConnection() {
    return new Promise((resolve, reject) => {
      pool.end()
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

export default db;
