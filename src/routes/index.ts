import express, { Request, Response } from 'express';
import images from './api/image';
const routes = express.Router();

routes.get('/', (req: Request, res: Response): void => {
  res.status(200);
  res.send('Main Route');
});
routes.use('/images', images);

export default routes;
