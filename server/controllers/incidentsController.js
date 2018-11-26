/* eslint-disable no-return-assign */

import { incidentsData } from '../database';

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
    if (incident.length === 0) {
      res.status(404).send({ status: 404, error: 'Red-flag not found' });
    } else {
      res.send({ status: 200, data: incident });
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

  createIncident(req, res) {
    const reqBody = req.body;
    const newIncident = {
      id: reqBody.id,
      type: reqBody.type,
      location: reqBody.location,
      images: reqBody.images,
      title: reqBody.title,
      comment: reqBody.comment,
      status: reqBody.status
    };

    const returnedData = {
      status: 201,
      data: [
        {
          id: newIncident.id,
          message: 'Created Redflag record'
        }
      ]
    };

    res.status(201).send(returnedData);
  }

  /**
   * Update a specifc incident into the database
   *
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns {json} json of newly created incident
   * @memberof incidentsController
   */

  updateIncident(req, res) {
    const reqBody = req.body;
    const incidentId = parseInt(req.params.id, 10);
    const currentIncident = incidentsData.filter(item => item.id === incidentId);

    const updatedIncident = {
      id: incidentId,
      type: reqBody.type || currentIncident[0].type,
      location: reqBody.location || currentIncident[0].location,
      images: reqBody.images || currentIncident[0].images,
      title: reqBody.title || currentIncident[0].title,
      comment: reqBody.comment || currentIncident[0].comment,
      status: reqBody.status || currentIncident[0].status
    };

    const returnedData = {
      status: 200,
      data: [
        {
          id: updatedIncident.id,
          message: 'Redflag updated'
        }
      ]
    };

    res.status(200).send(returnedData);
  }
  /**
   * Patch a specifc incident into the database
   *
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns {json} json of newly created incident
   * @memberof incidentsController
   */

  performantIncidentUpdate(req, res) {
    const reqBody = req.body;
    const incidentId = parseInt(req.params.id, 10);
    const currentIncident = incidentsData.filter(item => item.id === incidentId);
    const attributeToUpdate = req.params.attribute;
    const incidentToPacth = currentIncident[0];
    // Apply the patch
    incidentToPacth[attributeToUpdate] = reqBody[attributeToUpdate];
    const returnedData = {
      status: 200,
      data: [
        {
          id: incidentToPacth.id,
          message: 'Updated red-flag record’s comment',
        }
      ]
    };

    res.status(200).send(returnedData);
  }

  /**
   * Delete a specifc incident into the database
   *
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns {json} json of newly created incident
   * @memberof incidentsController
   */

  deleteIncident(req, res) {
    const incidentId = parseInt(req.params.id, 10);

    // Delete the incident
    incidentsData.filter(item => item.id !== incidentId);

    const returnedData = {
      status: 200,
      data: [
        {
          id: incidentId,
          message: 'red-flag record has been deleted',
        }
      ]
    };

    res.status(200).send(returnedData);
  }
}


export default IncidentsController;
