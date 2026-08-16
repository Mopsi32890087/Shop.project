import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

export const getSimilarHandler = async (req: Request, res: Response) => {
    const { id } = req.params;
    const list = await req.services.similarProducts.getSimilarByProductId(id);
    res.status(200).json(list);
};

export const addSimilarHandler = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    await req.services.similarProducts.addSimilarPairs(req.body);
    res.status(201).json({ message: 'Связи успешно добавлены' });
};

export const removeSimilarHandler = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    await req.services.similarProducts.removeConnectionsForProducts(req.body);
    res.status(200).json({ message: 'Связи успешно удалены' });
};
