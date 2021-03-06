import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsCtrl {
    async create(request: Request, response: Response) {
        const {
            name,
            email,
            whatsapp,
            city,
            uf,
            latitude,
            longitude,
            items,
          } = request.body;
        
          try {
            const trx = await knex.transaction();
            const point = {
                image: request.file ? request.file.filename : 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80',
                name,
                email,
                whatsapp,
                city,
                uf,
                latitude,
                longitude,
              };
            const insertedIds = await trx("points").insert(point);
            const point_id = insertedIds[0];
            const pointItems = items.split(',')
            .map((item: string) => Number(item.trim()))
            .map((item_id: number) => {
              return {
                item_id,
                point_id,
              };
            });
            await trx("point_items").insert(pointItems);
            await trx.commit();
            response.json({ id: point_id, ...point });
          } catch (error) {
            response.json({ error: error.message });
          }
    };

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const point = await knex('points').where('id', id).first();

        if(!point) {
            return response.status(404).json({ message: "Not found."});
        }

        const items = await knex('items')
        .join('point_items', 'items.id', '=', 'point_items.item_id')
        .where('point_items.item_id', id);

        const IPAddress = '192.168.0.10';
        let serializedPoint = point;

        if (!point.image.includes('http')) {
          serializedPoint = {
            ...point,
            image: `http://${IPAddress}:3333/uploads/${point.image}`,
          };
        }

        response.json({ point: serializedPoint, items });
    };
    
    async index(request: Request, response: Response) {
        const { city, uf, items } = request.query;

        const parsedItems = String(items)
        .split(',')
        .map(item => Number(item.trim()));

        const points = await knex('points')
        .join('point_items', 'points.id', '=', 'point_items.point_id')
        .whereIn('point_items.item_id', parsedItems)
        .where('city', String(city))
        .where('uf', String(uf))
        .distinct()
        .select('points.*');

        const serializedPoints = points.map((point) => {
          const IPAddress = '192.168.0.10';
          if (point.image.includes('http')) return point;
          return {
            ...point,
            image: `http://${IPAddress}:3333/uploads/${point.image}`,
          };
        });

        response.json(serializedPoints);
    }
}

export default PointsCtrl;