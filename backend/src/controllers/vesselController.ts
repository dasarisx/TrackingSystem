import { Request, Response } from 'express';
import  Vessel from '../models/vessel';
import { AuthRequest } from '../middlewares/authMiddleware';

const fetchVessels = async (query: Record<string, any>) => {
  return await Vessel.aggregate([
      { $match: query },

      // Lookup issues for each vessel
      {
        $lookup: {
          from: "issues",           // collection name in MongoDB
          localField: "_id",
          foreignField: "vesselId",
          as: "issues",
        },
      },

      // Add field "issueCount" to vessel
      {
        $addFields: {
          issueCount: { $size: "$issues" }
        },
      },

      // Remove issues array (optional)
      {
        $project: {
          issues: 0
        }
      }
    ]);
}

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
    let query = {}
    if(req.user?.role === 'Crew'){
      query = {_id: { $in: req.user?.assignedVesselIds }}
    }
    
    const vessels = await fetchVessels(query);

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

export const runInspection = async (req: AuthRequest, res: Response) => {
  try {
    // Fetch vessels with issueCount
    const vessels = await fetchVessels({});

    // Update each vessel based on issueCount
    for (const vessel of vessels) {
      const updateData: any = {
        lastInspectionDate: new Date(),
      };

      if (vessel.issueCount >= 3) {
        updateData.status = "Maintenance";
      }

      await Vessel.updateOne(
        { _id: vessel._id },
        { $set: updateData }
      );
    }

    // Fetch updated vessels again (optional)
    const updatedVessels = await fetchVessels({});

    res.json(updatedVessels);
  } catch (error: any) {
    console.error("Get Vessels error:", error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
}




