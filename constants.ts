
import { Wig, WigCondition, WigType, User } from './types';

export const COMMISSION_RATE = 0.20;
export const APP_NAME = "TAJ";

export const MOCK_USER: User = {
  id: 'user_1',
  name: 'Sarah J.',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
  isSeller: true,
  earnings: 1200.50
};

export const MOCK_WIGS: Wig[] = [
  {
    id: 'w1',
    sellerId: 'user_2',
    title: 'Luxurious Body Wave - Virgin Human Hair',
    description: 'Only worn once for a photoshoot. This unit is custom colored and styled. Very soft, minimal shedding.',
    price: 3200,
    originalPrice: 4500,
    images: [
      'https://images.unsplash.com/photo-1629871579564-969c3628e937?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 
      'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    type: WigType.FULL_WIG,
    length: 'Long',
    condition: WigCondition.LIKE_NEW,
    color: '1B/30 Ombre',
    texture: 'Wavy',
    likes: 24,
    isSold: false,
    createdAt: Date.now() - 10000000
  },
  {
    id: 'w2',
    sellerId: 'user_3',
    title: 'Cute Bob Cut - Human Hair',
    description: 'Perfect for everyday wear! Natural hairline. The lace is already cut but the wig is in great condition.',
    price: 1450,
    originalPrice: 2000,
    images: [
      'https://images.unsplash.com/photo-1596452292700-1c002283e76a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595476104010-b44560a5d784?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    type: WigType.FULL_WIG,
    length: 'Short',
    condition: WigCondition.GOOD,
    color: 'Jet Black',
    texture: 'Straight',
    likes: 15,
    isSold: false,
    createdAt: Date.now() - 5000000
  },
  {
    id: 'w3',
    sellerId: 'user_4',
    title: 'Blonde 613 Straight',
    description: 'Brand new style! Ready to be dyed or worn as is. High density.',
    price: 2800,
    images: [
      'https://images.unsplash.com/photo-1560829141-9988019e917d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 
      'https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    type: WigType.FULL_WIG,
    length: 'Long',
    condition: WigCondition.LIKE_NEW,
    color: '613 Blonde',
    texture: 'Straight',
    likes: 102,
    isSold: false,
    createdAt: Date.now() - 200000
  },
  {
    id: 'w4',
    sellerId: 'user_5',
    title: 'Kinky Curly Afro Wig',
    description: 'Big hair don\'t care! This unit is full and bouncy. Great for protective styling.',
    price: 800,
    images: [
      'https://images.unsplash.com/photo-1605497788044-5a90406410d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522337360705-8754d8722b39?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    type: WigType.FULL_WIG,
    length: 'Medium Length',
    condition: WigCondition.FAIR,
    color: 'Natural Black',
    texture: 'Curly',
    likes: 8,
    isSold: false,
    createdAt: Date.now() - 86400000
  },
  {
    id: 'w5',
    sellerId: 'user_6',
    title: 'Bone Straight Extension Clip-ins',
    description: 'Silky smooth bone straight clip-ins. 10 pieces. 100% Human Hair.',
    price: 1200,
    images: [
      'https://images.unsplash.com/photo-1522337660859-02fbefca4702?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1533519842415-115f013d2f95?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    type: WigType.EXTENSION,
    length: 'Medium Length',
    condition: WigCondition.LIKE_NEW,
    color: 'Natural Black',
    texture: 'Straight',
    likes: 45,
    isSold: false,
    createdAt: Date.now() - 400000
  },
  {
    id: 'w6',
    sellerId: 'user_7',
    title: 'Deep Wave Bob',
    description: 'Wet and wavy look. Very low maintenance. Comes with wig cap and band.',
    price: 1500,
    images: [
      'https://images.unsplash.com/photo-1562004760-aceed7bb0fe3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1521119989659-a83eee488058?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    type: WigType.FULL_WIG,
    length: 'Short',
    condition: WigCondition.GOOD,
    color: 'Dark Brown',
    texture: 'Curly',
    likes: 32,
    isSold: false,
    createdAt: Date.now() - 900000
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'All', icon: '✨' },
  { id: 'short', label: 'Short', icon: '💇‍♀️' },
  { id: 'medium', label: 'Medium', icon: '👩' },
  { id: 'long', label: 'Long', icon: '🧜‍♀️' },
];
