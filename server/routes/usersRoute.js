import { Router } from 'express';
import UsersController from '../controllers/usersController';
import userMiddleware from '../middleware/userMiddleware';
import AuthController from '../controllers/authController';
// import authMiddleware from '../middleware/authenticate';

const usersRoutes = new Router();
const usersController = new UsersController();
const authController = new AuthController();

// Get all incidents for an individual user
usersRoutes.get('/:id/incidents', userMiddleware, usersController.getAllUserIncidents);
// get a user profile
usersRoutes.get('/:id/profile', userMiddleware, usersController.getUserProfile);
// signup endpoint
usersRoutes.post('/signup', authController.signup);

// usersRoutes.post('/', authMiddleware, usersController.getAllUserIncidents);

export default usersRoutes;
