import { Router } from 'express';
import IncidentsController from '../controllers/incidentsController';
import isOwner from '../middleware/isOwnerMiddleware';
import authMiddlware from '../middleware/authMiddleware';
import validation from '../middleware/addIncidentValidatorMiddleware'

const incidentsRoutes = new Router();
const incidentsController = new IncidentsController();

// get all incidents api routes
incidentsRoutes.get('/', incidentsController.getAllIncidents);

// get a specifict incident
incidentsRoutes.get('/:id', incidentsController.getSpecificIncident);

// Create an incident
incidentsRoutes.post('/', authMiddlware, validation, incidentsController.createIncident);

// Patch an incident
incidentsRoutes.patch('/:id/:attribute', authMiddlware, isOwner, incidentsController.patchIncident);

// Delete  an incident
incidentsRoutes.delete('/:id', authMiddlware, isOwner, incidentsController.deleteIncident);

export default incidentsRoutes;
