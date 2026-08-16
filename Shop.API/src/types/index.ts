import { SimilarProductsService } from '../services/similar-products.service';
import { ProductsService } from '../services/products.service';

export interface IProduct {
    id: string;
    title: string;
    description: string;
    price: number;
    thumbnail?: string;
    commentsCount?: number;
}

export interface ISimilarProduct {
    id: string;
    title: string;
    description: string;
    price: number;
}

export interface IComment {
    id: string;
    productId: string;
    title: string;
    email: string;
    text: string;
    createdAt?: string;
}

export interface IProduct {
    id: string;
    title: string;
    description: string;
    price: number;
}

export type ICreateProductDto = Omit<IProduct, 'id'>;

export interface IComment {
    id: string;
    productId: string;
    title: string;
    email: string;
    text: string;
}

export type ICreateCommentDto = Omit<IComment, 'id'>;


declare global {
    namespace Express {
        interface Request {
            services: {
                products: ProductsService;
                similarProducts: SimilarProductsService;
            };
        }
    }
}
