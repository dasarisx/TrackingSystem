import {Request, Response} from 'express';
import {User} from '../models/user';
import {AuthRequest} from '../middlewares/authMiddleware';

export const createUser = async (req: AuthRequest, res: Response) => {
  try {
    const {email, password, role, assignedVesselIds} = req.body;
    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res.status(400).json({message: 'User with this email already exists'});
    } 
    const user = new User({email, password, role, assignedVesselIds});
    await user.save();
    res.status(201).json(user);
  } catch (error: any) {  
    res.status(500).json({message: error.message || 'Server error'});
  } 
};

export const deleteUser = async (req: AuthRequest, res: Response) => {
  try {
    const {id} = req.params;
    const user = await  User.findById(id);    
    if (!user) {
      return res.status(404).json({message: 'User not found'});
    }
    await user.deleteOne();
    res.json({message: 'User deleted successfully'});
  } 
  catch (error: any) {
    res.status(500).json({message: error.message || 'Server error'});
  }
};

export const getUsers = async (req: AuthRequest, res: Response) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error: any) {
    res.status(500).json({message: error.message || 'Server error'});
  }
};

export const getUserById = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select('-password');  
    if (!user) {
      return res.status(404).json({message: 'User not found'});
    } 
    res.json(user);
  } catch (error: any) {
    res.status(500).json({message: error.message || 'Server error'});
  } 
};

export const updateUser = async (req: AuthRequest, res: Response) => {
  try {
    const {id} = req.params;
    const {role, assignedVesselIds} = req.body;
    const user = await User.findById(id); 
    if (!user) {
      return res.status(404).json({message: 'User not found'});
    } 
        
    // if (password) user.password = password;
    if (role) user.role = role;
    if (assignedVesselIds) user.assignedVesselIds = assignedVesselIds;

    await user.save();
    res.json(user);
  } catch (error: any) {
    res.status(500).json({message: error.message || 'Server error'});
  }   
};

