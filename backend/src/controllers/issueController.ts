import {Request, Response} from 'express';
import { Issue } from '../models/issue';

import {AuthRequest} from '../middlewares/authMiddleware';

export const createIssue = async (req: AuthRequest, res: Response) => {
  try {
    const {vesselId, category, description, priority, status} = req.body;

    //Check if open issues for vessel exceed limit (e.g., 3)
    const openIssueCount = await Issue.countDocuments({vesselId, status: 'Open'});
    if (openIssueCount >= 3) {
      return res.status(400).json({message: 'Cannot create issue. Open issue limit for this vessel reached.'});
    }
    
    if (!vesselId || !category || !priority) {
      return res.status(400).json({message: 'Vessel ID, Category, and Priority are required'});
    }   
    const issue = await Issue.create({
      userId: req.user!._id,
      vesselId, 
      category,
      description,   
      priority,
      status, 
    });
    res.status(201).json(issue);
  } catch (error: any) {
    res.status(500).json({message: error.message || 'Server error'});
  }
};

export const getIssues = async (req: AuthRequest, res: Response) => {
  try {
    let query = {}
    if( req.user?.role !== 'Admin'){
      query = {userId: req.user?._id}
    }
    const issues = await Issue.find(query).populate('vesselId', 'imo').populate('userId', 'email');    
    res.json(issues);
    } catch (error: any) {  
    res.status(500).json({message: error.message || 'Server error'});
    }
};

export const updateIssue = async (req: AuthRequest, res: Response) => {   
  try {
    const {id} = req.params;
    const {status} = req.body;
    const issue = await Issue.findById(id);
    if (!issue) {
      return res.status(404).json({message: 'Issue not found'});
    }
    issue.status = status || issue.status;
    await issue.save();
    res.json(issue);
  } catch (error: any) {
    res.status(500).json({message: error.message || 'Server error'});
  }
};


export const deleteIssue = async (req: AuthRequest, res: Response) => {
  try {
    const {id} = req.params;
    const issue = await Issue.findById(id);    
    if (!issue) {
      return res.status(404).json({message: 'Issue not found'});
    }
    await issue.deleteOne();
    res.json({message: 'Issue deleted successfully'});
  } catch (error: any) {
    res.status(500).json({message: error.message || 'Server error'});
  }
};

export const getIssueById = async (req: AuthRequest, res: Response) => {
  try {
    const issue = await Issue.findById(req.params.id)
      .populate('vesselId')
      .populate('userId', 'name email');
    if (!issue) {
      return res.status(404).json({message: 'Issue not found'});
    } 
    res.json(issue);
  } catch (error: any) {
    res.status(500).json({message: error.message || 'Server error'});
  } 
};


