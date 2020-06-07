import express, { request } from "express";
import { celebrate, Joi } from 'celebrate';
import multer from 'multer';
import multerConfig from './config/multer';
import PointsCtrl from './controllers/PointsController';
import ItemsCtrl from './controllers/ItemsController';

const pointCtrl = new PointsCtrl();
const itemCtrl = new ItemsCtrl();

const routes = express.Router();
const upload = multer(multerConfig);

routes.get("/items", itemCtrl.index);

routes.get("/points", pointCtrl.index);
routes.get("/points/:id", pointCtrl.show);
routes.post("/points", 
    upload.single('image'),
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            whatsapp: Joi.string().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            items: Joi.string().required()
        })
    }, {
        abortEarly: false
    }),
    pointCtrl.create);

export default routes;
