import { Router } from 'express';

const route = Router();

export default function (app) {
  app.use('/test', route);

  route.get('/get', (req, res) => {
    res.send('OK').status(200);
  });
};
