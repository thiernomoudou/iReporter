import moment from 'moment';
import 'babel-polyfill';
import ExpressValidator from 'express-validator/check';

import authHelper from '../helpers/authHelper';
import errorHandler from '../helpers/errorHandler';
import UserModel from '../database/userModel';

const { validationResult } = ExpressValidator;
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
    const errors = validationResult(req).array().map(error => error.msg);
    if (errors.length < 1) {
      const hashPassword = authHelper.hashPassword(req.body.password);
      const userObj = req.body;
      userObj.password = hashPassword;
      userObj.registered = moment(new Date());
      userObj.modifieddate = moment(new Date());
      const user = await UserModel.createUser(userObj);
      if (!(user.rowCount === 1)) {
        return res.status(400).json({
          status: 400, error: 'User with that USERNAME Or EMAIL already exist'
        });
      }
      const userToken = authHelper.generateUser(user.rows[0]);
      const token = authHelper.generateToken(userToken);
      res.status(201).json({
        status: 201, data: [{ token, user: userToken, }],
      });
    } else {
      res.status(400).json({
        status: 400, error: errors
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
      return res.status(400).json(errorHandler.emailOrPwordMissing);
    }
    if (!authHelper.isValidEmail(req.body.email)) {
      return res.status(400).json(errorHandler.invalidEmail);
    }
    try {
      const user = await UserModel.findByEmail(req.body.email);
      if (!user[0]) { return res.status(400).json(errorHandler.noAccount); }
      if (!authHelper.comparePassword(user[0].password, req.body.password)) {
        return res.status(400).json(errorHandler.invalidCreds);
      }
      const userAttributes = authHelper.generateUser(user);
      const token = authHelper.generateToken(userAttributes);
      res.status(200).json({
        status: 200,
        data: [{ token, user: userAttributes }]
      });
    } catch (error) {
      res.status(400).json({ status: 400, error });
    }
  }
}
