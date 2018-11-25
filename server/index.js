import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';

import incidentsRoutes from './routes/incidentRoute';

// Set up the express app
const app = express();
const port = process.env.port || 3100;
// const env = process.env.NODE_ENV || 'development';

app.use(logger('dev')); // Log requests to the console.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/incidents', incidentsRoutes);
// app.get('/incidents', (req, res) => {
//   res.send('hello world');
// });

// port
app.listen(port, () => {
  console.log('listening on port 3100');
});

export default app;
