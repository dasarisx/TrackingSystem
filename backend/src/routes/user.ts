import express from 'express';
import { protect } from '../middlewares/authMiddleware'; 
import { authorize } from '../middlewares/roleMiddleware';
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/userController';

const router = express.Router();

// Create a new user
router.post('/', protect, authorize("Admin"), createUser);
// Get all users
router.get('/', protect, authorize("Admin"), getUsers);
// Get single user by ID
router.get('/:id', protect, authorize("Admin"), getUserById);
// Update user by ID
router.put('/:id', protect, authorize("Admin"), updateUser);
// Delete user by ID
router.delete('/:id', protect, authorize("Admin"), deleteUser);


export default router;
