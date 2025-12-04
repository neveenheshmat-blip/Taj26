
export enum WigCondition {
  LIKE_NEW = 'Like New',
  GOOD = 'Good',
  FAIR = 'Fair'
}

export enum WigType {
  FULL_WIG = 'Full Wig',
  HALF_WIG = 'Half Wig',
  EXTENSION = 'Extension'
}

export type WigTexture = 'Straight' | 'Wavy' | 'Curly' | 'Kinky';
export type WigLength = 'Short' | 'Medium Length' | 'Long';

export enum OrderStatus {
  PENDING = 'Pending',
  SHIPPED = 'Shipped',
  DELIVERED = 'Delivered',
  RETURN_REQUESTED = 'Return Requested',
  RETURNED = 'Returned',
  CANCELLED = 'Cancelled'
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  isSeller: boolean;
  earnings: number;
}

export interface Wig {
  id: string;
  sellerId: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  type: WigType;
  length: WigLength;
  condition: WigCondition;
  color: string;
  texture?: WigTexture;
  likes: number;
  isSold: boolean;
  createdAt: number;
}

export interface Order {
  id: string;
  wigId: string;
  buyerId: string;
  sellerId: string;
  price: number;
  commission: number; // 20%
  status: OrderStatus;
  date: string;
  wigDetails: Wig; // Snapshot of item
}

export interface CartItem {
  wig: Wig;
}

export type ViewState = 'HOME' | 'SEARCH' | 'SELL' | 'CART' | 'PROFILE' | 'PRODUCT_DETAILS' | 'ORDER_SUCCESS';

// Helper to keep routing clean without a library
export interface NavigationState {
  view: ViewState;
  params?: any; // e.g., selectedProductId
}
