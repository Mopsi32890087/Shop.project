import { Router } from 'express';
import {
    getSimilarHandler,
    addSimilarHandler,
    removeSimilarHandler
} from '../controllers/similar-products.controller';
import {
    addSimilarValidation,
    removeSimilarValidation
} from '../middleware/validation.middleware';

export const similarProductsRouter = Router();

similarProductsRouter.get('/:id', getSimilarHandler);
similarProductsRouter.post('/add', addSimilarValidation, addSimilarHandler);
similarProductsRouter.post('/remove', removeSimilarValidation, removeSimilarHandler);
