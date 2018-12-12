import { Pool } from 'pg';
import dotenv from 'dotenv';
import dbConfig from '../configurations/db';

dotenv.config();

const env = process.env.NODE_ENV || 'development';
const config = dbConfig[env];

// const pool = () => {
//   if (config.connection_uri) {
//     return new Pool(config.connection_uri);
//   }
//   return new Pool({
//     user: config.username,
//     database: config.database,
//     password: config.password,
//     port: config.port
//   });
// };

let pool;
if (config.connection_uri) {
  pool = new Pool(config.connection_uri);
} else {
  pool = new Pool({
    user: config.username,
    database: config.database,
    password: config.password,
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
  }
};

export default db;
export { pool };
