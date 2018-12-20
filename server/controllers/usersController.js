import 'babel-polyfill';

import db from '../database/index';

/**
 * Controller to handle all users endpoint routes
 */

class UsersController {
  /**
 * Return a list of all users created by a user
 * @param {object} req express request object
 * @param {object} res express response object
 * @returns {json} json
 * @memberof UsersController
 */
  async getAllUsers(req, res) {
    const text = 'SELECT * FROM users';
    try {
      const { rows } = await db.query(text);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'User not not found'
        });
      }
      return res.json({ status: 200, data: rows });
    } catch (error) {
      return res.status(400).json({ status: 400, error: 'Bad request' });
    }
  }

  /**
   * Return a list of all users created by a user
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns {json} json
   * @memberof UsersController
   */

  async getAllUserIncidents(req, res) {
    // From the userMiddleware
    const { id } = req.decoded.id;

    const getQuery = 'SELECT * from incidents WHERE createdby=$1';
    try {
      const { rows } = await db.query(getQuery, [id]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'Incident not found'
        });
      }
      return res.json({ status: 200, data: rows });
    } catch (error) {
      return res.status(400).json({ status: 400, error: 'Bad request' });
    }
  }

  /**
 * Return a user profile
 * @param {object} req express request object
 * @param {object} res express response object
 * @returns {json} json
 * @memberof UsersController
 */
  async getUserProfile(req, res) {
    const { id } = req.decoded.id;
    const profileQuery = 'SELECT * from users WHERE id=$1';
    try {
      const { rows } = await db.query(profileQuery, [id]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'User not not found'
        });
      }
      return res.json({ status: 200, data: [rows] });
    } catch (error) {
      return res.status(400).json({ status: 400, error: 'Bad request' });
    }
  }
}


export default UsersController;
