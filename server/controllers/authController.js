import moment from 'moment';
import db from '../database/index';
import authHelper from '../helpers/authHelper';
import 'babel-polyfill';
/**
 * Controls endpoints for authentication
 * @class AuthController
 */
export default class AuthController {
  /**
  * Register a new user
  * @param {object} req express request object
  * @param {object} res express response object
  * @returns {object} newly created user
  */
  async signup(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ message: 'Some values are missing' });
    }
    if (!authHelper.isValidEmail(req.body.email)) {
      return res.status(400).json({ message: 'Please enter a valid email address' });
    }
    const hashPassword = authHelper.hashPassword(req.body.password);
    const createQuery = `INSERT INTO
      users(username, email, password, registered, modified_date, phone_number, first_name,
        last_name, other_names, is_admin)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning *`;
    const values = [
      req.body.username,
      req.body.email,
      hashPassword,
      moment(new Date()),
      moment(new Date()),
      req.body.phone_number,
      req.body.first_name,
      req.body.last_name,
      req.body.other_names,
      false
    ];
    try {
      const { rows } = await db.query(createQuery, values);
      const token = authHelper.generateToken(rows[0].id, rows[0].username, rows[0].email, rows[0].is_admin);
      return res.status(201).json({ status: 201, token });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).json({ message: 'User with that USERNAME Or EMAIL already exist' });
      }
      return res.status(400).json({ status: 400, error });
    }
  }

  /**
   * Signin
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns {object} signed in user
   */
  async signin(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ message: 'Some values are missing' });
    }
    if (!authHelper.isValidEmail(req.body.email)) {
      return res.status(400).json({ message: 'Please enter a valid email address' });
    }
    const text = 'SELECT * FROM users WHERE email = $1';
    try {
      const { rows } = await db.query(text, [req.body.email]);
      if (!rows[0]) {
        return res.status(400).json({ message: 'The credentials you provided is incorrect' });
      }
      if (!authHelper.comparePassword(rows[0].password, req.body.password)) {
        return res.status(400).json({ message: 'The credentials you provided is incorrect' });
      }
      const token = authHelper.generateToken(rows[0].id, rows[0].username, rows[0].email, rows[0].is_admin);
      return res.status(200).json({ token });
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}
