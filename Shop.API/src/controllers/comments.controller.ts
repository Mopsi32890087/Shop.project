import { Request, Response } from 'express';
import { IComment, ICreateCommentDto } from '../types';

let comments: IComment[] = [];

export const getCommentsByProductId = (req: Request, res: Response) => {
    const { productId } = req.query;
    if (!productId) {
        return res.status(400).json({ message: 'productId обязателен' });
    }

    const productComments = comments.filter((c) => c.productId === productId);
    return res.json(productComments);
};

export const createComment = (req: Request<{}, {}, ICreateCommentDto>, res: Response) => {
    const { productId, title, email, text } = req.body;

    const newComment: IComment = {
        id: Date.now().toString(),
        productId,
        title,
        email,
        text
    };

    comments.push(newComment);
    return res.status(201).json(newComment);
};
