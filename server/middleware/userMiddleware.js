/* eslint-disable no-return-assign */
/* eslint-disable no-lonely-if */

import { usersData } from '../database';


/**
* Express middleware for user authentication
* @param {object} req express request object
* @param {object} res express response object
* @param {function} next express middleware next() function
* @returns {function} express next() function
*/

function userMiddleware(req, res, next) {
  // getting the id of the user
  const userId = parseInt(req.params.id, 10);

  // Pick the user from the database;
  const user = usersData.filter(item => item.id === userId);

  if (user.length === 0) {
    res.status(404).send({
      status: 404,
      error: 'User not found'
    });
  } else {
    // Adding the user to the req object
    [req.user] = user;
    next();
  }
}

export default userMiddleware;
