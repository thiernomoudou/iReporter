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

// Update an incident
incidentsRoutes.put('/:id', incidentsController.updateIncident);

// Patch an incident
incidentsRoutes.patch('/:id/:attribute', incidentsController.performantIncidentUpdate);

// Delete  an incident
incidentsRoutes.delete('/:id', incidentsController.deleteIncident);

export default incidentsRoutes;
