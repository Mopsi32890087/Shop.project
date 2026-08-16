import { apiClient } from '../api';
import { IProduct, ISimilarProduct, IComment, ICreateCommentDto } from '../types';

export const getProducts = async (): Promise<IProduct[]> => {
    const response = await apiClient.get<IProduct[]>('/products');
    return response.data;
};

export const getSimilarProducts = async (productId: string): Promise<ISimilarProduct[]> => {
    const response = await apiClient.get<ISimilarProduct[]>(`/similar/${productId}`);
    return response.data;
};

export const addComment = async (dto: ICreateCommentDto): Promise<IComment> => {
    const response = await apiClient.post<IComment>('/comments', dto);
    return response.data;
};
