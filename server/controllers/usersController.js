/* eslint-disable no-return-assign */
/* eslint-disable no-lonely-if */

import { usersData, incidentsData } from '../database';

/**
 * Controller to handle all users endpoint routes
 */

class UsersController {
  /**
   * Return a list of all incidents created by a user
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns {json} json
   * @memberof UsersController
   */

  getAllUserIncidents(req, res) {
    // getting the id of the user
    const userId = parseInt(req.params.id, 10);
    const userIncidents = incidentsData.filter(item => item.createdBy === userId);
    if (userIncidents.length === 0) {
      res.status(404).send({
        status: 404,
        error: 'User not found'
      });
    } else {
      res.send({ status: 200, data: userIncidents });
    }
  }
}


export default UsersController;
