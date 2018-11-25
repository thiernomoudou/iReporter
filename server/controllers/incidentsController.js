import incidentsData from '../database';

/**
 * Controller to handle all incidents endpoint routes
 */

class IncidentsController {
  /**
   * Return a list of all incidents
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns {json} json
   * @memberof IncidentsController
   */
  getAllIncidents(req, res) {
    // return all incidents from the database
    res.send(incidentsData);
  }
}


export default IncidentsController;
