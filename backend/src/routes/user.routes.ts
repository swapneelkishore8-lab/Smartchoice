import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { authenticate } from '../middleware/auth';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Register
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, error: 'Email already registered' });
    }

    const user = new User({ email, password, name });
    await user.save();

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      success: true,
      data: {
        user: { id: user._id, email: user.email, name: user.name },
        token
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, error: 'Registration failed' });
  }
});

// Login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !user.isActive) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    user.lastLogin = new Date();
    await user.save();

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      success: true,
      data: {
        user: { id: user._id, email: user.email, name: user.name },
        token
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, error: 'Login failed' });
  }
});

// Get current user profile
router.get('/profile', authenticate, async (req: Request, res: Response) => {
  try {
    const user = await User.findById((req as any).user.userId)
      .select('-password');
    
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    res.json({ success: true, data: user });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch profile' });
  }
});

// Update user preferences
router.put('/preferences', authenticate, async (req: Request, res: Response) => {
  try {
    const { preferences } = req.body;
    
    const user = await User.findByIdAndUpdate(
      (req as any).user.userId,
      { preferences },
      { new: true }
    ).select('-password');

    res.json({ success: true, data: user });
  } catch (error) {
    console.error('Preferences update error:', error);
    res.status(500).json({ success: false, error: 'Failed to update preferences' });
  }
});

// Add to wishlist
router.post('/wishlist', authenticate, async (req: Request, res: Response) => {
  try {
    const { productId } = req.body;
    
    const user = await User.findByIdAndUpdate(
      (req as any).user.userId,
      { $addToSet: { 'wishlist.products': productId } },
      { new: true }
    ).select('-password');

    res.json({ success: true, data: user?.wishlist });
  } catch (error) {
    console.error('Wishlist error:', error);
    res.status(500).json({ success: false, error: 'Failed to update wishlist' });
  }
});

// Remove from wishlist
router.delete('/wishlist/:productId', authenticate, async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(
      (req as any).user.userId,
      { $pull: { 'wishlist.products': req.params.productId } },
      { new: true }
    ).select('-password');

    res.json({ success: true, data: user?.wishlist });
  } catch (error) {
    console.error('Wishlist error:', error);
    res.status(500).json({ success: false, error: 'Failed to update wishlist' });
  }
});

// Add price alert
router.post('/price-alert', authenticate, async (req: Request, res: Response) => {
  try {
    const { productId, targetPrice } = req.body;
    
    const user = await User.findByIdAndUpdate(
      (req as any).user.userId,
      { 
        $push: { 
          'wishlist.alerts': { productId, targetPrice, createdAt: new Date() } 
        } 
      },
      { new: true }
    ).select('-password');

    res.json({ success: true, data: user?.wishlist?.alerts });
  } catch (error) {
    console.error('Price alert error:', error);
    res.status(500).json({ success: false, error: 'Failed to create price alert' });
  }
});

// Add to comparison list
router.post('/compare', authenticate, async (req: Request, res: Response) => {
  try {
    const { productId } = req.body;
    
    const user = await User.findByIdAndUpdate(
      (req as any).user.userId,
      { 
        $addToSet: { comparisonList: productId },
        $push: { comparisonList: { $each: [], $slice: 4 } }
      },
      { new: true }
    ).select('-password');

    res.json({ success: true, data: user?.comparisonList });
  } catch (error) {
    console.error('Compare error:', error);
    res.status(500).json({ success: false, error: 'Failed to update comparison list' });
  }
});

// Remove from comparison list
router.delete('/compare/:productId', authenticate, async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(
      (req as any).user.userId,
      { $pull: { comparisonList: req.params.productId } },
      { new: true }
    ).select('-password');

    res.json({ success: true, data: user?.comparisonList });
  } catch (error) {
    console.error('Compare error:', error);
    res.status(500).json({ success: false, error: 'Failed to update comparison list' });
  }
});

export default router;

