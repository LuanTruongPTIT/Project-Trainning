/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import { usersRouter } from './app/routes';

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/v1/users', usersRouter);
app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to social-server!' });
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
