import { Router } from 'express';
import IncidentsController from '../controllers/incidentsController';

const incidentsRoutes = new Router();
const incidentsController = new IncidentsController();

// get all incident api routes
incidentsRoutes.get('/', incidentsController.getAllIncidents);

export default incidentsRoutes;
