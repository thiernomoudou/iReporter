import { Router } from 'express';
import UsersController from '../controllers/usersController';
import AuthController from '../controllers/authController';
import { validateSignup, validateSignin } from '../validators/inputValidator';

const usersRoutes = new Router();
const usersController = new UsersController();
const authController = new AuthController();

usersRoutes.get('/', usersController.getAllUsers);
// get a user profile
// Get all incidents for an individual user
usersRoutes.get('/:id/incidents', usersController.getAllUserIncidents);
// get a user profile
usersRoutes.get('/:id', usersController.getUserProfile);
// signup endpoints
usersRoutes.post('/signup', validateSignup, authController.signup);
usersRoutes.post('/signin', validateSignin, authController.signin);

export default usersRoutes;
