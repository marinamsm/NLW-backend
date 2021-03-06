import express from 'express';
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';
import routes from './routes';
import { errors } from 'celebrate';


const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(routes);
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(errors());

app.listen(3333);