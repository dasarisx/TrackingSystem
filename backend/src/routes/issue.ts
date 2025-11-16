import express from 'express';
import { protect } from '../middlewares/authMiddleware'; 
import { authorize } from '../middlewares/roleMiddleware';
import {
  createIssue,
  getIssues,
  getIssueById,
  updateIssue,
  deleteIssue,

} from '../controllers/issueController';
const router = express.Router();

// Create a new issue
router.post('/', protect, createIssue);
// Get all issues
router.get('/', protect, getIssues);
// Get single issue by ID
router.get('/:id', protect, authorize("Admin"), getIssueById);  
// Update issue by ID
router.put('/:id', protect, authorize("Admin"), updateIssue);
// Delete issue by ID
router.delete('/:id', protect, authorize("Admin"), deleteIssue);

export default router;
