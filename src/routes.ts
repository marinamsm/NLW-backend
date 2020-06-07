import express, { request } from "express";
import multer from 'multer';
import multerConfig from './config/multer';
import PointsCtrl from './controllers/PointsController';
import ItemsCtrl from './controllers/ItemsController';

const pointCtrl = new PointsCtrl();
const itemCtrl = new ItemsCtrl();

const routes = express.Router();
const upload = multer(multerConfig);

routes.get("/items", itemCtrl.index);

routes.post("/points", upload.single('image'), pointCtrl.create);
routes.get("/points", pointCtrl.index);
routes.get("/points/:id", pointCtrl.show);

export default routes;
