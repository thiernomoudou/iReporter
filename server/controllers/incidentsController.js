/* eslint-disable no-return-assign */
import 'babel-polyfill';
import moment from 'moment';
import db from '../database/index';

import IncidentModel from '../database/incidentModel';

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
  async getAllIncidents(req, res) {
    try {
      const incidents = await IncidentModel.findAllIncidents();
      if (!incidents) {
        return res.status(404).json({
          status: 404,
          error: 'Red-flag or Intervention not found'
        });
      }
      return res.json({ status: 200, data: incidents });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: 'You request contains some errors'
      });
    }
  }

  /**
   * Find a specific incident
   *
   * @param {obj} req express request object
   * @param {any} res express response object
   * @returns {json} incident
   * @memberof incidentsController
   */
  async getSpecificIncident(req, res) {
    const incidentId = parseInt(req.params.id, 10);
    try {
      const incident = await IncidentModel.findOneIncident(incidentId);
      if (!incident[0]) {
        return res.status(404).json({
          status: 404,
          error: 'Red-flag not found'
        });
      }
      return res.status(200).json({ status: 200, data: [incident[0]] });
    } catch (error) {
      return res.status(400).json({ status: 400, error: 'Bad request' });
    }
  }

  /**
   * Save a new incident into the database
   *
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns {json} json of newly created incident
   * @memberof incidentsController
   */

  async createIncident(req, res) {
    const payload = req.body;
    payload.createdby = req.decoded.id.id;
    payload.createdon = moment(new Date());
    payload.status = 'Draft';
    try {
      const incident = await IncidentModel.createIncident(payload);
      return res.status(201).json({
        status: 201,
        data: [{
          id: incident[0].id,
          message: `Created ${incident[0].type} record`
        }]
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: 'Incident not created'
      });
    }
  }
  /**
   * Update a specifc incident into the database
   *
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns {json} json of newly created incident
   * @memberof incidentsController
   */

  async patchIncident(req, res) {
    const { isadmin } = req.decoded.id;
    const incidentId = parseInt(req.params.id, 10);
    const attributeToPatch = req.params.attribute;
    const patchQuery = `UPDATE incidents
      SET ${attributeToPatch}=$1 WHERE id=$2`;
    const values = [
      req.body[attributeToPatch],
      incidentId
    ];
    if (attributeToPatch === 'status' && isadmin === false) {
      return res.status(403).json({
        status: 403,
        error: 'Forbidden.'
      });
    }
    if (!incidentId) {
      return res.status(404).json({
        status: 404,
        error: 'Red-flag not found'
      });
    }
    try {
      const result = await db.query(patchQuery, values);
      if (result) {
        return res.status(200).json({
          status: 200,
          data: [{
            id: incidentId,
            message: `Updated Incident record ${attributeToPatch}`
          }]
        });
      }
    } catch (error) {
      return res.status(404).json({
        status: 404, error: 'Id or attribute does not exist'
      });
    }
  }

  /**
   * Delete a specifc incident into the database
   *
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns {json} json of newly created incident
   * @memberof incidentsController
   */

  async deleteIncident(req, res) {
    const incidentId = parseInt(req.params.id, 10);
    try {
      const incident = await IncidentModel.delete(incidentId);
      return res.status(200).json({
        status: 200,
        data: [{
          id: incident.rows[0].id,
          message: 'red flag has been deleted'
        }]
      });
    } catch (error) {
      return res.status(404).json({
        status: 404, error: 'Id or attribute does not exist'
      });
    }
  }
}
export default IncidentsController;
