import PostIncidentValidator from '../validators/postIncidentValidator';

/**
 * Middleware to validate creating a incident
 * @param {req} req express req object
 * @param {res} res express res object
 * @param {next} next express next method
 * @returns {next} next - express next method
 */
function addIncidentMiddleware(req, res, next) {
  const validator = new PostIncidentValidator(req.body);
  if (!validator.isValid()) {
    return res.status(422).send({
      status: 422,
      error: validator.error
    });
  }
  next();
}

export default addIncidentMiddleware;
