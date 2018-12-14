import { Router } from 'express';
import UsersController from '../controllers/usersController';
import AuthController from '../controllers/authController';
import authMiddleware from '../middleware/authMiddleware';
// import authMiddleware from '../middleware/authenticate';

const usersRoutes = new Router();
const usersController = new UsersController();
const authController = new AuthController();

usersRoutes.get('/',  usersController.getAllUsers);
// get a user profile
// Get all incidents for an individual user
usersRoutes.get('/:id/incidents', authMiddleware, usersController.getAllUserIncidents);
// get a user profile
usersRoutes.get('/:id/profile', authMiddleware, usersController.getUserProfile);
// signup endpoints
usersRoutes.post('/signup', authController.signup);
usersRoutes.post('/signin', authController.signin);

// usersRoutes.post('/', authMiddleware, usersController.getAllUserIncidents);

export default usersRoutes;
