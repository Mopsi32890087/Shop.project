import { Pool } from 'mysql2/promise';
import { IProduct, ICreateProductDto } from '../types';

export class ProductsService {
    constructor(private db: Pool) {}

    async getAll(): Promise<IProduct[]> {
        const [rows] = await this.db.query('SELECT * FROM products');
        return rows as IProduct[];
    }

    async getById(id: string): Promise<IProduct | null> {
        const [rows] = await this.db.query<any[]>('SELECT * FROM products WHERE id = ?', [id]);
        return rows[0] || null;
    }

    async create(dto: ICreateProductDto): Promise<IProduct> {
        const [result] = await this.db.query<any>(
            'INSERT INTO products (title, description, price) VALUES (?, ?, ?)',
            [dto.title, dto.description, dto.price]
        );
        return {
            id: result.insertId.toString(),
            ...dto
        };
    }

    async delete(id: string): Promise<void> {
        await this.db.query('DELETE FROM products WHERE id = ?', [id]);
    }
}
