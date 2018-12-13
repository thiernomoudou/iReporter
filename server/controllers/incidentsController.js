/* eslint-disable no-return-assign */
import 'babel-polyfill';
import moment from 'moment';

import db from '../database/index';

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
    const text = 'SELECT * FROM incidents';
    try {
      const { rows } = await db.query(text);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'Red-flag or Intervention not found'
        });
      }
      return res.json({ status: 200, data: rows });
    } catch (error) {
      return res.status(400).json(error);
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
    const text = 'SELECT * FROM incidents WHERE id = $1';
    try {
      const { rows } = await db.query(text, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'Red-flag not found'
        });
      }
      return res.status(200).json({ status: 200, data: [rows[0]] });
    } catch (error) {
      return res.status(400).json(error);
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
    const reqBody = req.body;
    const createQuery = `INSERT INTO
      incidents(type, location, created_by, created_on, status,
        images, videos, comment, title)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
      returning *`;
    const values = [
      reqBody.type,
      reqBody.location,
      req.user.id,
      moment(new Date()),
      'Draft',
      reqBody.images,
      reqBody.videos,
      reqBody.comment,
      reqBody.title
    ];
    try {
      const { rows } = await db.query(createQuery, values);
      return res.status(201).json({
        status: 201,
        data: [{
          id: rows[0].id,
          message: `Created ${rows[0].type} record`
        }]
      });
    } catch (error) {
      return res.status(400).json(error);
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
    const incidentId = req.params.id;
    const attributeToPatch = req.params.attribute;
    const patchQuery = `UPDATE incidents
      SET ${attributeToPatch}=$1 returning WHERE id=$2 *`;
    const values = [
      req.body.attributeToPatch,
      incidentId
    ];
    try {
      const { rows } = await db.query(patchQuery, values);
      return res.status(200).json({
        status: 200,
        data: [{
          id: rows[0].id,
          message: `Updated ${rows[0].type} record ${rows[0][attributeToPatch]}`
        }]
      });
    } catch (error) {
      return res.status(400).json(error);
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
    const incidentId = req.params.id;
    const deleteQuery = 'DELETE FROM incidents WHERE id=$1';
    try {
      const { rows } = await db.query(deleteQuery, [incidentId]);
      return res.status(200).json({
        status: 200,
        data: {
          id: rows[0].id,
          message: `${rows[0].type} has been deleted`
        }
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
export default IncidentsController;
