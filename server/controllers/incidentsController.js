/* eslint-disable no-return-assign */

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
    res.send({ status: 200, data: incidentsData });
  }

  /**
   * Find a specific incident
   *
   * @param {obj} req express request object
   * @param {any} res express response object
   * @returns {json} incident
   * @memberof incidentsController
   */
  getSpecificIncident(req, res) {
    // pick the parameter passed to the request and parsing it
    const incidentId = parseInt(req.params.id, 10);
    const incident = incidentsData.filter(item => item.id === incidentId);
    res.send({ status: 200, data: incident });
  }
}


export default IncidentsController;
