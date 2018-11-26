import { Router } from 'express';
import UsersController from '../controllers/usersController';

const usersRoutes = new Router();
const usersController = new UsersController();

// get all Users api routes for an individual user
usersRoutes.post('/', usersController.getAllUserIncidents);

export default usersRoutes;
