import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';

// Set up the express app
const app = express();
// const env = process.env.NODE_ENV || 'development';

app.use(logger('dev')); // Log requests to the console.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// test route
app.get('/', (req, res) => {
  res.send('Welcome to iReporter');
});

// port
app.listen(3100, () => {
  console.log('listening on port 3100');
});
