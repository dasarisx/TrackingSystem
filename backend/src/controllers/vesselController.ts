import { Request, Response } from 'express';
import  Vessel from '../models/vessel';
import { AuthRequest } from '../middlewares/authMiddleware';

export const createVessel = async (req: AuthRequest, res: Response) => {
  try {
    const { name, imo, flag, type, status } = req.body;
    if (!imo || !name || !flag) {
      return res.status(400).json({ message: 'Name, IMO, and Flag are required' });
    }   
    const vessel = new Vessel({ name, imo, flag, type, status });
    await vessel.save();
    res.status(201).json(vessel);
  } catch (error: any) {
    console.error("Create Vessel error:", error);
    res.status(500).json({ message: error.message || 'Server error' });
  } 
};

export const getVessels = async (req: AuthRequest, res: Response) => {
  try {
    const vessels = await Vessel.find();
    res.json(vessels);
  } catch (error: any) {
    console.error("Get Vessels error:", error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};  

export const getVesselById = async (req: AuthRequest, res: Response) => {
  try {
    console.log("Fetching Vessel by ID:", req.params.id);
    const vessel = await Vessel.findById(req.params.id);    
    console.log("Fetched Vessel:", vessel);
    if (!vessel) {
      return res.status(404).json({ message: 'Vessel not found' });
    }   
    res.json(vessel);
  } catch (error: any) {
    console.error("Get Vessel by ID error:", error);
    res.status(500).json({ message: error.message || 'Server error' });
  } 
};

export const updateVessel = async (req: AuthRequest, res: Response) => {    
    try {
    const vessel = await Vessel.findById(req.params.id);    
    if (!vessel) {
      return res.status(404).json({ message: 'Vessel not found' });
    }   
    const { name, imo, flag, type, status } = req.body;
    if (name) vessel.name = name;
    if (imo) vessel.imo = imo;
    if (flag) vessel.flag = flag;
    if (type) vessel.type = type;   
    if (status) vessel.status = status;
    await vessel.save();
    res.json(vessel);
  } catch (error: any) {
    console.error("Update Vessel error:", error);
    res.status(500).json({ message: error.message || 'Server error' });
  } 
};

export const deleteVessel = async (req: AuthRequest, res: Response) => {    
    try {
    const vessel = await Vessel.findById(req.params.id);    
    if (!vessel) {
      return res.status(404).json({ message: 'Vessel not found' });
    }   
    await vessel.deleteOne();
    res.json({ message: 'Vessel removed' });
  } catch (error: any) {
    console.error("Delete Vessel error:", error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};




