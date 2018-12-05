import { Router } from 'express';
import IncidentsController from '../controllers/incidentsController';
import incidentMiddleware from '../middleware/incidentMiddleware';
import addIncidentMiddleware from '../middleware/addIncidentValidatorMiddleware';

const incidentsRoutes = new Router();
const incidentsController = new IncidentsController();

// get all incidents api routes
incidentsRoutes.get('/', incidentsController.getAllIncidents);

// get a specifict incident
incidentsRoutes.get('/:id', incidentMiddleware, incidentsController.getSpecificIncident);

// Create an incident
incidentsRoutes.post('/', addIncidentMiddleware, incidentsController.createIncident);

// Update an incident
incidentsRoutes.put('/:id', incidentMiddleware, incidentsController.updateIncident);

// Patch an incident
incidentsRoutes.patch('/:id/:attribute', incidentMiddleware, incidentsController.performantIncidentUpdate);

// Delete  an incident
incidentsRoutes.delete('/:id', incidentMiddleware, incidentsController.deleteIncident);

export default incidentsRoutes;
