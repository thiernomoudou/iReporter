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
  const { id } = req.decoded.id;
  const query = 'SELECT * FROM incidents where id=$1';
  try {
    const result = await db.query(query, [incidentId]);
    const owner = result.rows[0].createdby;
    if (Number(id) === Number(owner)) {
      next();
    } else {
      res.status(403).json({
        status: 403,
        error: 'Forbidden. The incident is not yours'
      });
    }
  } catch (err) {
    res.status(500).json({ status: 500, err });
  }
}

export default isOwnerMiddleware;
