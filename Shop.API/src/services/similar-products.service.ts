import { Connection } from 'mysql2/promise';
import { ISimilarProduct } from '../types';

export class SimilarProductsService {
    constructor(private db: Connection) {}

    async getSimilarByProductId(productId: string): Promise<ISimilarProduct[]> {
        const [rows] = await this.db.query(
            `SELECT p.id, p.title, p.description, p.price 
       FROM products p
       INNER JOIN similar_products sp ON p.id = sp.similar_id
       WHERE sp.product_id = ?`,
            [productId]
        );
        return rows as ISimilarProduct[];
    }

    async addSimilarPairs(pairs: Array<[string, string]>): Promise<void> {
        if (pairs.length === 0) return;
        await this.db.query(
            `INSERT IGNORE INTO similar_products (product_id, similar_id) VALUES ?`,
            [pairs]
        );
    }

    async removeConnectionsForProducts(productIds: string[]): Promise<void> {
        if (productIds.length === 0) return;
        await this.db.query(
            `DELETE FROM similar_products 
       WHERE product_id IN (?) OR similar_id IN (?)`,
            [productIds, productIds]
        );
    }
}
