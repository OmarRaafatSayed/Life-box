// src/types/index.ts

export type Category =
  | 'HOME_UTILITIES'
  | 'HOUSEWARES'
  | 'HOME_TEXTILES'
  | 'DECORATIVE_ITEMS';

export type OrderStatus =
  | 'PENDING'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED';

export interface Product {
  id: string;
  nameEn: string;
  nameAr: string;
  descEn: string;
  descAr: string;
  price: number;
  category: Category;
  images: string[];
  colors: string[];
  sizes: string[];
  stock: number;
  rating: number;
  reviewCount: number;
  featured: boolean;
  sku: string;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  color?: string;
  size?: string;
}

export interface Address {
  street: string;
  city: string;
  region: string;
  postal: string;
  country: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  fullName: string;
  email: string;
  phone: string;
  address: Address;
  notes?: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  product: Product;
  quantity: number;
  price: number;
  color?: string;
  size?: string;
}

export interface CheckoutFormData {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  region: string;
  postal: string;
  country: string;
  notes?: string;
}

export interface PaymentFormData {
  nameOnCard: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

export interface ProductFilters {
  minPrice?: number;
  maxPrice?: number;
  colors?: string[];
  minRating?: number;
  inStock?: boolean;
  sort?: 'newest' | 'price_asc' | 'price_desc' | 'rating' | 'popular';
  search?: string;
}

export interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  totalProducts: number;
  totalCustomers: number;
  ordersByStatus: Record<OrderStatus, number>;
}

export interface CustomerSummary {
  fullName: string;
  email: string;
  orderCount: number;
}

export interface ProductFormData {
  nameEn: string;
  nameAr: string;
  descEn: string;
  descAr: string;
  price: number;
  category: Category;
  images: string[];
  colors: string[];
  sizes: string[];
  stock: number;
  featured: boolean;
}
