import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  brand: string;
  category: 'phone' | 'laptop';
  model: string;
  price: {
    current: number;
    original: number;
    currency: string;
    lastUpdated: Date;
  };
  specifications: {
    display?: {
      size: number;
      resolution: string;
      type: string;
      refreshRate?: number;
      brightness?: string;
    };
    processor?: {
      chipset: string;
      cores: number;
      speed: string;
      gpu?: string;
    };
    memory?: {
      ram: number;
      storage: number;
      storageType?: string;
      expandable?: number;
    };
    battery?: {
      capacity: number;
      charging: string;
      fastCharging?: number;
      wirelessCharging?: boolean;
    };
    camera?: {
      rear?: {
        main: number;
        ultraWide?: number;
        telephoto?: number;
        macro?: number;
      };
      front: number;
    };
    connectivity?: {
      '5g'?: boolean;
      '4g'?: boolean;
      wifi?: string;
      bluetooth?: string;
      usb?: string;
      nfc?: boolean;
    };
    build?: {
      material: string;
      weight: number;
      dimensions: {
        height: number;
        width: number;
        thickness: number;
      };
    };
    os?: string;
    features?: string[];
  };
  ratings: {
    overall: number;
    performance: number;
    battery: number;
    display: number;
    camera: number;
    value: number;
    count: number;
  };
  images: string[];
  availability: {
    inStock: boolean;
    flipkart?: {
      available: boolean;
      url?: string;
      price?: number;
    };
    amazon?: {
      available: boolean;
      url?: string;
      price?: number;
    };
    official?: {
      available: boolean;
      url?: string;
    };
  };
  pros?: string[];
  cons?: string[];
  releaseDate?: Date;
  tags: string[];
  slug: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true, index: true },
  brand: { type: String, required: true, index: true },
  category: { type: String, enum: ['phone', 'laptop'], required: true, index: true },
  model: { type: String, required: true },
  price: {
    current: { type: Number, required: true },
    original: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    lastUpdated: { type: Date, default: Date.now }
  },
  specifications: {
    display: {
      size: { type: Number },
      resolution: { type: String },
      type: { type: String },
      refreshRate: { type: Number },
      brightness: { type: String }
    },
    processor: {
      chipset: { type: String },
      cores: { type: Number },
      speed: { type: String },
      gpu: { type: String }
    },
    memory: {
      ram: { type: Number },
      storage: { type: Number },
      storageType: { type: String },
      expandable: { type: Number }
    },
    battery: {
      capacity: { type: Number },
      charging: { type: String },
      fastCharging: { type: Number },
      wirelessCharging: { type: Boolean }
    },
    camera: {
      rear: {
        main: { type: Number },
        ultraWide: { type: Number },
        telephoto: { type: Number },
        macro: { type: Number }
      },
      front: { type: Number }
    },
    connectivity: {
      '5g': { type: Boolean },
      '4g': { type: Boolean },
      wifi: { type: String },
      bluetooth: { type: String },
      usb: { type: String },
      nfc: { type: Boolean }
    },
    build: {
      material: { type: String },
      weight: { type: Number },
      dimensions: {
        height: { type: Number },
        width: { type: Number },
        thickness: { type: Number }
      }
    },
    os: { type: String },
    features: [{ type: String }]
  },
  ratings: {
    overall: { type: Number, default: 0 },
    performance: { type: Number, default: 0 },
    battery: { type: Number, default: 0 },
    display: { type: Number, default: 0 },
    camera: { type: Number, default: 0 },
    value: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  },
  images: [{ type: String }],
  availability: {
    inStock: { type: Boolean, default: true },
    flipkart: {
      available: { type: Boolean },
      url: { type: String },
      price: { type: Number }
    },
    amazon: {
      available: { type: Boolean },
      url: { type: String },
      price: { type: Number }
    },
    official: {
      available: { type: Boolean },
      url: { type: String }
    }
  },
  pros: [{ type: String }],
  cons: [{ type: String }],
  releaseDate: { type: Date },
  tags: [{ type: String }],
  slug: { type: String, unique: true },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

// Indexes for efficient querying
ProductSchema.index({ 'price.current': 1 });
ProductSchema.index({ 'specifications.memory.ram': 1 });
ProductSchema.index({ 'specifications.battery.capacity': 1 });
ProductSchema.index({ 'ratings.overall': -1 });
ProductSchema.index({ brand: 1, category: 1 });

// Text index for search
ProductSchema.index({
  name: 'text',
  brand: 'text',
  model: 'text',
  'specifications.processor.chipset': 'text'
});

export default mongoose.model<IProduct>('Product', ProductSchema);
