import { Router } from 'express';
import UsersController from '../controllers/usersController';
// import authMiddleware from '../middleware/authenticate';

const usersRoutes = new Router();
const usersController = new UsersController();

// get all incidents for an individual user
usersRoutes.get('/:id/incidents', usersController.getAllUserIncidents);

// get a user profile
usersRoutes.get('/:id/profile', usersController.getUserProfile);

// usersRoutes.post('/', authMiddleware, usersController.getAllUserIncidents);

export default usersRoutes;
