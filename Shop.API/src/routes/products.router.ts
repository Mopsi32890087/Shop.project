import { Router } from 'express';
import { body } from 'express-validator';
import {
    getProductsHandler,
    getProductByIdHandler,
    createProductHandler,
    deleteProductHandler
} from '../controllers/products.controller';

export const productsRouter = Router();

const createProductValidation = [
    body('title').isString().trim().notEmpty().withMessage('Название товара обязательно'),
    body('description').isString().trim().notEmpty().withMessage('Описание обязательно'),
    body('price').isNumeric().withMessage('Цена должна быть числом')
];

productsRouter.get('/', getProductsHandler);
productsRouter.get('/:id', getProductByIdHandler);
productsRouter.post('/', createProductValidation, createProductHandler);
productsRouter.delete('/:id', deleteProductHandler);
