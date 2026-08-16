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

export interface ICreateCommentDto {
    productId: string;
    title: string;
    email: string;
    text: string;
}
