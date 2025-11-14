import express from 'express';
import { protect } from '../middlewares/authMiddleware'; 
import { login } from '../controllers/authController';

const router = express.Router();

// router.post('/register', register);
router.post('/login', login);


export default router;
