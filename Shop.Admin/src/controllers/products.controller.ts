import { Request, Response } from 'express';
import axios from 'axios';
import { updateProductWithSimilar } from '../models/products.model';

const API_HOST = process.env.API_HOST || 'http://localhost:3000';

/**
 * Рендеринг страницы детализации и редактирования товара (/admin/edit-product/:id)
 */
export const renderProductDetails = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        // Параллельное получение данных редактируемого товара, его похожих товаров и всего каталога
        const [productRes, similarRes, allProductsRes] = await Promise.all([
            axios.get(`${API_HOST}/products/${id}`),
            axios.get(`${API_HOST}/similar/${id}`),
            axios.get(`${API_HOST}/products`)
        ]);

        const product = productRes.data;
        const similarProducts = similarRes.data || [];
        const allProducts = allProductsRes.data || [];

        // Исключаем из списка остальных товаров текущий товар и те, которые уже в похожих
        const similarIds = new Set(similarProducts.map((p: any) => p.id));
        const otherProducts = allProducts.filter(
            (p: any) => p.id !== id && !similarIds.has(p.id)
        );

        res.render('product-details', {
            product,
            similarProducts,
            otherProducts,
            currentPath: req.originalUrl
        });
    } catch (error) {
        console.error('[Shop.Admin] Ошибка при загрузке товара:', error);
        res.status(500).render('error', { message: 'Не удалось загрузить данные товара' });
    }
};

/**
 * Обработка отправки формы сохранения изменений (POST /admin/edit-product/:id)
 */
export const handleProductUpdate = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { title, description, price, similarToAdd, similarToRemove } = req.body;

    try {
        // Вызов функции из products.model.ts для обновления данных и связей похожих товаров
        await updateProductWithSimilar(
            id,
            {
                title,
                description,
                price: Number(price)
            },
            similarToAdd,
            similarToRemove
        );

        // Перенаправляем обратно на страницу товара после успешного сохранения
        res.redirect(`/admin/edit-product/${id}`);
    } catch (error) {
        console.error('[Shop.Admin] Ошибка при обновлении товара:', error);
        res.status(500).render('error', { message: 'Ошибка при сохранении изменений' });
    }
};
