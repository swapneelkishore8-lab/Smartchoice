import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  avatar?: string;
  preferences: {
    phone?: {
      primaryUse: string[];
      budget: { min: number; max: number };
      brandPreferences: string[];
      priority: {
        battery: number;
        performance: number;
        camera: number;
        display: number;
        brand: number;
        design: number;
      };
      features: string[];
    };
    laptop?: {
      primaryUse: string[];
      budget: { min: number; max: number };
      brandPreferences: string[];
      priority: {
        performance: number;
        battery: number;
        display: number;
        portability: number;
        brand: number;
      };
      specifications: {
        minRam: number;
        minStorage: number;
        processorPreference: string;
        gpuPreference: string;
      };
    };
  };
  wishlist: {
    products: mongoose.Types.ObjectId[];
    alerts: {
      productId: mongoose.Types.ObjectId;
      targetPrice: number;
      createdAt: Date;
    }[];
  };
  comparisonList: mongoose.Types.ObjectId[];
  searchHistory: {
    query: string;
    filters: Record<string, any>;
    timestamp: Date;
  }[];
  role: 'user' | 'admin';
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true
  },
  password: { type: String, required: true, minlength: 8 },
  name: { type: String, required: true, trim: true },
  avatar: String,
  preferences: {
    phone: {
      primaryUse: [{ type: String }],
      budget: {
        min: { type: Number, default: 5000 },
        max: { type: Number, default: 100000 }
      },
      brandPreferences: [{ type: String }],
      priority: {
        battery: { type: Number, default: 3 },
        performance: { type: Number, default: 3 },
        camera: { type: Number, default: 3 },
        display: { type: Number, default: 3 },
        brand: { type: Number, default: 2 },
        design: { type: Number, default: 2 }
      },
      features: [{ type: String }]
    },
    laptop: {
      primaryUse: [{ type: String }],
      budget: {
        min: { type: Number, default: 30000 },
        max: { type: Number, default: 200000 }
      },
      brandPreferences: [{ type: String }],
      priority: {
        performance: { type: Number, default: 3 },
        battery: { type: Number, default: 3 },
        display: { type: Number, default: 3 },
        portability: { type: Number, default: 2 },
        brand: { type: Number, default: 2 }
      },
      specifications: {
        minRam: { type: Number, default: 8 },
        minStorage: { type: Number, default: 256 },
        processorPreference: String,
        gpuPreference: String
      }
    }
  },
  wishlist: {
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    alerts: [{
      productId: { type: Schema.Types.ObjectId, ref: 'Product' },
      targetPrice: Number,
      createdAt: { type: Date, default: Date.now }
    }]
  },
  comparisonList: [{ type: Schema.Types.ObjectId, ref: 'Product', maxlength: 4 }],
  searchHistory: [{
    query: String,
    filters: Schema.Types.Mixed,
    timestamp: { type: Date, default: Date.now }
  }],
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  isActive: { type: Boolean, default: true },
  lastLogin: Date
}, {
  timestamps: true
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Index for efficient queries
UserSchema.index({ email: 1 });

export default mongoose.model<IUser>('User', UserSchema);

