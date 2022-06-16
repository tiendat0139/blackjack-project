import express from 'express';
import { getPosts } from '../controllers/posts.js';
const router = express.Router();

router.get('/', getPosts);

export default router;
//Điểu chỉnh route
