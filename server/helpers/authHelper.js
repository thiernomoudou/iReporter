import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const authHelper = {

  /**
   * Hash Password Method
   * @param {string} password
   * @returns {string} returns hashed password
   */
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  },
  /**
   * comparePassword
   * @param {string} hashPassword
   * @param {string} password
   * @returns {Boolean} return True or False
   */
  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },
  /**
   * isValidEmail helper method
   * @param {string} email
   * @returns {Boolean} True or False
   */
  isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  },
  /**
   * Gnerate Token
   * @param {object} id
   * @returns {string} token
   */
  generateToken(payload) {
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    return token;
  },
  /**
   * User token
   * @param {object}
   * @returns {object} user
   */
  generateUser(user) {
    const {
      id, username, email, isadmin
    } = user;
    return {
      id,
      username,
      email,
      isadmin
    };
  }
};

export default authHelper;
