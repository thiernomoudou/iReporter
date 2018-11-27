/* eslint-disable no-return-assign */
/* eslint-disable no-lonely-if */

import { incidentsData } from '../database';


/**
* Express middleware for user authentication
* @param {object} req express request object
* @param {object} res express response object
* @param {function} next express middleware next() function
* @returns {function} express next() function
*/

function incidentMiddleware(req, res, next) {
  const incidentId = parseInt(req.params.id, 10);

  // Pick the incident from the database;
  const incident = incidentsData.filter(item => item.id === incidentId);

  if (incident.length === 0) {
    res.status(404).send({
      status: 404,
      error: 'Red-flag not found'
    });
  } else {
    // Adding the incident to the req object
    [req.incident] = incident;
    next();
  }
}

export default incidentMiddleware;
