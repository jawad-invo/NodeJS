import express from 'express';
const routes = require('./Routes/routes');

const app = express();
const port: number = 8080;

app.use('/api', routes);

app.listen(port, (): void => {
  return console.log(`Express is listening at http://127.0.0.1:${port}`);
});