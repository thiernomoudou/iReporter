import db from '../database/index';
/**
* Express middleware for user authentication
* @param {object} req express request object
* @param {object} res express response object
* @param {function} next express middleware next() function
* @returns {function} express next() function
*/

async function isOwnerMiddleware(req, res, next) {
  const userId = req.user.id;
  const query = 'SELECT * FROM incidents where created_by=$1';
  try {
    const result = await db.query(query, [req.user.id]);
    if (userId === result.rows[0]) {
      next();
    } else {
      res.status(403).json({
        status: 403,
        error: 'Unauthorized.'
      });
    }
  } catch (err) {
    res.status(500).json({ status: 500, err });
  }
}

export default isOwnerMiddleware;
