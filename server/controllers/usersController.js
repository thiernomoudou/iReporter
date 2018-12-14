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
    const { userId } = req.decoded;

    const getQuery = 'SELECT * from incidents WHERE created_by=$1';
    try {
      const { rows } = await db.query(getQuery, [userId]);
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
 * Return a user profile
 * @param {object} req express request object
 * @param {object} res express response object
 * @returns {json} json
 * @memberof UsersController
 */
  async getUserProfile(req, res) {
    const { userId } = req.decoded;
    const profileQuery = 'SELECT * from users WHERE id=$1';
    try {
      const { rows } = await db.query(profileQuery, [userId]);
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
