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

async function incidentMiddleware(req, res, next) {
  // Pick the incident from the database;
  const text = 'SELECT * FROM incidents WHERE id = $1';
  try {
    const incidentId = parseInt(req.params.id, 10);
    const { rows } = await db.query(text, [incidentId]);
    if (!rows[0]) {
      return res.status(404).json({
        status: 404,
        error: 'Red-flag or Intervention not found'
      });
    }
    req.incident = [rows];
    next();
  } catch (error) {
    return res.status(400).json(error);
  }
}

export default incidentMiddleware;
