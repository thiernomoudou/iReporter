/* eslint-disable no-return-assign */
/* eslint-disable no-lonely-if */

import { usersData, incidentsData } from '../database';


/**
* Express middleware for user authentication
* @param {object} req express request object
* @param {object} res express response object
* @param {function} next express middleware next() function
* @returns {function} express next() function
*/

function authMiddleware(req, res, next) {
  const reqBody = req.body;
  const { userName, password } = reqBody;

  // getting information of the individual from the database
  const indUser = usersData.filter(user => user.userName === userName);


  // If the user exits
  if (indUser.length === 0) {
    res.status(404).send({
      status: 404,
      error: 'Unauthenticated'
    });
  } else {
    if (password !== indUser[0].password) {
      res.status(401).send({
        status: 401,
        error: 'Unauthenticated'
      });
    } else {
      // Adding the authenticted user to the req object
      [req.user] = indUser;
      next();
    }
  }
}

export default authMiddleware;
