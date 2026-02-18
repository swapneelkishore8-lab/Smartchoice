import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, User, RecommendationRequest } from '../types';

// Cart Store
interface CartItem {
  product: Product;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const items = get().items;
        const existingItem = items.find((item) => item.product._id === product._id);

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.product._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({ items: [...items, { product, quantity: 1 }] });
        }
      },

      removeItem: (productId) => {
        set({ items: get().items.filter((item) => item.product._id !== productId) });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.product._id === productId ? { ...item, quantity } : item
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      getTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price.current * item.quantity,
          0
        );
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);

// Comparison Store
interface ComparisonStore {
  products: Product[];
  addProduct: (product: Product) => boolean;
  removeProduct: (productId: string) => void;
  clearComparison: () => void;
  isInComparison: (productId: string) => boolean;
  getProductCount: () => number;
}

export const useComparisonStore = create<ComparisonStore>()(
  persist(
    (set, get) => ({
      products: [],

      addProduct: (product) => {
        const currentProducts = get().products;
        
        if (currentProducts.length >= 4) {
          return false;
        }
        
        if (currentProducts.some((p) => p._id === product._id)) {
          return false;
        }

        if (currentProducts.length > 0 && currentProducts[0].category !== product.category) {
          return false;
        }

        set({ products: [...currentProducts, product] });
        return true;
      },

      removeProduct: (productId) => {
        set({ products: get().products.filter((p) => p._id !== productId) });
      },

      clearComparison: () => set({ products: [] }),

      isInComparison: (productId) => {
        return get().products.some((p) => p._id === productId);
      },

      getProductCount: () => get().products.length,
    }),
    {
      name: 'comparison-storage',
    }
  )
);

// Wishlist Store
interface WishlistStore {
  productIds: string[];
  addProduct: (productId: string) => void;
  removeProduct: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      productIds: [],

      addProduct: (productId) => {
        if (!get().productIds.includes(productId)) {
          set({ productIds: [...get().productIds, productId] });
        }
      },

      removeProduct: (productId) => {
        set({ productIds: get().productIds.filter((id) => id !== productId) });
      },

      isInWishlist: (productId) => get().productIds.includes(productId),

      clearWishlist: () => set({ productIds: [] }),
    }),
    {
      name: 'wishlist-storage',
    }
  )
);

// User Store
interface UserStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setToken: (token) => set({ token, isAuthenticated: !!token }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    {
      name: 'user-storage',
    }
  )
);

// Preferences Store
interface PreferencesStore {
  preferences: RecommendationRequest | null;
  setPreferences: (preferences: RecommendationRequest) => void;
  clearPreferences: () => void;
}

export const usePreferencesStore = create<PreferencesStore>()((set) => ({
  preferences: null,

  setPreferences: (preferences) => set({ preferences }),
  clearPreferences: () => set({ preferences: null }),
}));

// Filter Store
interface FilterStore {
  filters: {
    category?: string;
    brand?: string[];
    minPrice?: number;
    maxPrice?: number;
    minRam?: number;
    sortBy?: string;
  };
  setFilter: (key: string, value: any) => void;
  clearFilters: () => void;
}

export const useFilterStore = create<FilterStore>()((set) => ({
  filters: {},

  setFilter: (key, value) => {
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    }));
  },

  clearFilters: () => set({ filters: {} }),
}));

// UI Store
interface UIStore {
  isMobileMenuOpen: boolean;
  isSearchOpen: boolean;
  isCompareDrawerOpen: boolean;
  toggleMobileMenu: () => void;
  toggleSearch: () => void;
  toggleCompareDrawer: () => void;
  closeMobileMenu: () => void;
}

export const useUIStore = create<UIStore>()((set) => ({
  isMobileMenuOpen: false,
  isSearchOpen: false,
  isCompareDrawerOpen: false,

  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),
  toggleCompareDrawer: () => set((state) => ({ isCompareDrawerOpen: !state.isCompareDrawerOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
}));

