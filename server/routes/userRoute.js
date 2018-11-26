import { Router } from 'express';
import UsersController from '../controllers/usersController';
import authMiddleware from '../middleware/authenticate';

const usersRoutes = new Router();
const usersController = new UsersController();

// get all Users api routes for an individual user
usersRoutes.post('/', authMiddleware, usersController.getAllUserIncidents);

export default usersRoutes;
