/* eslint-disable no-return-assign */
/* eslint-disable no-lonely-if */
import 'babel-polyfill';
import db from '../database/index';
/**
* Express middleware for user authentication
* @param {object} req express request object
* @param {object} res express response object
* @param {function} next express middleware next() function
* @returns {function} express next() function
*/

async function getSpecificUserMiddleware(req, res, next) {
  // Pick the incident from the database;
  const text = 'SELECT * FROM users WHERE id = $1';
  try {
    const userId = parseInt(req.params.id, 10);
    const { rows } = await db.query(text, [userId]);
    if (!rows[0]) {
      return res.status(404).json({
        status: 404,
        error: 'User not found'
      });
    }
    req.user = rows[0];
    next();
  } catch (error) {
    return res.status(400).json(error);
  }
}

export default getSpecificUserMiddleware;
