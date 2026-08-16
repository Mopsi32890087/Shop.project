import { Router } from 'express';
import {
    renderProductDetails,
    handleProductUpdate,
} from '../controllers/products.controller';

export const adminRouter = Router();

adminRouter.get('/edit-product/:id', renderProductDetails);
adminRouter.post('/edit-product/:id', handleProductUpdate);
