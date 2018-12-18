import moment from 'moment';
import 'babel-polyfill';

import authHelper from '../helpers/authHelper';
import UserModel from '../database/userModel';
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
      return res.status(400).json({
        status: 400,
        error: 'Email or Password are missing'
      });
    }
    if (!authHelper.isValidEmail(req.body.email)) {
      return res.status(400).json({
        status: 400, error: 'Please enter a valid email address'
      });
    }
    // Hashing the password entered by the user
    const hashPassword = authHelper.hashPassword(req.body.password);
    const userObj = req.body;
    userObj.password = hashPassword;
    userObj.registered = moment(new Date());
    userObj.modifieddate = moment(new Date());
    try {
      const user = await UserModel.createUser(userObj);
      const userToken = {
        id: user[0].id,
        username: user[0].username,
        email: user[0].email,
        isadmin: user[0].isadmin
      };
      const token = authHelper.generateToken(userToken);
      return res.status(201).json({
        status: 201,
        data: [
          {
            token,
            user: userToken,
          },
        ],
      });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).json({
          status: 400, error: 'User with that USERNAME Or EMAIL already exist'
        });
      }
      return res.status(400).json({
        status: 400,
        error
      });
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
      return res.status(400).json({
        status: 400,
        error: 'Email or Password are missing'
      });
    }
    if (!authHelper.isValidEmail(req.body.email)) {
      return res.status(400).json({
        status: 400,
        error: 'Please enter a valid email address'
      });
    }
    try {
      const user = await UserModel.findByEmail(req.body.email);
      if (!user[0]) {
        return res.status(400).json({
          status: 400,
          error: 'You do not have an active account. Please signup'
        });
      }
      if (!authHelper.comparePassword(user[0].password, req.body.password)) {
        return res.status(400).json({
          status: 400,
          error: 'The credentials you provided are incorrects'
        });
      }
      const userToken = {
        id: user[0].id,
        username: user[0].username,
        email: user[0].email,
        isadmin: user[0].isadmin
      };
      const token = authHelper.generateToken(userToken);
      return res.status(200).json({
        status: 200,
        data: [{
          token,
          user: userToken
        }]
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error
      });
    }
  }
}
