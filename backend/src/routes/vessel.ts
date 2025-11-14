import express from 'express';
import { protect } from '../middlewares/authMiddleware'; 
import { authorize } from '../middlewares/roleMiddleware';

import {
	createVessel,
	getVessels,
	getVesselById,
	updateVessel,
	deleteVessel,
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

export default router;    


