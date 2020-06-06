import knex from "../database/connection";
import { Request, Response } from "express";

class ItemsCtrl {
  async index(request: Request, response: Response) {
    const IPAddress = '192.168.0.10';
    const items = await knex("items").select("*");
    const serializedItems = items.map((item) => {
      return {
        id: item.id,
        title: item.title,
        imageUrl: `http://${IPAddress}:3333/uploads/${item.image}`,
      };
    });
    response.json(serializedItems);
  }
}

export default ItemsCtrl;
