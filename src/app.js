import '../database';
import 'express-async-errors';

import express from 'express';
import { ValidationError } from 'sequelize';

import routes from './routes';
import { HttpException } from 'errors/HttpException';
import { validationErrorMap } from 'errors/validationErrorMap';

const app = express();

app.use(express.json());

app.use('/api', routes);

app.use((err, req, res, _) => {
  switch (true) {
    case err instanceof ValidationError:
      return res.status(422).json({ errors: validationErrorMap(err) });
    case err instanceof HttpException:
      return res.status(err.status).json(err.body);
    default:
      return res.status(500).json({ msg: 'Internal Server Error' });
  }
});

export default app;
