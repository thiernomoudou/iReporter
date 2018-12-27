import 'babel-polyfill';

import db from './index';
/**
 * Model for creating incidents accross the app
 * @class IncidentModel
 */

export default class IncidentModel {
  /**
   * @description - create Incident
   * @static
   *
   * @param {object} - incient data object
   *
   * @memberof IncidentModel
   *
   * @returns {object} Array
   * */
  static async createIncident(incidentObject) {
    try {
      const {
        type, location, createdby, createdon, status, images, videos,
        comment, title
      } = incidentObject;

      const createIncidentQuery = `INSERT INTO
      incidents(type, location, createdby, createdon, status,
        images, videos, comment, title)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
      returning *`;

      const values = [
        type.trim(), location.trim(), createdby, createdon, status.trim(),
        images, videos, comment, title
      ];

      const { rows } = await db.query(createIncidentQuery, values);
      return rows;
    } catch (error) {
      return error;
    }
  }

  /**
   * @description - Get incident by Id
   * @static
   *
   * @param {object} - Incident id
   *
   * @memberof IncidentModel
   *
   * @returns {object} Array
   * */
  static async findOneIncident(ident) {
    try {
      const findOneQuery = 'SELECT * FROM incidents WHERE id=$1';
      const incident = await db.query(findOneQuery, [ident]);
      return incident.rows;
    } catch (error) {
      return error;
    }
  }

  /**
   * @description - Get all incidents
   * @static
   *
   * @memberof IncidentModel
   *
   * @returns {object} Array
   * */
  static async findAllIncidents() {
    try {
      const findAllQuery = 'SELECT * FROM incidents';
      const { rows } = await db.query(findAllQuery);
      return rows;
    } catch (error) {
      return error;
    }
  }

  /**
   * @description Update incident
   * @static
   *
   *  @param {object} - payload
   *
   * @memberof IncidentModel
   *
   * @returns {object} Array
   * */
  static async update(payload) {
    try {
      const { attribute, data, id } = payload;
      const updateQuery = `
        UPDATE incidents
        SET ${attribute}=$1
        WHERE id=$2
      `;
      const values = [data, id];
      const { rows } = await db.query(updateQuery, values);
      return rows;
    } catch (error) {
      return error;
    }
  }

  /**
   * @description - Delete incident
   * @static
   *
   * @param {object} - incident id
   *
   * @memberof IncidentModel
   *
   * @returns {object} Array
   * */
  static async delete(id) {
    try {
      const deleteQuery = `
        DELETE FROM incidents
        WHERE id=$1
        RETURNING id
      `;
      const res = await db.query(deleteQuery, [id]);
      return res;
    } catch (error) {
      return error;
    }
  }
}
