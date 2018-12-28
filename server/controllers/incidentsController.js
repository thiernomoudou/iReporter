/* eslint-disable no-return-assign */
import 'babel-polyfill';
import moment from 'moment';
import ExpressValidator from 'express-validator/check';

import IncidentModel from '../database/incidentModel';
import errorHandler from '../helpers/errorHandler';

const { validationResult } = ExpressValidator;


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
    const incidents = await IncidentModel.findAllIncidents();
    if (!incidents) {
      return res.status(404).json({
        status: 404,
        error: 'Red-flag or Intervention not found'
      });
    }
    return res.json({ status: 200, data: incidents });
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
    const incident = await IncidentModel.findOneIncident(incidentId);
    if (!incident[0]) {
      return res.status(404).json({
        status: 404,
        error: 'Incident not found'
      });
    }
    res.status(200).json({ status: 200, data: [incident[0]] });
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
    // get all errors from express validator
    const errors = validationResult(req).array().map(error => error.msg);
    if (errors.length < 1) {
      const payload = req.body;
      payload.createdby = req.decoded.id;
      payload.createdon = moment(new Date());
      payload.status = 'Draft';
      const incident = await IncidentModel.createIncident(payload);
      res.status(201).json({
        status: 201,
        data: [{
          id: incident[0].id,
          message: `Created ${incident[0].type} record`
        }]
      });
    } else {
      res.status(400).json({ status: 400, error: errors, });
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
    const errors = validationResult(req).array().map(error => error.msg);
    if (errors.length < 1) {
      const { isadmin } = req.decoded.id;
      const payload = {
        id: parseInt(req.params.id, 10),
        attribute: req.params.attribute,
      };
      payload.data = req.body[payload.attribute];
      if (payload.attribute === 'status' && !isadmin) {
        return res.status(403).json(errorHandler.adminPermission);
      }
      if (!payload.id) { return res.status(404).json(errorHandler.notFound); }
      const result = await IncidentModel.update(payload);
      if (result) {
        const { type } = result[0];
        return res.status(200).json({
          status: 200,
          data: [{ id: payload.id, message: `Updated ${type} record ${payload.attribute}` }]
        });
      }
    } else {
      res.status(400).json({ status: 400, error: errors, });
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
    const incidentToDelete = await IncidentModel.delete(incidentId);
    res.status(200).json({
      status: 200,
      data: [{
        id: incidentToDelete.rows[0].id,
        message: `${incidentToDelete.rows[0].type} record has been deleted`
      }]
    });
  }
}
export default IncidentsController;
