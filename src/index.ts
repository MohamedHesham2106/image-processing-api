import express, { Application, Response, Request } from 'express';
import routes from './routes/index';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
dotenv.config();
const PORT = 3000 || process.env.PORT;

const app: Application = express();
app.get('/', (req: Request, res: Response): void => {
  res.status(200).send('Welcome to Image Processing API');
});
app.use(morgan('dev'));
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
export default app;
