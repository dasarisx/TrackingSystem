import { Request, Response } from 'express';
import { User } from '../models/user';
import { generateToken } from '../utils/jwt';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) return res.status(401).json({ message: 'User not found' });

    // Type assertion to access comparePassword
    if (user && (await (user as any).comparePassword(password))) {
      res.json({
        token: generateToken(user._id.toString()),
        user: {
          id: user._id,
          email: user.email,
          role: user.role
        }
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};