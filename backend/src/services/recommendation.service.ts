import Product, { IProduct } from '../models/Product';
import mongoose from 'mongoose';

interface UserPreferences {
  category: 'phone' | 'laptop';
  budget: { min: number; max: number };
  brandPreferences?: string[];
  priority: {
    battery?: number;
    performance?: number;
    camera?: number;
    display?: number;
    portability?: number;
    brand?: number;
  };
  primaryUse?: string[];
  features?: string[];
}

interface RecommendationScore {
  product: IProduct;
  score: number;
  matchedCriteria: string[];
}

class RecommendationService {
  // Calculate recommendation scores based on user preferences
  async getRecommendations(userPrefs: UserPreferences, limit = 10): Promise<RecommendationScore[]> {
    const query: any = {
      isActive: true,
      category: userPrefs.category,
      'price.current': {
        $gte: userPrefs.budget.min,
        $lte: userPrefs.budget.max
      }
    };

    if (userPrefs.brandPreferences?.length) {
      query.brand = { $in: userPrefs.brandPreferences };
    }

    const products = await Product.find(query)
      .sort({ 'ratings.overall': -1 })
      .limit(50);

    const scoredProducts: RecommendationScore[] = products.map(product => {
      const { score, matchedCriteria } = this.calculateScore(product, userPrefs);
      return { product, score, matchedCriteria };
    });

    // Sort by score and return top results
    return scoredProducts
      .filter(sp => sp.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }

  private calculateScore(product: IProduct, prefs: UserPreferences): { score: number; matchedCriteria: string[] } {
    let score = 0;
    const matchedCriteria: string[] = [];
    const priorities = prefs.priority || {};

    // Price score (30% weight) - closer to budget max is better
    const priceWeight = (priorities.brand || 2) * 10;
    const priceScore = this.calculatePriceScore(product.price.current, prefs.budget);
    score += priceScore * priceWeight;
    if (priceScore > 70) matchedCriteria.push('Within budget');

    // Overall rating score (25% weight)
    const ratingWeight = 25;
    const ratingScore = (product.ratings.overall / 5) * 100;
    score += ratingScore * ratingWeight;
    if (product.ratings.overall >= 4.5) matchedCriteria.push('Highly rated');

    // Performance score (20% weight)
    const perfWeight = (priorities.performance || 3) * 7;
    const perfScore = this.calculatePerformanceScore(product, prefs.category);
    score += perfScore * perfWeight;
    if (perfScore > 80) matchedCriteria.push('High performance');

    // Battery score (15% weight)
    const batteryWeight = (priorities.battery || 3) * 5;
    const batteryScore = this.calculateBatteryScore(product, prefs.category);
    score += batteryScore * batteryWeight;
    if (batteryScore > 80) matchedCriteria.push('Long battery life');

    // Camera score for phones (10% weight)
    if (prefs.category === 'phone') {
      const cameraWeight = (priorities.camera || 3) * 3;
      const cameraScore = this.calculateCameraScore(product);
      score += cameraScore * cameraWeight;
      if (cameraScore > 80) matchedCriteria.push('Great camera');
    }

    // Display score (10% weight)
    const displayWeight = (priorities.display || 3) * 3;
    const displayScore = this.calculateDisplayScore(product);
    score += displayScore * displayWeight;
    if (displayScore > 80) matchedCriteria.push('Excellent display');

    // Brand preference bonus
    if (prefs.brandPreferences?.includes(product.brand)) {
      score += 50;
      matchedCriteria.push(`Preferred brand: ${product.brand}`);
    }

    // Feature matching bonus
    if (prefs.features?.length) {
      const productFeatures = product.specifications.features || [];
      const matchedFeatures = prefs.features.filter((f: string) =>
        productFeatures.some((pf: string) => pf.toLowerCase().includes(f.toLowerCase()))
      );
      score += matchedFeatures.length * 20;
      if (matchedFeatures.length > 0) {
        matchedCriteria.push(`Has ${matchedFeatures.length} desired features`);
      }
    }

    // Normalize score to 0-100
    const maxPossibleScore = 100 + (Object.values(priorities).reduce((a, b) => a + b, 0) * 10) + 100;
    const normalizedScore = Math.min((score / maxPossibleScore) * 100, 100);

    return { score: normalizedScore, matchedCriteria };
  }

  private calculatePriceScore(currentPrice: number, budget: { min: number; max: number }): number {
    if (currentPrice <= budget.max * 0.7) return 100;
    if (currentPrice <= budget.max * 0.85) return 90;
    if (currentPrice <= budget.max) return 80;
    return 50;
  }

  private calculatePerformanceScore(product: IProduct, category: string): number {
    if (category === 'laptop') {
      // For laptops, consider RAM and processor
      const ram = product.specifications.memory?.ram || 8;
      const chipset = product.specifications.processor?.chipset?.toLowerCase() || '';
      
      let score = 50;
      if (ram >= 16) score += 30;
      else if (ram >= 32) score += 40;
      
      if (chipset.includes('i9') || chipset.includes('ryzen 9')) score += 20;
      else if (chipset.includes('i7') || chipset.includes('ryzen 7')) score += 15;
      else if (chipset.includes('i5') || chipset.includes('ryzen 5')) score += 10;
      
      return Math.min(score, 100);
    } else {
      // For phones
      const ram = product.specifications.memory?.ram || 6;
      const chipset = product.specifications.processor?.chipset?.toLowerCase() || '';
      
      let score = 50;
      if (ram >= 8) score += 25;
      else if (ram >= 12) score += 30;
      
      if (chipset.includes('a16') || chipset.includes('a17') || 
          chipset.includes('snapdragon 8') || chipset.includes('dimensity 9000')) {
        score += 25;
      } else if (chipset.includes('snapdragon 7') || chipset.includes('dimensity 8000')) {
        score += 15;
      }
      
      return Math.min(score, 100);
    }
  }

  private calculateBatteryScore(product: IProduct, category: string): number {
    const capacity = product.specifications.battery?.capacity || 4000;
    
    if (category === 'laptop') {
      // Laptop batteries (mWh)
      if (capacity >= 70) return 100;
      if (capacity >= 60) return 85;
      if (capacity >= 50) return 70;
      return 50;
    } else {
      // Phone batteries (mAh)
      if (capacity >= 5000) return 100;
      if (capacity >= 4500) return 85;
      if (capacity >= 4000) return 70;
      return 50;
    }
  }

  private calculateCameraScore(product: IProduct): number {
    const rearCamera = product.specifications.camera?.rear?.main || 0;
    const frontCamera = product.specifications.camera?.front || 0;
    const hasUltraWide = product.specifications.camera?.rear?.ultraWide ? 1 : 0;
    const hasTelephoto = product.specifications.camera?.rear?.telephoto ? 1 : 0;

    let score = 40;
    if (rearCamera >= 108) score += 30;
    else if (rearCamera >= 64) score += 25;
    else if (rearCamera >= 48) score += 20;
    else if (rearCamera >= 12) score += 15;

    if (frontCamera >= 32) score += 15;
    else if (frontCamera >= 20) score += 10;

    score += hasUltraWide * 10;
    score += hasTelephoto * 10;

    return Math.min(score, 100);
  }

  private calculateDisplayScore(product: IProduct): number {
    const display = product.specifications.display;
    if (!display) return 50;

    let score = 50;
    
    // Resolution score
    const resolution = display.resolution?.toLowerCase() || '';
    if (resolution.includes('2k') || resolution.includes('1440')) score += 20;
    else if (resolution.includes('1080') || resolution.includes('fhd')) score += 15;
    else if (resolution.includes('720') || resolution.includes('hd')) score += 10;

    // Refresh rate score
    if (display.refreshRate && display.refreshRate >= 120) score += 20;
    else if (display.refreshRate && display.refreshRate >= 90) score += 15;
    else if (display.refreshRate && display.refreshRate >= 60) score += 10;

    // Brightness score
    if (display.brightness) {
      const brightness = parseInt(display.brightness);
      if (brightness >= 1500) score += 10;
      else if (brightness >= 1000) score += 7;
      else if (brightness >= 500) score += 5;
    }

    return Math.min(score, 100);
  }

  // Quick recommendations based on primary use case
  async getQuickRecommendations(category: 'phone' | 'laptop', useCase: string, limit = 5): Promise<IProduct[]> {
    const useCaseMap: Record<string, any> = {
      'gaming': {
        phone: { 'specifications.processor.chipset': /snapdragon 8|dimensity 9000|a16|a17/i },
        laptop: { 'specifications.memory.ram': { $gte: 16 } }
      },
      'photography': {
        phone: { 'specifications.camera.rear.main': { $gte: 48 } },
        laptop: {}
      },
      'battery-life': {
        phone: { 'specifications.battery.capacity': { $gte: 5000 } },
        laptop: { 'specifications.battery.capacity': { $gte: 60 } }
      },
      'budget': {
        phone: { 'price.current': { $lte: 15000 } },
        laptop: { 'price.current': { $lte: 50000 } }
      },
      'premium': {
        phone: { 'price.current': { $gte: 50000 } },
        laptop: { 'price.current': { $gte: 100000 } }
      }
    };

    const filter = useCaseMap[useCase]?.[category] || {};
    
    return Product.find({
      isActive: true,
      category,
      ...filter
    })
      .sort({ 'ratings.overall': -1 })
      .limit(limit);
  }
}

export default new RecommendationService();

