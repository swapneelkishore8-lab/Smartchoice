import { Router, Request, Response } from 'express';
import recommendationService from '../services/recommendation.service';

const router = Router();

// Get personalized recommendations
router.post('/', async (req: Request, res: Response) => {
  try {
    const { preferences, limit } = req.body;

    if (!preferences?.category || !preferences?.budget) {
      return res.status(400).json({
        success: false,
        error: 'Category and budget are required'
      });
    }

    const recommendations = await recommendationService.getRecommendations(
      preferences,
      limit || 10
    );

    res.json({
      success: true,
      data: recommendations,
      total: recommendations.length
    });
  } catch (error) {
    console.error('Recommendation error:', error);
    res.status(500).json({ success: false, error: 'Failed to get recommendations' });
  }
});

// Quick recommendations based on use case
router.get('/quick/:category/:useCase', async (req: Request, res: Response) => {
  try {
    const { category, useCase } = req.params;
    const limit = parseInt(req.query.limit as string) || 5;

    if (!['phone', 'laptop'].includes(category)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid category. Use "phone" or "laptop"'
      });
    }

    const products = await recommendationService.getQuickRecommendations(
      category as 'phone' | 'laptop',
      useCase,
      limit
    );

    res.json({
      success: true,
      data: products,
      category,
      useCase
    });
  } catch (error) {
    console.error('Quick recommendation error:', error);
    res.status(500).json({ success: false, error: 'Failed to get quick recommendations' });
  }
});

export default router;

