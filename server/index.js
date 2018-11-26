import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';

import incidentsRoutes from './routes/incidentRoute';

// Set up the express app
const app = express();
const port = process.env.port || 3100;
// const env = process.env.NODE_ENV || 'development';

//  Enable CORS for the express server
app.use(cors());
app.options('*', cors());

app.use(logger('dev')); // Log requests to the console.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/incidents', incidentsRoutes);

// Unmatched routes
app.get('*', (req, res) => {
  res.status(404).send({
    status: 404,
    error: 'Route not found'
  });
});

// port
app.listen(port, () => {
});

export default app;
