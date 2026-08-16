import axios from 'axios';

const API_HOST = process.env.API_HOST || 'http://localhost:3000';

export interface IProductData {
    title: string;
    description: string;
    price: number;
}

export interface ISimilarPair {
    productId: string;
    similarId: string;
}

export const updateProductWithSimilar = async (
    id: string,
    productData: IProductData,
    similarToAdd?: string | string[],
    similarToRemove?: string | string[]
): Promise<void> => {
    // 1. Обновление базовых полей товара
    await axios.patch(`${API_HOST}/products/${id}`, productData);

    // 2. Формирование пар для удаления
    const toRemoveIds = Array.isArray(similarToRemove)
        ? similarToRemove
        : similarToRemove
            ? [similarToRemove]
            : [];

    const pairsToRemove: ISimilarPair[] = toRemoveIds.map((similarId) => ({
        productId: id,
        similarId
    }));

    // 3. Формирование пар для добавления
    const toAddIds = Array.isArray(similarToAdd)
        ? similarToAdd
        : similarToAdd
            ? [similarToAdd]
            : [];

    const pairsToAdd: ISimilarPair[] = toAddIds.map((similarId) => ({
        productId: id,
        similarId
    }));

    // 4. Отправка запросов к API (использование pairsToRemove убирает TS6133)
    if (pairsToRemove.length > 0) {
        await axios.post(`${API_HOST}/similar/remove`, { pairs: pairsToRemove });
    }

    if (pairsToAdd.length > 0) {
        await axios.post(`${API_HOST}/similar/add`, { pairs: pairsToAdd });
    }
};
