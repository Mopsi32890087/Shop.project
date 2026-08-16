import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

export const getProductsHandler = async (req: Request, res: Response) => {
    try {
        const products = await req.services.products.getAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении товаров', error });
    }
};

export const getProductByIdHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await req.services.products.getById(id);
        if (!product) {
            return res.status(404).json({ message: 'Товар не найден' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении товара', error });
    }
};

export const createProductHandler = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { title, description, price } = req.body;
        const createdProduct = await req.services.products.create({
            title,
            description,
            price: Number(price)
        });

        // Возвращаем объект типа IProduct и статус 201
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при создании товара', error });
    }
};

export const deleteProductHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await req.services.products.delete(id);
        res.status(200).json({ message: 'Товар успешно удален' });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при удалении товара', error });
    }
};
