import express, { request } from "express";
import PointsCtrl from './controllers/PointsController';
import ItemsCtrl from './controllers/ItemsController';

const pointCtrl = new PointsCtrl();
const itemCtrl = new ItemsCtrl();

const routes = express.Router();

routes.get("/items", itemCtrl.index);

routes.post("/points", pointCtrl.create);
routes.get("/points", pointCtrl.index);
routes.get("/points/:id", pointCtrl.show);

export default routes;
