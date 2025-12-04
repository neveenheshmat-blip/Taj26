import React from 'react';
import { Home, Search, PlusCircle, ShoppingBag, User } from 'lucide-react';
import { ViewState } from '../types';

interface BottomNavProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  cartCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentView, onChangeView, cartCount }) => {
  const navItems = [
    { view: 'HOME', icon: Home, label: 'Home' },
    { view: 'SEARCH', icon: Search, label: 'Search' },
    { view: 'SELL', icon: PlusCircle, label: 'Sell', isPrimary: true },
    { view: 'CART', icon: ShoppingBag, label: 'Cart', badge: cartCount },
    { view: 'PROFILE', icon: User, label: 'Profile' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 pb-safe pt-2 px-6 h-20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50">
      <div className="flex justify-between items-center h-full pb-2">
        {navItems.map((item) => {
          const isActive = currentView === item.view || (item.view === 'HOME' && currentView === 'PRODUCT_DETAILS');
          const Icon = item.icon;
          
          if (item.isPrimary) {
             return (
               <button
                key={item.label}
                onClick={() => onChangeView(item.view as ViewState)}
                className="relative -top-5 bg-primary-500 text-white p-4 rounded-full shadow-lg shadow-primary-200 hover:scale-105 transition-transform"
               >
                 <Icon size={28} strokeWidth={2.5} />
               </button>
             )
          }

          return (
            <button
              key={item.label}
              onClick={() => onChangeView(item.view as ViewState)}
              className={`flex flex-col items-center justify-center space-y-1 w-12 ${isActive ? 'text-primary-500' : 'text-gray-400'}`}
            >
              <div className="relative">
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                {item.badge ? (
                  <span className="absolute -top-1 -right-2 bg-primary-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[16px] flex justify-center">
                    {item.badge}
                  </span>
                ) : null}
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};