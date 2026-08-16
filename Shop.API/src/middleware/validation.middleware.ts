import { body } from 'express-validator';

export const addSimilarValidation = [
    body().isArray({ min: 1 }).withMessage('Тело запроса должно быть массивом'),
    body('*.0').isString().notEmpty().withMessage('ID исходного товара обязателен'),
    body('*.1').isString().notEmpty().withMessage('ID похожего товара обязателен')
];

export const removeSimilarValidation = [
    body().isArray({ min: 1 }).withMessage('Тело запроса должно быть массивом ID'),
    body('*').isString().notEmpty().withMessage('Каждый элемент должен быть строковым ID')
];
