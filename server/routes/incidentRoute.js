import { Router } from 'express';
import IncidentsController from '../controllers/incidentsController';

const incidentsRoutes = new Router();
const incidentsController = new IncidentsController();

// get all incidents api routes
incidentsRoutes.get('/', incidentsController.getAllIncidents);

// get a specifict incident
incidentsRoutes.get('/:id', incidentsController.getSpecificIncident);

// Create an incident
incidentsRoutes.post('/', incidentsController.createIncident);

export default incidentsRoutes;
