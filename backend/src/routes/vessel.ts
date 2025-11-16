import express from 'express';
import { protect } from '../middlewares/authMiddleware'; 
import { authorize } from '../middlewares/roleMiddleware';

import {
	createVessel,
	getVessels,
	getVesselById,
	updateVessel,
	deleteVessel,
	runInspection,
} from '../controllers/vesselController';

const router = express.Router();

// Create vessel (Admin)
router.post('/', protect, authorize("Admin"), createVessel);

// Get all vessels
router.get('/', protect, getVessels);

// Get vessel by id
router.get('/:id', protect, authorize("Admin"), getVesselById);

// Update vessel
router.put('/:id', protect, authorize("Admin"), updateVessel);

// Delete vessel
router.delete('/:id', protect, authorize("Admin"), deleteVessel);

// Run Inspections
router.post('/inspect', protect, authorize('Admin'), runInspection);

export default router;    


