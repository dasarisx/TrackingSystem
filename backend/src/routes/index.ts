import express from 'express';
import authRoutes from './auth';
import issueRoutes from './issue';
import vesselRoutes from './vessel';
import userRoutes from './user';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/issues', issueRoutes);
router.use('/vessels', vesselRoutes);
router.use('/users', userRoutes);

export default router;
