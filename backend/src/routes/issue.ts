import express from 'express';
import { protect } from '../middlewares/authMiddleware'; 
import { authorize } from '../middlewares/roleMiddleware';
import {
  createIssue,
  getIssues,
  getIssueById,
  updateIssue,
  deleteIssue,
  getIssuesByCrew,
  getOpenIssueCountByVessel

} from '../controllers/issueController';
const router = express.Router();

// Create a new issue
router.post('/', protect, createIssue);
// Get all issues
router.get('/', protect, authorize("Admin"), getIssues);
// Get single issue by ID
router.get('/:id', protect, authorize("Admin"), getIssueById);  
// Update issue by ID
router.put('/:id', protect, authorize("Admin"), updateIssue);
// Delete issue by ID
router.delete('/:id', protect, authorize("Admin"), deleteIssue);
// Get issues raised by logged-in crew member
router.get('/crew/issues', protect, getIssuesByCrew);
// Get open issue count by vessel for logged-in crew member
router.get('/vessel/open-issue-count', protect, getOpenIssueCountByVessel);


export default router;
