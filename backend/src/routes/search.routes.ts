import { Router, Request, Response } from 'express';
import Product from '../models/Product';

const router = Router();

// Advanced search with filters
router.get('/', async (req: Request, res: Response) => {
  try {
    const {
      q,
      category,
      brand,
      minPrice,
      maxPrice,
      minRam,
      maxRam,
      minBattery,
      processor,
      displaySize,
      storage,
      sortBy,
      page = 1,
      limit = 12
    } = req.query;

    const query: any = { isActive: true };

    // Text search
    if (q) {
      query.$text = { $search: q as string };
    }

    // Filters
    if (category) query.category = category;
    if (brand) query.brand = { $in: (brand as string).split(',') };
    
    if (minPrice || maxPrice) {
      query['price.current'] = {};
      if (minPrice) query['price.current'].$gte = Number(minPrice);
      if (maxPrice) query['price.current'].$lte = Number(maxPrice);
    }

    if (minRam || maxRam) {
      query['specifications.memory.ram'] = {};
      if (minRam) query['specifications.memory.ram'].$gte = Number(minRam);
      if (maxRam) query['specifications.memory.ram'].$lte = Number(maxRam);
    }

    if (minBattery) {
      query['specifications.battery.capacity'] = { $gte: Number(minBattery) };
    }

    if (processor) {
      query['specifications.processor.chipset'] = { $regex: processor, $options: 'i' };
    }

    if (storage) {
      query['specifications.memory.storage'] = { $gte: Number(storage) };
    }

    // Sorting
    const sortOptions: any = {};
    if (sortBy === 'price-low') sortOptions['price.current'] = 1;
    else if (sortBy === 'price-high') sortOptions['price.current'] = -1;
    else if (sortBy === 'rating') sortOptions['ratings.overall'] = -1;
    else if (sortBy === 'newest') sortOptions.createdAt = -1;
    else sortOptions['ratings.overall'] = -1;

    const skip = (Number(page) - 1) * Number(limit);

    const products = await Product.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit))
      .select('-pros -cons');

    const total = await Product.countDocuments(query);

    // Get aggregations for filter options
    const [brands, priceRange, ramOptions, batteryOptions] = await Promise.all([
      Product.distinct('brand', query),
      Product.aggregate([
        { $match: query },
        { $group: { _id: null, min: { $min: '$price.current' }, max: { $max: '$price.current' } } }
      ]),
      Product.aggregate([
        { $match: query },
        { $group: { _id: '$specifications.memory.ram' } },
        { $sort: { _id: 1 } }
      ]),
      Product.aggregate([
        { $match: query },
        { $group: { _id: '$specifications.battery.capacity' } },
        { $sort: { _id: -1 } },
        { $limit: 10 }
      ])
    ]);

    res.json({
      success: true,
      data: products,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      },
      filters: {
        brands,
        priceRange: priceRange[0] || { min: 0, max: 0 },
        ramOptions: ramOptions.map(r => r._id).filter(Boolean),
        batteryOptions: batteryOptions.map(b => b._id).filter(Boolean)
      }
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ success: false, error: 'Search failed' });
  }
});

// Autocomplete suggestions
router.get('/suggestions', async (req: Request, res: Response) => {
  try {
    const { q, category } = req.query;

    if (!q || (q as string).length < 2) {
      return res.json({ success: true, data: [] });
    }

    const query: any = { isActive: true, $text: { $search: q as string } };
    if (category) query.category = category;

    const products = await Product.find(query)
      .select('name brand model category images')
      .limit(5);

    const suggestions = products.map(p => ({
      id: p._id,
      name: p.name,
      brand: p.brand,
      category: p.category,
      image: p.images[0]
    }));

    res.json({ success: true, data: suggestions });
  } catch (error) {
    console.error('Suggestions error:', error);
    res.status(500).json({ success: false, error: 'Failed to get suggestions' });
  }
});

// Trending searches (placeholder - would use Redis in production)
router.get('/trending', async (req: Request, res: Response) => {
  try {
    const trending = [
      'iPhone 15',
      'Samsung S24',
      'OnePlus 12',
      'MacBook Pro',
      'Gaming Laptop',
      'Budget Phone',
      'Best Camera Phone',
      'Long Battery Phone'
    ];

    res.json({ success: true, data: trending });
  } catch (error) {
    console.error('Trending error:', error);
    res.status(500).json({ success: false, error: 'Failed to get trending searches' });
  }
});

export default router;

