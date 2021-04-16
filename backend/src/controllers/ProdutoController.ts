import { Request, Response } from "express";
import { Produto } from '../models/produto/produto.models';
import { sortingTypes } from '../utils/sort';

class ProdutoController {

    index = async (req: Request, res: Response) => {
        const { type, sort } = req.query;

        const produtos = await Produto.find();

        if (sort && type) {
            const data = await Produto.find()
                .where('type').equals(type)
                .sort([[sortingTypes[sort as string].property, sortingTypes[sort as string].sort]]).exec();
            return res.status(200).json(data);
        }
        else if (sort) {
            const data = await Produto.find()
                .sort([[sortingTypes[sort as string].property, sortingTypes[sort as string].sort]]).exec();
            return res.status(200).json(data);
        }
        else if (type) {
            const data = await Produto.findByType(type as string);
            return res.status(200).json(data)
        }

        return res.status(200).json(produtos)
    }

    create = async (req: Request, res: Response) => {
        const { name, type, value, rating, thumbnail } = req.body;

        const produto = await Produto.create({
            name,
            type,
            value,
            rating,
            thumbnail
        });

        return res.status(201).json(produto)
    }

    search = async (req: Request, res: Response) => {
        const { name } = req.params;

        const produto = await Produto.find({ name: { $regex: '.*' + name + '.*', $options: 'i' } });

        return res.status(201).json(produto)
    }

    delete = async (req: Request, res: Response) => {
        const { _id } = req.params;

        Produto.deleteOne({ _id }, undefined, (err) => {
            if (err) {
                return res.sendStatus(404);
            }
            return res.sendStatus(204);
        });
        
    }

    update = async (req: Request, res: Response) => {
        const { _id } = req.params;

        Produto.updateOne({ _id }, req.body, { runValidators: true }, (err, docs) => {
            if (err) {
                return res.sendStatus(404);
            }

            return res.sendStatus(204)
        });
    }

}

export default new ProdutoController();