import { Router } from 'express';
import { getCommentsByProductId, createComment } from '../controllers/comments.controller';

const router = Router();

router.get('/comments', getCommentsByProductId);
router.post('/comments', createComment);

export default router;
