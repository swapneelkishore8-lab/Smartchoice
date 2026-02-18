import { Router, Request, Response } from 'express';
import Product from '../models/Product';

const router = Router();

// Get all products with filtering and pagination
router.get('/', async (req: Request, res: Response) => {
  try {
    const {
      category,
      brand,
      minPrice,
      maxPrice,
      minRam,
      minBattery,
      sortBy,
      page = 1,
      limit = 12
    } = req.query;

    const query: any = { isActive: true };

    if (category) query.category = category;
    if (brand) query.brand = { $in: (brand as string).split(',') };
    if (minPrice || maxPrice) {
      query['price.current'] = {};
      if (minPrice) query['price.current'].$gte = Number(minPrice);
      if (maxPrice) query['price.current'].$lte = Number(maxPrice);
    }
    if (minRam) query['specifications.memory.ram'] = { $gte: Number(minRam) };
    if (minBattery) query['specifications.battery.capacity'] = { $gte: Number(minBattery) };

    const sortOptions: any = {};
    if (sortBy === 'price-low') sortOptions['price.current'] = 1;
    else if (sortBy === 'price-high') sortOptions['price.current'] = -1;
    else if (sortBy === 'rating') sortOptions['ratings.overall'] = -1;
    else if (sortBy === 'newest') sortOptions.createdAt = -1;
    else sortOptions.createdAt = -1;

    const skip = (Number(page) - 1) * Number(limit);

    const products = await Product.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit))
      .select('-pros -cons -searchHistory');

    const total = await Product.countDocuments(query);

    res.json({
      success: true,
      data: products,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch products' });
  }
});

// Get product by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    res.json({ success: true, data: product });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch product' });
  }
});

// Get product by slug
router.get('/slug/:slug', async (req: Request, res: Response) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    res.json({ success: true, data: product });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch product' });
  }
});

// Get featured products
router.get('/featured/:category', async (req: Request, res: Response) => {
  try {
    const products = await Product.find({ 
      category: req.params.category,
      isActive: true,
      'ratings.overall': { $gte: 4 }
    })
    .sort({ 'ratings.overall': -1, 'ratings.count': -1 })
    .limit(6)
    .select('name brand model price images ratings.overall');

    res.json({ success: true, data: products });
  } catch (error) {
    console.error('Error fetching featured products:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch featured products' });
  }
});

// Get brands list
router.get('/filters/brands', async (req: Request, res: Response) => {
  try {
    const brands = await Product.distinct('brand', { isActive: true });
    res.json({ success: true, data: brands });
  } catch (error) {
    console.error('Error fetching brands:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch brands' });
  }
});

// Compare products
router.post('/compare', async (req: Request, res: Response) => {
  try {
    const { productIds } = req.body;
    
    if (!productIds || !Array.isArray(productIds) || productIds.length < 2) {
      return res.status(400).json({ 
        success: false, 
        error: 'At least 2 product IDs are required for comparison' 
      });
    }

    const products = await Product.find({ 
      _id: { $in: productIds },
      isActive: true 
    });

    res.json({ success: true, data: products });
  } catch (error) {
    console.error('Error comparing products:', error);
    res.status(500).json({ success: false, error: 'Failed to compare products' });
  }
});

export default router;

