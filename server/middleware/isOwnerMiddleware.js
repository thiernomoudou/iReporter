import db from '../database/index';
/**
* Express middleware for user authentication
* @param {object} req express request object
* @param {object} res express response object
* @param {function} next express middleware next() function
* @returns {function} express next() function
*/

async function isOwnerMiddleware(req, res, next) {
  const incidentId = parseInt(req.params.id, 10);
  const { userId } = req.decoded;
  // const { isAdmin } = req.decoded;
  const query = 'SELECT * FROM incidents where id=$1';
  try {
    const result = await db.query(query, [incidentId]);
    if (userId === result.rows[0].created_by) {
      next();
    } else {
      res.status(403).json({
        status: 403,
        error: 'Forbidden.'
      });
    }
  } catch (err) {
    res.status(500).json({ status: 500, err });
  }
}

export default isOwnerMiddleware;
