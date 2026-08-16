import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { dbPool } from './config/database';
import { ProductsService } from './services/products.service';
import { SimilarProductsService } from './services/similar-products.service';
import { productsRouter } from './routes/products.router';
import { similarProductsRouter } from './routes/similar-products.router';
import commentsRouter from './routes/comments.router';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const productsService = new ProductsService(dbPool);
const similarProductsService = new SimilarProductsService(dbPool);

app.use(cors());
app.use(express.json());

app.use((req, _res, next) => {
    req.services = {
        products: productsService,
        similarProducts: similarProductsService
    };
    next();
});

app.use('/api', commentsRouter);
app.use('/api/products', productsRouter);
app.use('/api/similar', similarProductsRouter);

app.listen(PORT, () => {
    console.log(`[Shop.API] Сервер запущен на http://localhost:${PORT}`);
});
