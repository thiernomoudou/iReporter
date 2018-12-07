import { incidentsData } from '../database';

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
    // From the userMiddleware
    const userId = req.user.id;

    const userIncidents = incidentsData.filter(item => item.createdBy === userId);

    if (userIncidents.length === 0) {
      res.status(404).send({
        status: 404,
        error: 'User does not have redflags or interventions yet'
      });
    } else {
      res.send({ status: 200, data: userIncidents });
    }
  }

  /**
 * Return a user profile
 * @param {object} req express request object
 * @param {object} res express response object
 * @returns {json} json
 * @memberof UsersController
 */

  getUserProfile(req, res) {
    // getting the user from the userMiddleware
    const userProfile = req.user;
    res.send({ status: 200, data: [userProfile] });
  }
}


export default UsersController;
