/* eslint-disable no-return-assign */
/* eslint-disable no-lonely-if */

import { usersData, incidentsData } from '../database';

/**
 * Controller to handle all users endpoint routes
 */

class UsersController {
  /**
   * Return a list of all Users
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns {json} json
   * @memberof UsersController
   */

  getAllUserIncidents(req, res) {
    // return all incident belonging to an individual user from the database
    const reqBody = req.body;
    const { userName, password } = reqBody;

    // getting information of the individual from the database
    const indUser = usersData.filter(user => user.userName === userName);


    // If the user exits
    if (indUser.length === 0) {
      res.status(404).send({
        status: 404,
        error: 'User does not exist'
      });
    } else {
      if (password !== indUser[0].password) {
        res.status(401).send({
          status: 401,
          error: 'Password does not match'
        });
      } else {
      // getting the id of the user
        const userId = indUser[0].id;
        const userIncidents = incidentsData.filter(item => item.createdBy === userId);
        res.send({ status: 200, data: userIncidents });
      }
    }
  }
}

export default UsersController;
