import 'babel-polyfill';

import db from './index';
/**
 * Model for creating users accross the app
 * @class UserModel
 */

export default class UserModel {
  /**
   * @description - Sign
   * @static
   *
   * @param {object} - User data object
   *
   * @memberof UserModel
   *
   * @returns {object} Array
   * */
  static async createUser(userObject) {
    try {
      const {
        username, email, password, registered, modifieddate, phonenumber, firstname,
        lastname, othernames, isadmin
      } = userObject;

      const createUserQuery = `INSERT INTO
      users(username, email, password, registered, modifieddate, phonenumber, firstname,
        lastname, othernames, isadmin)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning *`;
      const values = [
        username.trim(),
        email.trim(),
        password.trim(),
        registered,
        modifieddate,
        phonenumber,
        firstname,
        lastname,
        othernames,
        isadmin
      ];

      const { rows } = await db.query(createUserQuery, values);
      return rows;
    } catch (error) {
      return error;
    }
  }

  /**
   * @description - Find a user by id
   * @static
   *
   * @param {object} - User id
   *
   * @memberof UserModel
   *
   * @returns {object} Array
   * */
  static async findById(id) {
    try {
      const findQuery = 'SELECT * FROM users WHERE id=$1';
      const { rows } = await db.query(findQuery, [id]);
      return rows;
    } catch (error) {
      return error;
    }
  }

  /**
   * @description - Find a user by email
   * @static
   *
   * @param {object} - User email
   *
   * @memberof UserModel
   *
   * @returns {object} Array
   * */
  static async findByEmail(email) {
    try {
      const findQuery = 'SELECT * FROM users WHERE email=$1';
      const { rows } = await db.query(findQuery, [email]);
      return rows;
    } catch (error) {
      return error;
    }
  }
}
